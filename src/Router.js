import {
    BrowserRouter as Router,
    RouterProvider,
    Route,
    Routes,
    Link,
  } from "react-router-dom";
  import React from "react";
  import {AuthContextProvider} from "./contexts/authContext"
  import Layout from "./components/layout/Layout";
  // paginas para usuarios normales
  import Home from "./components/views/user/Home";
  import Login from "./components/views/user/Login";
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
  const App = () => {
    return (
      <AuthContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comentarios" element={<Comentarios />} />
            <Route path="/admin" element={<RouteAdmin path="/admin" component={<HomeAdmin/>} />} />
            {/* <Route path="/pag2" element={<RouteTr path="/pag2" component={<Pag2/>} />} />
            <Route path="/pag3" element={<RouteAdmin path="/pag3" component={<Pag3/>} />} />
            <Route path="/pag4" element={<Pag4 />} />
            <Route path="/pag5" element={<Pag5 />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/403" element={<NoAutorizado />} />
           
        
          </Routes>
        </Layout>
      </Router>
      </AuthContextProvider>
    );
  };
  
  export default App;