import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
  Link,
  useLocation
} from "react-router-dom";
import React, { useEffect } from 'react';
import { AuthContextProvider } from "./contexts/authContext";
import Layout from "./components/layout/Layout";
// paginas para usuarios normales
import Home from "./components/views/user/Home";
import Login from "./components/views/user/Login";
import RegistroUsuario from "./components/views/user/RegistroUsuario";
import Empresas from "./components/views/user/Empresas";
import QuienesSomos from "./components/views/user/QuienesSomos";
import Centros from "./components/views/user/Centros";
import NoAutorizado from "./components/views/user/NoAutorizado";
import Comentarios from "./components/views/user/Comentarios";
//admin pages
import HomeAdmin from "./components/views/admin/HomeAdmin";
//representantes pages
import HomeRepresentante from "./components/views/representante/HomeRepresentante";
//tech riders pages
import HomeTechRiders from "./components/views/tr/HomeTechRiders";

import RouteAdmin from "./router/RouteAdmin";
//   import RouteTr from "./components/RouteTr";

// Agregar el código de refresco aquí
const App = () => {
  useEffect(() => {
    // Agregar el código de refresco aquí
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    } else {
      console.error('HSStaticMethods is not defined. Make sure it is defined before calling autoInit.');
    }
  }, []);
  return (
    <AuthContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/comentarios" element={<Comentarios />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/centros" element={<Centros />} />
            <Route path="/quienessomos" element={<QuienesSomos />} />
            <Route
              path="/admin"
              element={<RouteAdmin path="/admin" component={<HomeAdmin />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/403" element={<NoAutorizado />} />
          </Routes>
        </Layout>
      </Router>
    </AuthContextProvider>
  );
};

export default App;