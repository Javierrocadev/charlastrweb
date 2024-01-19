import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";

// import FormRepresentante from "./formularios/FormRepresentante"
// import FormTechRiders from "./formularios/FormTechRiders";
// import FormCentros from "./formularios/FormCentro";

const HomeTechRiders = () => {
    const [formulario, setFormulario] = useState(null);

    const handleFormularioClick = (tipoUsuario) => {
      setFormulario(tipoUsuario);
    };


  const [charlasResponse, setCharlasResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [tecnologiasResponse, setTecnologiasResponse] = useState([]);
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      
       
    };

    fetchData();
  }, []);



  return (
    <main>
       <section class="text-gray-600 body-font mt-6">
        <div class="flex flex-wrap w-full mb-12 flex-col items-center text-center">
          <h2 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Tech Riders home
          </h2>
          <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
            tr
          </p>
        </div>
       
      </section>

    </main>
  );
};

export default HomeTechRiders;