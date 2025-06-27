from db import get_db_connection

def insert_pet(data, user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO mascotas (nombre, especie, raza, edad, sexo, imagen_url, estado, salud, tamanio, ubicacion, info_adicional, id_usuario)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(query, (
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
            user_id
        ))

        conn.commit()
        return {'success': True}

    except Exception as e:
        print(f"[ERROR insert_pet]: {e}")
        return {'success': False, 'message': str(e)}
