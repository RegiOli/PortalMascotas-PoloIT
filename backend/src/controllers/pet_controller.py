from flask import request, jsonify
from db import get_db_connection
from utils.jwt import decode_token
from models.pet_model import insert_pet

# REGISTRAR NUEVA MASCOTA

def register_pet():
    auth_header = request.headers.get('Authorization')
    print("Authorization header:", auth_header)

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = decode_token(token)
    except Exception:
        return jsonify({"error": "Token inválido"}), 401

    if not user_data:
        return jsonify({'message': 'Token inválido'}), 401

    user_id = user_data.get('user_id')

    data = request.get_json()

    required_fields = ['nombre', 'especie', 'raza', 'edad', 'sexo', 'imagen_url', 'salud', 'tamanio', 'ubicacion', 'info_adicional']
    for field in ['nombre', 'especie']:
        if not data.get(field):
            return jsonify({'message': f'Campo {field} requerido'}), 400

    mascota_data = {field: data.get(field) for field in required_fields}
    mascota_data['estado'] = 'ofrecimiento_pendiente'  # Estado inicial controlado

    result = insert_pet(mascota_data, user_id)
    if not result['success']:
        return jsonify({'message': result['message']}), 500

    return jsonify({'message': 'Mascota registrada y pendiente de revisión'}), 201


# MASCOTAS DEL USUARIO

def get_user_pets():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = decode_token(token)
    except Exception:
        return jsonify({'message': 'Token inválido'}), 401

    user_id = user_data.get('user_id')

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, nombre, especie, raza, edad, sexo, imagen_url, estado, salud, tamanio, ubicacion, info_adicional
            FROM mascotas
            WHERE id_usuario = %s
        """, (user_id,))

        mascotas = cursor.fetchall()
        return jsonify(mascotas), 200
    except Exception as e:
        return jsonify({'message': f'Error al obtener mascotas: {str(e)}'}), 500


# TODAS LAS MASCOTAS (ADMIN)

def get_all_pets():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Paginación
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 6))
        offset = (page - 1) * limit

        # Filtros múltiples desde query params
        especie = request.args.getlist('especie')      # puede haber más de uno
        estado = request.args.getlist('estado')
        tamanio = request.args.getlist('tamanio')
        ubicacion = request.args.getlist('ubicacion')
        nombre = request.args.get('nombre')            # texto libre

        filtros = []
        valores = []

        # Armado de cláusulas dinámicas
        if especie:
            filtros.append(f"especie IN ({','.join(['%s'] * len(especie))})")
            valores += especie
        if estado:
            filtros.append(f"estado IN ({','.join(['%s'] * len(estado))})")
            valores += estado
        if tamanio:
            filtros.append(f"tamanio IN ({','.join(['%s'] * len(tamanio))})")
            valores += tamanio
        if ubicacion:
            filtros.append(f"ubicacion IN ({','.join(['%s'] * len(ubicacion))})")
            valores += ubicacion
        if nombre:
            filtros.append("nombre LIKE %s")
            valores.append(f"%{nombre}%")

        # Generar SQL final
        where_clause = f"WHERE {' AND '.join(filtros)}" if filtros else ""

        query = f"""
            SELECT id, nombre, especie, raza, edad, sexo, imagen_url, estado, salud, tamanio, ubicacion, info_adicional
            FROM mascotas
            {where_clause}
            LIMIT %s OFFSET %s
        """

        cursor.execute(query, valores + [limit, offset])
        mascotas = cursor.fetchall()

        # Conteo total (sin paginar)
        count_query = f"SELECT COUNT(*) AS total FROM mascotas {where_clause}"
        cursor.execute(count_query, valores)
        total = cursor.fetchone()['total']

        return jsonify({
            'data': mascotas,
            'page': page,
            'limit': limit,
            'total': total,
            'total_pages': (total + limit - 1) // limit
        }), 200

    except Exception as e:
        return jsonify({'message': f'Error al obtener mascotas: {str(e)}'}), 500

def obtener_filtros():
    conn = get_db_connection()
    cursor = conn.cursor()

    filtros = {}

    for campo in ['ubicacion', 'especie', 'estado', 'tamanio']:
        cursor.execute(f"SELECT DISTINCT {campo} FROM mascotas")
        resultados = cursor.fetchall()
        filtros[campo] = [fila[0] for fila in resultados if fila[0] is not None]

    return jsonify(filtros)

# def get_all_pets():
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor(dictionary=True)
#         cursor.execute("""
#             SELECT id, nombre, especie, raza, edad, sexo, imagen_url, estado, salud, tamanio, ubicacion, info_adicional
#             FROM mascotas
#         """)
#         mascotas = cursor.fetchall()
#         return jsonify(mascotas), 200
#     except Exception as e:
#         return jsonify({'message': f'Error al obtener mascotas: {str(e)}'}), 500


