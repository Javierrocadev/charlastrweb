// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://apitechriders.azurewebsites.net',
// });

// const axiosApi = {
//   getCharlas: async () => {
//     const response = await axiosInstance.get('/api/Charlas');
//     return response.data;
//   },
//   getComentarios: async () => {
//     // const response = axiosInstance.get('/api/ValoracionesCharlas');
//     var request = 'api/valoracionescharlas';
//     var api = 'https://apitechriders.azurewebsites.net/';
//     var url = api + request;
//     axios.get(url).then((response) => {
//       return response.data;
//     });
//   },
// };

// export default axiosApi; 
import axios from 'axios';

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
  }
};

export default axiosApi;