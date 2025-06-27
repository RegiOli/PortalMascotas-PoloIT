// src/hooks/usePetsStore.js
import { useDispatch, useSelector } from 'react-redux';
import { onStartLoading, onLoadPets, onErrorPets } from '../store/pets/petSlice';
import { api } from '../helpers';

export const usePetsStore = () => {
  const dispatch = useDispatch();
  const { pets, isLoading, error, totalPages, currentPage } = useSelector(state => state.pets);

  const startLoadingPets = async (filtros = {}, pagina = 1, limit = 3) => {
    dispatch(onStartLoading());

    try {
      const queryParams = new URLSearchParams();
      Object.entries(filtros).forEach(([key, values]) => {
        values.forEach((value) => queryParams.append(key, value));
      });
      queryParams.append('page', pagina);
      queryParams.append('limit', limit);

      const { data } = await api.get(`/api/mascotas/?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      dispatch(onLoadPets(data));
    } catch (error) {
      dispatch(onErrorPets(error.message || 'Error al cargar mascotas'));
    }
  };

  return {
    pets,
    isLoading,
    error,
    totalPages,
    currentPage,

    // Funciones
    startLoadingPets,
  };
};
