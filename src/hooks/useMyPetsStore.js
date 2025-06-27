import { useDispatch, useSelector } from 'react-redux';
import {
  onStartLoading,
  onLoadMyPets,
  onErrorMyPets,
  onUpdatePet,
  onDeletePet,
} from '../store/myPets/myPetsSlice';
import { api } from '../helpers';
import Swal from 'sweetalert2';

export const useMyPetsStore = () => {
  const dispatch = useDispatch();
  const { pets, isLoading, error } = useSelector((state) => state.myPets);

  const startLoadingMyPets = async () => {
    dispatch(onStartLoading());
    try {
      const { data } = await api.get('/api/mascotas/usuario', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(onLoadMyPets(data));
    } catch (err) {
      dispatch(onErrorMyPets('Error al cargar tus mascotas'));
    }
  };

  const startUpdatingPet = async (petEditada) => {
    try {
      const camposAEnviar = {};
      const campos = [
        "nombre", "especie", "raza", "edad", "sexo", "imagen_url",
        "estado", "salud", "tamanio", "ubicacion", "info_adicional"
      ];

      campos.forEach((campo) => {
        const valor = petEditada[campo];
        if (valor !== undefined && valor !== "") {
          camposAEnviar[campo] = valor;
        }
      });

      const { data } = await api.put(`/api/mascotas/${petEditada.id}`, camposAEnviar, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch(onUpdatePet({ id: petEditada.id, ...camposAEnviar }));
      Swal.fire("¡Guardado!", "La publicación fue actualizada correctamente.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo editar la publicación.", "error");
    }
  };

  const startDeletingPet = async (id) => {
    try {
      await api.delete(`/api/mascotas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(onDeletePet(id));
      Swal.fire("¡Eliminado!", "La publicación fue eliminada correctamente.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar la publicación.", "error");
    }
  };

  const startRegisterPet = async (nuevaMascota) => {
  try {
    const { data } = await api.post('/api/mascotas/registrar', nuevaMascota, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Podés cargar nuevamente todas las mascotas o agregar solo la nueva al state
    await startLoadingMyPets(); // refrescamos la lista del usuario

    Swal.fire("¡Registrado!", data.message || "Mascota registrada con éxito.", "success");
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.response?.data?.message || "No se pudo registrar la mascota.", "error");
  }
};


  return {
    pets,
    isLoading,
    error,
    startLoadingMyPets,
    startRegisterPet,
    startUpdatingPet,
    startDeletingPet,
  };
};
