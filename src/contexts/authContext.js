import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  import PropTypes from "prop-types";
  import axios from "axios";
  
  
  
  export const AuthContext = createContext();
  
  
  export function AuthContextProvider({ children }) {
      const [isAuthenticated, setIsAuthenticated] = useState(() => window.localStorage.getItem('token'));
      const [role, setRole] = useState(null); // Nuevo estado para almacenar el rol
    
      const login = useCallback(function (email, password) {
        var usuario = {
          email: email,
          password: password,
        };
        var request = 'api/Auth/Login';
        var api = 'https://apitechriders.azurewebsites.net/';
        var url = api + request;
        axios.post(url, usuario).then((response) => {
          console.log(response.data);
          if (response.data) {
            window.localStorage.setItem("token", response.data.response);
            setIsAuthenticated(true);
            
            // Llamada adicional para obtener el rol
            var requestRole = 'api/Usuarios/PerfilUsuario';
            var urlRole = api + requestRole;
            var token = localStorage.getItem("token");
            console.log(token);
            axios.get(urlRole,  {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((roleResponse) => {
              console.log(roleResponse.data.idRole);
              window.localStorage.setItem('role', roleResponse.data.idRole);
              setRole(roleResponse.data.idRole);
              setIsAuthenticated(true);
            });
          } else {
            // Manejo de errores si no se inicia sesión correctamente
          }
        });
      }, []);
    
      const logout = useCallback(function () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('role'); // Limpiar el rol al cerrar sesión
        setIsAuthenticated(false);
        setRole(null); // Reiniciar el estado del rol
      }, []);
    
      const value = useMemo(
        () => ({
          login,
          logout,
          isAuthenticated,
          role,
        }),
        [isAuthenticated, login, logout, role]
      );
    
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
    
    AuthContextProvider.propTypes = {
      children: PropTypes.object,
    };
    
    export function useAuthContext() {
      return useContext(AuthContext);
    }