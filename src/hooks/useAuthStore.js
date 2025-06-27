// src/hooks/useAuthStore.js (o donde tengas el hook)

import { useDispatch, useSelector } from 'react-redux';
import { api } from '../helpers';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

   const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      console.log(data)
      dispatch(onLogin(data));

    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async (formData) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post('/api/auth/register', formData);
      console.log(data)

      dispatch(onLogout('Registrado correctamente. Iniciá sesión.'));
    } catch (error) {
      dispatch(onLogout(error.response?.data?.error || 'Error al registrar'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
        const { data } = await api.get('/api/auth/renew');
       console.log(data)
        localStorage.setItem('token', data.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
     
        dispatch( onLogin(data) );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const startUpdateUser = async (formData) => {
    dispatch(onChecking());
    try {
      const { data } = await api.put('/api/auth/update-user', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Actualizo el user en redux con la info nueva (data debería traer el user actualizado)
      dispatch(onLogin({
        ...user,             // mantengo lo que haya
        ...data,             // actualizo con datos nuevos
      }));
      dispatch(clearErrorMessage());
      return true;
    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Error al actualizar perfil'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
      return false;
    }
  };

  const startDeleteUser = async () => {
    dispatch(onChecking());
    try {
      const res = await api.delete('/api/auth/delete-user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.status === 200) {
        dispatch(onLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        return true;
      }
      throw new Error('No se pudo eliminar la cuenta');
    } catch (error) {
      dispatch(onLogout(error.response?.data?.message || 'Error al eliminar cuenta'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
      return false;
    }
  };

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
    startUpdateUser,
    startDeleteUser,
  };
};
