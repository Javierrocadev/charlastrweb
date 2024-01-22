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
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const API_URL = "https://apitechriders.azurewebsites.net";

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
        console.error("Error in login:", error);
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
        console.error("Error getting charlas:", error);
        throw error;
      }
    },
    createCharla: async (charlaData) => {
      try {
        var token = localStorage.getItem("token");

        const response = await axios.post(
          `${API_URL}/api/Charlas`,
          charlaData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
      } catch (error) {
        console.error("Error creating charla:", error);
        throw error;
      }
    },
    eliminarCharla: async (idCharla) => {
      try {
        var token = localStorage.getItem("token");
        console.log(token);
        var requestTipoTecnologia =
          "api/tecnologiascharlas/deletebyidcharla/" + idCharla;
        var requestCharlas = "api/charlas/" + idCharla;
        var api = "https://apitechriders.azurewebsites.net/";
        var urlTipoTecnologia = api + requestTipoTecnologia;
        var urlcharla = api + requestCharlas;

        console.log(urlTipoTecnologia);
        console.log(urlcharla);

        axios
          .delete(urlTipoTecnologia, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            axios
              .delete(urlcharla, {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                window.location.reload();
                alert("Charla Eliminada");
              });
          });
      } catch (error) {
        console.error("Error creating charla:", error);
        throw error;
      }
    },

    getEstadoCharlas: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/EstadosCharlas`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    anularCharla: async (idcharla)=>{
      try {
      var token = localStorage.getItem("token")
  
     var idtechrider = 0;
     var idestadocharla = 1
     var request = "api/charlas/AsociarTechriderCharla/" + idtechrider+"/"+idcharla ;
     var api = "https://apitechriders.azurewebsites.net/" 
      var url = api + request
      console.log(url)
      axios.put(url,{},{
         headers: {
           Authorization: `Bearer ${token}`
         }
         }).then(response=>{
          var request = "api/charlas/UpdateEstadoCharla/"+idcharla+"/"+idestadocharla;
          var api = "https://apitechriders.azurewebsites.net/" 
          var url = api + request
          console.log(url)
          axios.put(url,{},{
             headers: {
                 Authorization: `Bearer ${token}`
               }
          })
          window.location.reload();
          alert("Charla Anulada");
       })
      } catch (error) {
        console.error("Error Anulando charla:", error);
        throw error;
      }
    },
    
    aceptarCharla: async (idTechrider,idCharla)=>{
      try {
        var token = localStorage.getItem("token")
    
       var idtechrider = idTechrider;
       var idcharla = idCharla
       var idestadocharla = 4
       console.log(idtechrider,idcharla)

       var request = "api/charlas/AsociarTechriderCharla/" + idtechrider+"/"+idcharla ;
       var api = "https://apitechriders.azurewebsites.net/" 
        var url = api + request
        console.log(url)
        axios.put(url,{},{
           headers: {
             Authorization: `Bearer ${token}`
           }
           }).then(response=>{
            var request = "api/charlas/UpdateEstadoCharla/"+idcharla+"/"+idestadocharla;
            var api = "https://apitechriders.azurewebsites.net/" 
            var url = api + request
            console.log(url)
            axios.put(url,{},{
               headers: {
                   Authorization: `Bearer ${token}`
                 }
            })
            window.location.reload();
            alert("Charla Anulada");
         })
        } catch (error) {
          console.error("Error Anulando charla:", error);
          throw error;
        }
    }
  },
  ValoracionesCharlas: {
    getValoracionesCharlas: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ValoracionesCharlas`);
        return response.data;
      } catch (error) {
        console.error("Error getting charlas:", error);
        throw error;
      }
    },
    getValoracionesById: async (idcharla)=>{
      try {
        console.log("edadfa"+ idcharla)
        const response = await axios.get(`${API_URL}/api/ValoracionesCharlas/valoraciones/` + idcharla);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error("Error getting charlas:", error);
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
        console.error("Error getting provincias:", error);
        throw error;
      }
    },
  },
  empresasCentros: {
    getEmpresasCentros: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/EmpresasCentros`);
        return response.data;
      } catch (error) {
        console.error("Error getting EmpresasCentros:", error);
        throw error;
      }
    },
    getTipoEmpresa: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tipoEmpresa`);
        return response.data;
      } catch (error) {
        console.error("Error getting EmpresasCentros:", error);
        throw error;
      }
    },
    insertarEmpresaCentro: async (empresaCentroData) => {
      try {
        var token = localStorage.getItem("token");

        const response = await axios.post(
          `${API_URL}/api/empresascentros`,
          empresaCentroData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    modificarEstadoEmpresaCentro: async (idEmpresaCentro, idEstado) => {
      try {
        var token = localStorage.getItem("token");

        const response = await axios.put(
          `${API_URL}/api/EmpresasCentros/UpdateEstadoEmpresaCentro/${idEmpresaCentro}/${idEstado}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    modificarEmpresaCentro: async (empresaCentroData) => {
      try {
        var token = localStorage.getItem("token");

        const response = await axios.put(
          `${API_URL}/api/EmpresasCentros`,
          empresaCentroData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    eliminarEmpresaCentro: async (idEmpresaCentro) => {
      try {
        var token = localStorage.getItem("token");

        const response = await axios.delete(
          `${API_URL}/api/EmpresasCentros/${idEmpresaCentro}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload();
        alert("Empresa-Centro Eliminada");
        return response.data;
        
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    updateEstadoCentroEmpresa: async (id, estado) => {
      console.log(id);
      console.log(estado);

      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.put(
          "https://apitechriders.azurewebsites.net/api/empresascentros/updateEstadoempresacentro/" +
            id +
            "/" +
            estado,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        window.location.reload();
        if(estado===0){
          alert("Centro dado de baja")
        }else{
          alert("Centro dado de alta")
        }
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
  },

  tecnologias: {
    getTecnologias: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Tecnologias`);
        return response.data;
      } catch (error) {
        console.error("Error getting provincias:", error);
        throw error;
      }
    },
    postTecnologia: async (nombreTecnologia) => {
      try {
        var token = localStorage.getItem("token");

        var idtecnologia = 0;
        var nombre = nombreTecnologia;
        var idtipotecnologia = 3;

        var newTecnologia = {
          idTecnologia: idtecnologia,
          nombreTecnologia: nombre,
          idTipoTecnologia: idtipotecnologia,
        };

        console.log(newTecnologia);
        console.log(token);
        var request = "api/tecnologias";
        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log(url);
        axios
          .post(url, newTecnologia, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            window.location.reload();
            alert("Tecnologia Añadida");
          });
      } catch (error) {
        console.error("Error getting provincias:", error);
        throw error;
      }
    },

    eliminarTecnologia: async (idtecnologia) => {
      try {
        const token = localStorage.getItem("token");
        console.log("token de axios: " + token);
        const response = await axios.delete(
          `${API_URL}/api/Tecnologias/` + idtecnologia,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
  },

  tecnologiasCharlas: {
    getTecnologiasCharlas: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/TecnologiasCharlas`);
        return response.data;
      } catch (error) {
        console.error("Error getting provincias:", error);
        throw error;
      }
    },
  },
  usuarios: {
    getUsuarios: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(
          "https://apitechriders.azurewebsites.net/api/Usuarios",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
    getPerfilUsuario: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(
          "https://apitechriders.azurewebsites.net/api/usuarios/PerfilUsuario",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response usuario:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },

    updateEstadoUsuario: async (id, estado) => {
      console.log(id);
      console.log(estado);

      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.put(
          "https://apitechriders.azurewebsites.net/api/usuarios/updateEstadoUsuario/" +
            id +
            "/" +
            estado,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        window.location.reload();
        if(estado===0){
          alert("Usuario dado de baja")
        }else{
          alert("Usuario dado de alta")
        }
        return response.data;
      
      } catch (error) {
        console.error("Error updating usuario estado:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
    putUsuarios: async (updateData) => {
      console.log(updateData);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${API_URL}/api/Usuarios`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
  },

  profesores: {
    getProfesores: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/Usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
  },

  centros: {
    getCursosByCentro: async () => {
      try {
        const token = localStorage.getItem("token");

        const responseUsuario = await axios.get(
          `${API_URL}/api/Usuarios/PerfilUsuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let idUsuario = responseUsuario.data.idUsuario;
        const responseCursos = await axios.get(
          `${API_URL}/api/QueryTools/FindCursosProfesor/${idUsuario}`
        );

        return responseCursos.data;
      } catch (error) {
        console.log("Error: ", error);
      }
    },

    getCentroById: async (idCentro) => {
      try {
        const token = localStorage.getItem("token");

        const centroresponse = await axios.get(
          `${API_URL}/api/EmpresasCentros/${idCentro}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return centroresponse.data;
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    getPosiblesCharlasCentro: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/Charlas`);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getCursos: async ()=>{
      try{
        const responseCursos = await axios.get(`${API_URL}/api/Cursos`);
        return responseCursos.data;
      }catch(error){
        console.log(error);
      }
    },
  },
  empresas: {
    getCharlasByEmpresa: async () => {
      try {
        const token = localStorage.getItem("token");

        const responseUsuario = await axios.get(
          `${API_URL}/api/Usuarios/PerfilUsuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(responseUsuario);

        const response = await axios.get(
          `${API_URL}/api/QueryTools/CharlasEmpresas`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    getTRByEmpresa: async () => {
      try {
        const token = localStorage.getItem("token");

        const responseUsuario = await axios.get(
          `${API_URL}/api/Usuarios/PerfilUsuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const idEmpresaCentro = responseUsuario.data.idEmpresaCentro;
        console.log(idEmpresaCentro);

        const response = await axios.get(
          `${API_URL}/api/QueryTools/FindTechRidersEnEmpresa/${idEmpresaCentro}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    getCharlasTrEmpresa: async (idTr) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/QueryTools/CharlasTechRider?idtechrider=${idTr}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //console.log(response.data)
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  roles: {
    getRoles: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/Roles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
    putUsuarios: async (updateData) => {
      console.log(updateData);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${API_URL}/api/Usuarios`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
  },
  techriders: {
  
    getcharlastechrider: async (idtechrider) => {
      try {
        const token = localStorage.getItem("token");
        console.log("vacio" + idtechrider);
        console.log("token de axios: " + token + "afda" +idtechrider);
        const response = await axios.get(
          `${API_URL}/api/QueryTools/CharlasTechRider?idtechrider=` + idtechrider,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
    getCharlasDisponiblesTrTecnologia: async (idtechrider) => {
      try {
        const token = localStorage.getItem("token");
        console.log("vacio" + idtechrider);
        console.log("token de axios: " + token + "afda" +idtechrider);
        const response = await axios.get(
          `${API_URL}/api/QueryTools/findcharlaspendientestecnologiastechrider?idtechrider=`+idtechrider,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Responseeeee:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },

    getTecnologiasPendientesEnCharlas: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/QueryTools/TecnologiasPendientesencharlas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error getting usuarios:", error);

        // Si la respuesta es 401, redirigir a la página de inicio de sesión
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          return <Navigate to="/login" />; // Volvemos al login si el token no funciona
        }

        throw error;
      }
    },
  },
};

export default axiosApi;
