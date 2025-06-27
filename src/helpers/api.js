import axios from 'axios';
import { getEnvVariables } from './';

const { REACT_APP_API_URL } = getEnvVariables()

export const api = axios.create({
    baseURL: REACT_APP_API_URL
});

// Todo: configurar interceptores
api.interceptors.request.use( config => {

console.log(REACT_APP_API_URL)

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  
    return config;
})