# ACTUALIZAR UNA MASCOTA (Admin o usuario)

def update_pet(pet_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]
    try:
        decode_token(token)
    except Exception:
        return jsonify({'message': 'Token inválido'}), 401

    data = request.get_json()
    if not data:
        return jsonify({'message': 'No hay datos para actualizar'}), 400

    required_fields = ['nombre', 'especie']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'Campo {field} requerido para actualizar'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
        UPDATE mascotas SET
            nombre = %s,
            especie = %s,
            raza = %s,
            edad = %s,
            sexo = %s,
            imagen_url = %s,
            estado = %s,
            salud = %s,
            tamanio = %s,
            ubicacion = %s,
            info_adicional = %s
        WHERE id = %s
        """, (
            data['nombre'],
            data['especie'],
            data.get('raza'),
            data.get('edad'),
            data.get('sexo', 'desconocido'),
            data.get('imagen_url'),
            data.get('estado', 'disponible'),
            data.get('salud'),
            data.get('tamanio'),
            data.get('ubicacion'),
            data.get('info_adicional'),
            pet_id
        ))

        conn.commit()
        return jsonify({'message': 'Mascota actualizada con éxito'}), 200
    except Exception as e:
        print(f"[ERROR update_pet]: {e}")
        return jsonify({'message': f'Error al actualizar mascota: {str(e)}'}), 500


# OBTENER UNA MASCOTA POR ID
def get_pet(pet_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1].strip()
    try:
        decode_token(token)
    except Exception:
        return jsonify({'message': 'Token inválido'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM mascotas WHERE id = %s', (pet_id,))
        mascota = cursor.fetchone()
        if not mascota:
            return jsonify({'message': 'Mascota no encontrada'}), 404
        return jsonify(mascota), 200
    except Exception as e:
        print(f"[ERROR get_pet]: {e}")
        return jsonify({'message': 'Error al obtener mascota'}), 500
    finally:
        cursor.close()
        conn.close()

# def get_pet(pet_id):
#     auth_header = request.headers.get('Authorization')
#     if not auth_header or not auth_header.startswith('Bearer '):
#         return jsonify({'message': 'Token no proporcionado'}), 401

#     token = auth_header.split(" ")[1]
#     try:
#         decode_token(token)
#     except Exception:
#         return jsonify({'message': 'Token inválido'}), 401

#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor(dictionary=True)
#         cursor.execute('SELECT * FROM mascotas WHERE id = %s', (pet_id,))
#         mascota = cursor.fetchone()
#         if not mascota:
#             return jsonify({'message': 'Mascota no encontrada'}), 404
#         return jsonify(mascota), 200
#     except Exception as e:
#         print(f"[ERROR get_pet]: {e}")
#         return jsonify({'message': 'Error al obtener mascota'}), 500


# ELIMINAR MASCOTA

def delete_pet(pet_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM mascotas WHERE id = %s", (pet_id,))
        conn.commit()
        return jsonify({'message': 'Mascota eliminada con éxito'}), 200
    except Exception as e:
        return jsonify({'message': f'Error al eliminar mascota: {str(e)}'}), 500
