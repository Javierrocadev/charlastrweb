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
import EjemploAdmin from "./components/views/admin/EjemploAdmin";
import VerEmpresasCentroAdmin from "./components/views/admin/VerEmpresasCentroAdmin";
import VerTechRidersAdmin from "./components/views/admin/VerTechRidersAdmin";
import VerCharlasAdmin from "./components/views/admin/VerCharlasAdmin";
import NotificacionesAdmin from "./components/views/admin/NotificacionesAdmin"
import AñadirTecnologia from "./components/views/admin/AñadirTecnologia";
//representantes pages
import HomeRepresentante from "./components/views/representante/HomeRepresentante";
//tech riders pages
import HomeTechRiders from "./components/views/tr/HomeTechRiders";
import MisCharlasTr from "./components/views/tr/MisCharlasTr";
import CharlasDisponibles from "./components/views/tr/CharlasDisponibles"
// centro/profesor pages
import HomeProfesor from "./components/views/profesor/HomeProfesor";
import InscripcionCentro from "./components/views/profesor/InscripcionCentro";

import RouteAdmin from "./router/RouteAdmin";
import RouteRepresentante from "./router/RouteRepresentante";
import RouteTechRider from "./router/RouteTechRider";
import RouteProfesor from "./router/RouteProfesor";
import VistaProfesores from "./components/views/admin/VistaProfesores";
import VistaCursosCentrto from "./components/views/profesor/VerCursoCentro";
import VistaCharlasCentrto from "./components/views/profesor/VerCharlasCentro";
import InscripcionEmpresa from "./components/views/representante/InscripcionEmpresa";
import VistaTechridersEmpresa from "./components/views/representante/vistaTREmpresa";
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
            {/* rutas de admin */}
            <Route
              path="/admin"
              element={<RouteAdmin path="/admin" component={<HomeAdmin />} />}
              
            />
            <Route
              path="/vercharlas"
              element={<RouteAdmin path="/vercharlas" component={<VerCharlasAdmin />} />}
              
            />
             <Route
              path="/notificacionesadmin"
              element={<RouteAdmin path="/notificacionesadmin" component={<NotificacionesAdmin />} />}
              
            />
             <Route
              path="/verempresascentro"
              element={<RouteAdmin path="/verempresascentro" component={< VerEmpresasCentroAdmin/>} />}
              
            />
            <Route
              path="/ejemplo"
              element={<RouteAdmin path="/ejemplo" component={<EjemploAdmin />} />}
            />
            <Route
              path="/vertr"
              element={<RouteAdmin path="/ejemplo" component={<VerTechRidersAdmin />} />}
            />
            <Route
              path="/añadirtecnologia"
              element={<RouteAdmin path="/añadirtecnologia" component={<AñadirTecnologia />} />}
            />
              <Route
              path="/vistaprofesores"
              element={<RouteAdmin path="/vistaprofesores" component={<VistaProfesores />} />}
            />
            {/* rutas de tr */}
            <Route
              path="/tr"
              element={<RouteTechRider path="/tr" component={<HomeTechRiders />} />}
            /> 
             <Route
              path="/charlastechrider"
              element={<RouteTechRider path="/charlastechrider" component={<MisCharlasTr />} />}
            /> CharlasDisponibles
              <Route
              path="/charlasdisponibles"
              element={<RouteTechRider path="/charlasdisponibles" component={<CharlasDisponibles />} />}
            />
            {/* rutas de representantes/empresas */}
            <Route
              path="/representante"
              element={<RouteRepresentante path="/representante" component={<HomeRepresentante />} />}
            />
            <Route path="/vistatrempresa"
            element={<RouteRepresentante path="/vistatrempresa" component={<VistaTechridersEmpresa/>} />}
            />
            <Route path="/inscripcionempresa"
            element={<RouteRepresentante path="/inscripcionempresa" component={<InscripcionEmpresa/>} />}
            />
            <Route path="/propuestatecnologias"
            element={<RouteRepresentante path="/propuestatecnologias" component={<HomeRepresentante></HomeRepresentante>} />}
            />
            {/* rutas de profesor/centro */}
            <Route
              path="/profesor"
              element={<RouteProfesor path="/profesor" component={<HomeProfesor />} />}
            />
              <Route
              path="/vercursocentro"
              element={<RouteProfesor path="/vercursocentro" component={<VistaCursosCentrto />} />}
            />
            <Route
              path="/vercharlasocentro"
              element={<RouteProfesor path="/vercharlasocentro" component={<VistaCharlasCentrto />} />}
            />
            <Route path="/inscripcioncentro"
            element={<RouteProfesor path="/inscripcioncentro" component={<InscripcionCentro/>} />}/>

          <Route path="/propuestatecnologias"
            element={<RouteProfesor path="/propuestatecnologias" component={<HomeProfesor></HomeProfesor>} />}
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