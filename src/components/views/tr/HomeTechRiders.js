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
      const response = await axiosApi.charlas.getCharlas();
      console.log("Charlas response:", response);
      setCharlasResponse(response);

      const tecnologiasResponse = await axiosApi.tecnologias.getTecnologias();
      console.log("Tecnologias responseProvincias:", tecnologiasResponse);
      setTecnologiasResponse(tecnologiasResponse);
    };

    fetchData();
  }, []);


  const getTecnologiaNombre = (idTecnologia) => {
    const tecnologia = tecnologiasResponse.find(
      (p) => p.idTecnologia === idTecnologia
    );
    return tecnologia ? tecnologia.nombreTecnologia : "Desconocido";
  };
  return (
    <main>
       <section class="text-gray-600 body-font mt-6">
       <div class="sm:col-span-9">
          <div class="sm:flex ">
            <input id="af-account-phone" type="text" class="py-3 mr-4 sm:mb-0 mb-4 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 " />
            <select class="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0  text-sm relative focus:z-10  focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ">
                {tecnologiasResponse.map((tecnologia) => (
                <option key={tecnologia.idTecnologia} value={tecnologia.idTecnologia}  >
               {tecnologia.nombreTecnologia}
              </option>
              ))}

            </select>
          </div>
  
         
        </div>
      </section>
                {/* <section>
                <div>
  {tecnologiasResponse.map((tecnologia, index) => (
    <div key={index}>
      {tecnologia.nombreTecnologia}
    </div>
  ))}
</div>

                </section> */}
    </main>
  );
};

export default HomeTechRiders;