// createCharla: async (charlaData) => {
//   try {
//     const { role } = useContext(AuthContext); // Obtener el rol del contexto
//     // Haz algo con el rol si es necesario
//     console.log('User Role:', role);

//     const response = await axios.post(`${API_URL}/api/Charlas`, charlaData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating charla:', error);
//     throw error;
//   }
// },
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

const API_URL = 'https://apitechriders.azurewebsites.net';

const axiosApi = {
  
  auth: {
    login: async (email, password) => {
      try {
        const response = await axios.post(`${API_URL}/api/Auth/Login`, {
          email,
          password,
        });
        return response.data;
      } catch (error) {
        console.error('Error in login:', error);
        throw error;
      }
    },
  },
  charlas: {
    getCharlas: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Charlas`);
        return response.data;
      } catch (error) {
        console.error('Error getting charlas:', error);
        throw error;
      }
    },
    createCharla: async (charlaData) => {
      try {
        const response = await axios.post(`${API_URL}/api/Charlas`, charlaData);
        return response.data;
      } catch (error) {
        console.error('Error creating charla:', error);
        throw error;
      }
    },
  },
  ValoracionesCharlas: {
    getValoracionesCharlas: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ValoracionesCharlas`);
        return response.data;
      } catch (error) {
        console.error('Error getting charlas:', error);
        throw error;
      }
    }
  },
  provincias: {
    getProvincias: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Provincias`);
        return response.data;
      } catch (error) {
        console.error('Error getting provincias:', error);
        throw error;
      }
    }
  },
  empresasCentros: {
    getEmpresasCentros: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/EmpresasCentros`);
        return response.data;
      } catch (error) {
        console.error('Error getting EmpresasCentros:', error);
        throw error;
      }
    }
  },
  tecnologias: {
    getTecnologias: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Tecnologias`);
        return response.data;
      } catch (error) {
        console.error('Error getting provincias:', error);
        throw error;
      }
    }
  },
  tecnologiasCharlas: {
    getTecnologiasCharlas: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/TecnologiasCharlas`);
        return response.data;
      } catch (error) {
        console.error('Error getting provincias:', error);
        throw error;
      }
    }
  },
  usuarios:{
    getUsuarios: async () => {
      const { token } = localStorage.getItem('token');

      try {
        const response = await axios.get(`${API_URL}/api/Usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token a los encabezados
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error getting usuarios:', error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access. Redirecting to login...');
          return <Navigate to="/login" />;// Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
  },
};

export default axiosApi;