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

    anularCharla: async (idcharla) => {
      try {
        var token = localStorage.getItem("token");

        var idtechrider = 0;
        var idestadocharla = 1;
        var request =
          "api/charlas/AsociarTechriderCharla/" + idtechrider + "/" + idcharla;
        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log(url);
        axios
          .put(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            var request =
              "api/charlas/UpdateEstadoCharla/" +
              idcharla +
              "/" +
              idestadocharla;
            var api = "https://apitechriders.azurewebsites.net/";
            var url = api + request;
            console.log(url);
            axios.put(
              url,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            window.location.reload();
            alert("Charla Anulada");
          });
      } catch (error) {
        console.error("Error Anulando charla:", error);
        throw error;
      }
    },
    acreditarCharla: async (idcharla,idpeticion) => {
      try {
        var token = localStorage.getItem("token");
        console.log(idcharla + idpeticion)
        var idestadocharla = 6;
        var request = "api/charlas/UpdateEstadoCharla/" + idcharla + "/" + idestadocharla;
        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log(url);
        await axios.put(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response=>{
          var requestEliminarPeticion = "api/solicitudacreditacionescharlas/"+idpeticion
          var url = api+requestEliminarPeticion
          axios.delete(url,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
        })
        window.location.reload();
        alert("Charla Acreditada");
      } catch (error) {
        console.error("Error Acreditando charla:", error);
        throw error;
      }
    },
    
    aceptarCharla: async (idTechrider,idCharla)=>{
      try {
        var token = localStorage.getItem("token")
    
       var idtechrider = idTechrider;
       var idcharla = idCharla
       var idestadocharla = 3
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
            alert("Charla Aceptada");
          });
      } catch (error) {
        console.error("Error Anulando charla:", error);
        throw error;
      }
    },

    getCharlasByProfesor: async (idProfesor) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/QueryTools/CharlasCursosProfesor/${idProfesor}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
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
    getValoracionesById: async (idcharla) => {
      try {
        console.log("edadfa" + idcharla);
        const response = await axios.get(
          `${API_URL}/api/ValoracionesCharlas/valoraciones/` + idcharla
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error getting charlas:", error);
        throw error;
      }
    },
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

    modificarEstadoEmpresaCentro: async (idEmpresaCentro, idEstado) => {
      try {
        var token = localStorage.getItem("token");

        const response = await axios.put(
          `${API_URL}/api/EmpresasCentros/UpdateEstadoEmpresaCentro/${idEmpresaCentro}/${idEstado}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        window.location.reload();
          alert("Empresa dada de alta");
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
        const token = localStorage.getItem("token");
        console.log("token de axios: " + token);
        const response = await axios.delete(
          `${API_URL}/api/EmpresasCentros/` + idEmpresaCentro,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload();
        alert("Empresa/Centro Eliminado");
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
        // window.location.reload();
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

    putResponsableEmpresa: async (idempresacentro, idresponsable) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${API_URL}/api/usuarios/updateresponsableempresacentro/${idempresacentro}/${idresponsable}`,
          {},
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
      }
    },

    getEmpresasCentrosporID: async (idempresacentro) => {
      try {
        const response = await axios.get(
          `${API_URL}/api/EmpresasCentros/` + idempresacentro
        );
        return response.data;
      } catch (error) {
        console.error("Error getting EmpresasCentros:", error);
        throw error;
      }
    },

    peticionesAltaEmpresaCentro: async (idCentroEmpresa) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/api/PeticionesCentroEmpresa?idcentroempresa=` +
            idCentroEmpresa,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
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
    modificarTecnologia: async (
      idtecnologia,
      descripcion,
      idtipotecnologia
    ) => {
      try {
        const token = localStorage.getItem("token");
        console.log("token de axios: " + token);

        var newTecnologia = {
          idTecnologia: idtecnologia,
          nombreTecnologia: descripcion,
          idTipoTecnologia: idtipotecnologia,
        };
        const response = await axios.put(
          `${API_URL}/api/Tecnologias/`,
          newTecnologia,
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
    postUsuarios: async (userData) => {
      try {
        var token = localStorage.getItem("token");

        console.log(userData);
        var request =
          "api/Usuarios"
        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log(url);
        axios
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            window.location.reload();
            alert("Solicitud Enviada", "Sera revisada por el admin");
          });
      } catch (error) {
        console.error("Error getting provincias:", error);
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
        if (estado === 0) {
          alert("Usuario dado de baja");
        } else {
          alert("Usuario dado de alta");
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
    eliminarUsuario: async (idusuario) => {
      try {
        const token = localStorage.getItem("token");
        console.log("token de axios: " + token);
        const response = await axios.delete(
          `${API_URL}/api/Usuarios/` + idusuario,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload();
        alert("Usuario Eliminado");
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

    CrearCurso: async (dataCurso) => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/api/cursos`, dataCurso, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    EliminarCurso: async (idCurso) => {
      try {
        const token = localStorage.getItem("token");
        //const response = await axios.delete(`${API_URL}/api/Cursos/${idCurso}`,
        console.log("IDCURSO: ", idCurso);
        const responsedelete = await axios.delete(`${API_URL}/api/cursos/${idCurso}`,
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
         });
        return responsedelete.data;
      } catch (error) {
        console.log(error);
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
        console.log("cursos del profesor: ",responseCursos);
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
    getCursos: async () => {
      try {
        const responseCursos = await axios.get(`${API_URL}/api/QueryTools/CursosProfesorAll`);
        return responseCursos.data;
      } catch (error) {
        console.log(error);
      }
    },
    getCursosByProfesor: async (idProfesor) => {
      try {
        const token = localStorage.getItem("token");

        const responseCursos = await axios.get(
          `${API_URL}/api/QueryTools/CharlasCursosProfesor/${idProfesor}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return responseCursos.data;
      } catch (error) {
        console.log("Error: ", error);
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

    getTREmpresasAll: async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/QueryTools/TechRidersEmpresasAll`,
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
          `${API_URL}/api/QueryTools/CharlasTechRider/${idTr}`,
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
      getTr: async () => {
        try {
          const response = await axios.get(`${API_URL}/api/QueryTools/TodosTechRidersActivos`);
          return response.data;
        } catch (error) {
          console.error("Error getting charlas:", error);
          throw error;
        }
      },
    getcharlastechrider: async (idtechrider) => {
      try {
        const token = localStorage.getItem("token");
        console.log("vacio" + idtechrider);
        console.log("token de axios: " + token + "afda" + idtechrider);
        const response = await axios.get(
          `${API_URL}/api/QueryTools/CharlasTechRider/` + idtechrider,
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
        console.log("token de axios: " + token + "afda" + idtechrider);
        const response = await axios.get(
          `${API_URL}/api/QueryTools/findcharlaspendientestecnologiastechrider?idtechrider=` +
            idtechrider,
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
        const response = await axios.get(
          `${API_URL}/api/QueryTools/TecnologiasPendientesencharlas`,
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
    getEmpresaTr: async (idtechrider) => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/QueryTools/findempresatechrider/` +idtechrider, {
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
  tecnologiasTechriders: {
    getTecnologiasTechriders: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(
          `${API_URL}/api/tecnologiastechriders`,
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
    PostTecnologiasTechRider: async (idtecnologia, idtechrider) => {
      try {
        var token = localStorage.getItem("token");

        var idTec = parseInt(idtecnologia);

        console.log(token);
        var request =
          "api/TecnologiasTechriders/insertTecnologiaTechRiders/" +
          idtechrider +
          "/" +
          idTec;

        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log("url" + url);
        axios
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            window.location.reload();
            alert("Tecnologia Añadida a mis tecnologias");
          });
      } catch (error) {
        console.error("Error getting provincias:", error);
        throw error;
      }
    },
  },
  peticionesTecnologias: {
    getPeticionesTecnologias: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/peticionestecnologias`, {
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
    PostPeticionTecnologia: async (nombreTecnologia) => {
      try {
        var token = localStorage.getItem("token");

        console.log(token);
        var request =
          "api/PeticionesTecnologias/InsertPeticionTecnologia/" +
          nombreTecnologia;
        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log(url);
        axios
          .post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            window.location.reload();
            alert("Solicitud Enviada", "Sera revisada por el admin");
          });
      } catch (error) {
        console.error("Error getting provincias:", error);
        throw error;
      }
    },
  },
  solicitudesAcreditacion: {
    getSolicitudesAcreditacion: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/SolicitudAcreditacionesCharlas`, {
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
    PostSolicitudesAcreditacion: async (idcharla) => {
      try {
        var token = localStorage.getItem("token");

        console.log(token);
        var request = "api/SolicitudAcreditacionesCharlas?idcharla="+idcharla;
        var api = "https://apitechriders.azurewebsites.net/";
        var url = api + request;
        console.log(url);
        axios
          .post(url,{},{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            window.location.reload();
            alert("Solicitud Enviada", "Sera revisada por el admin");
          });
      } catch (error) {
        console.error("Error getting provincias:", error);
        throw error;
      }
    },
  },
  peticionesCentroEmpresa: {
    getPeticionesCentroEmpresa: async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token de axios: " + token);
        const response = await axios.get(`${API_URL}/api/PeticionesCentroEmpresa`, {
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

  deletePeticionCentroEmpresa: async (idPeticion)=>{
    try {
      const token = localStorage.getItem("token");
      console.log("token de axios: " + token);
      const response = await axios.delete(
        `${API_URL}/api/peticionesCentroEmpresa?idpeticion=`+ idPeticion,
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

  deleteAllPeticionCategoria: async (idPeticion)=>{
    try {
      const token = localStorage.getItem("token");
      console.log("token de axios: " + token);
      const response = await axios.delete(
        `${API_URL}/api/peticionesCentroEmpresa/DeletePeticionEmpresaAll/`+ idPeticion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      alert("Peticion denegada")
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
  }
},
cursos:{
  postCurso: async (idcentro,nombre,descripcion) => {
    try {
      var token = localStorage.getItem("token");

      var idcurso = 0;

      var newCurso = {
        idCurso: idcurso,
        idCentro: idcentro,
        nombreCurso: nombre,
        descripcion: descripcion
      };

      console.log(newCurso);
      console.log(token);
      var request = "api/cursos";
      var api = "https://apitechriders.azurewebsites.net/";
      var url = api + request;
      console.log(url);
      axios
        .post(url, newCurso, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
          alert("Curso Añadido");
        });
    } catch (error) {
      console.error("Error getting provincias:", error);
      throw error;
    }
  },
  eliminarCurso: async (idcurso) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token de axios: " + token);
      const response = await axios.delete(
        `${API_URL}/api/cursos/` + idcurso,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      alert("Curso Eliminado");
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
}

};

export default axiosApi;
