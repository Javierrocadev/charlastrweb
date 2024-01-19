import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useEffect
  } from "react";
  import PropTypes from "prop-types";
  import axios from "axios";
  
  
  
  export const AuthContext = createContext();
  
  
  export function AuthContextProvider({ children }) {
      const [isAuthenticated, setIsAuthenticated] = useState(() => window.localStorage.getItem('token'));
      const [role, setRole] = useState(null); // Nuevo estado para almacenar el rol
      const [token, setToken] = useState(null); // Nuevo estado para almacenar el token
      const [redirectTo, setRedirectTo] = useState(null);

      useEffect(() => {
        // Este efecto se ejecuta cada vez que 'role' se actualiza
        console.log("Nuevo valor de 'role':", role);
      }, [role]); // La dependencia de 'role' asegura que el efecto se ejecute cuando 'role' cambie
    

      const login = useCallback(function (email, password) {
        var usuario = {
          email: email,
          password: password,
        };
        var request = 'api/Auth/Login';
        var api = 'https://apitechriders.azurewebsites.net/';
        var url = api + request;
        axios.post(url, usuario).then((response) => {
          
          if (response.data) {
            window.localStorage.setItem("token", response.data.response);
            setIsAuthenticated(true);
            
            // Llamada adicional para obtener el rol
            var requestRole = 'api/Usuarios/PerfilUsuario';
            var urlRole = api + requestRole;
            var token = localStorage.getItem("token");
            setToken(response.data.response);
            console.log(token);
            axios.get(urlRole,  {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((roleResponse) => {
              console.log(roleResponse.data.idRole);
              window.localStorage.setItem('role', roleResponse.data.idRole);
              console.log("localstorage "+roleResponse.data.idRole)
              setRole(roleResponse.data.idRole);

              console.log("DDespues de hacer setRole"+role);
              console.log(roleResponse.data.idRole);
              return (roleResponse.data.idRole);

         
            });
          } else {
            // Manejo de errores si no se inicia sesión correctamente
          }
        });
      }, [role]);
    
      const logout = useCallback(function () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('role'); // Limpiar el rol al cerrar sesión
        setIsAuthenticated(false);
        setRole(null); // Reiniciar el estado del rol
        setToken(null); // Reiniciar el estado del rol
        console.log("todo cerrado");
      }, []);
    
      const value = useMemo(
        () => ({
          login,
          logout,
          isAuthenticated,
          role,
          token
        }),
        [isAuthenticated, login, logout, role, token]
      );
    
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
    
    AuthContextProvider.propTypes = {
      children: PropTypes.object,
    };
    
    export function useAuthContext() {
      return useContext(AuthContext);
    }