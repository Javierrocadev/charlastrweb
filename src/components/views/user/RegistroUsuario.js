import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";

import FormRepresentante from "./formularios/FormRepresentante"
import FormTechRiders from "./formularios/FormTechRiders";
import FormCentros from "./formularios/FormCentro";

const RegistroUsuario = () => {
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
      try {
        const response = await axiosApi.charlas.getCharlas();
        console.log("Charlas response:", response);
        setCharlasResponse(response);

        const responseProvincias = await axiosApi.provincias.getProvincias();
        console.log("Charlas responseProvincias:", responseProvincias);
        setProvinciasResponse(responseProvincias);

        const responseTecnologias = await axiosApi.tecnologias.getTecnologias();
        console.log("Charlas responseTecnologias:", responseTecnologias);
        setTecnologiasResponse(responseTecnologias);

        const responseTecnologiasCharlas =
          await axiosApi.tecnologiasCharlas.getTecnologiasCharlas();
        console.log(
          "Charlas responseTecnologiasCharlas:",
          responseTecnologiasCharlas
        );
        setTecnologiasCharlasResponse(responseTecnologiasCharlas);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const getProvinciaNombre = (idProvincia) => {
    const provincia = provinciasResponse.find(
      (p) => p.idProvincia === idProvincia
    );
    return provincia ? provincia.nombreProvincia : "Desconocido";
  };
  const getTecnologiaNombre = (idTecnologia) => {
    const tecnologia = tecnologiasResponse.find(
      (t) => t.idTecnologia === idTecnologia
    );
    return tecnologia ? tecnologia.nombreTecnologia : "Desconocido";
  };
  const getTecnologiaCharlas = (idCharla) => {
    const tecnologias = tecnologiasCharlasResponse
      .filter((tecnologia) => tecnologia.idCharla === idCharla)
      .map((tecnologia) => getTecnologiaNombre(tecnologia.idTecnologia));

    return tecnologias.length > 0 ? "Tipo: " + tecnologias.join(", ") : "";
  };
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100 p-2">
       <section class="text-gray-600 body-font mt-6">
        <div class="flex flex-wrap w-full mb-12 flex-col items-center text-center">
          <h2 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Registrate ahora
          </h2>
          <p class="lg:w-1/2 w-full leading-relaxed text-accent-100">
            Sigue los siguientes pasos
          </p>
        </div>
        <div class="container bg-white px-10  py-12 mx-auto flex flex-col justify-start shadow-sm shadow-[#00000050] rounded-xl">
          <div class="flex relative pt-10 pb-10 sm:items-center md:w-2/3 w-1/2 mx-auto">
            <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-accent-100 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-accent-200 text-white relative z-10 title-font font-medium text-sm">
              1
            </div>
            <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                  Selecciona Usuario
                </h2>
                <p class="leading-relaxed">
                  ¿Qué tipo de usario eres? Tech Riders, Centro Educativo...
                </p>
              </div>
            </div>
          </div>
          <div class="flex relative pb-10 sm:items-center md:w-2/3 w-1/2 mx-auto">
            <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-accent-100 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-accent-200 text-white relative z-10 title-font font-medium text-sm">
              2
            </div>
            <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                  Rellena el formulario
                </h2>
                <p class="leading-relaxed">
                  Facilítamos los datos para registrarte.
                </p>
              </div>
            </div>
          </div>
          <div class="flex relative pb-10 sm:items-center md:w-2/3 w-1/2 mx-auto">
            <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-accent-100 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-accent-200 text-white relative z-10 title-font font-medium text-sm">
              3
            </div>
            <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                  Espera nuestra respuesta
                </h2>
                <p class="leading-relaxed">
                  Debido a la información sensible deberás esperar a que uno de
                  nuestros administradores acepte tu solicitud. Te enviaremos un
                  mensaje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font mt-12">
        <div class="container px-5 gap-24 mx-auto">
          <div class="flex flex-wrap w-full mb-12 flex-col items-center text-center">
            <h2 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Selecciona tu usuario
            </h2>
          </div>
          <div class="flex flex-wrap justify-center -m-4">
            <ul class="flex flex-wrap w-full justify-center gap-6 mb-4">
              <li className="">
                <input
                  type="radio"
                  onClick={() => handleFormularioClick("TechRiders")}
                  id="hosting-small"
                  name="hosting"
                  value="hosting-small"
                  class="hidden peer"
                  required
                />
                <label
                  for="hosting-small"
                  class="inline-flex items-center justify-between w-full p-5 text-accent-100 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:bg-accent-200 peer-checked:border-primary-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-accent-200 dark:hover:bg-gray-700"
                >
                  <div class="block">
                    <div class="w-full text-lg font-semibold">Tech Riders</div>
                    <div class="w-full">Deseas dar charlas en centros</div>
                  </div>
                  <svg
                    class="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li className="">
                <input
                  type="radio"
                  onClick={() => handleFormularioClick("Empresas")}
                  id="hosting-big"
                  name="hosting"
                  value="hosting-big"
                  class="hidden peer"
                />
                <label
                  for="hosting-big"
                  class="inline-flex items-center justify-between w-full p-5 text-accent-100 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:bg-accent-200 peer-checked:border-primary-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-accent-200 dark:hover:bg-gray-700"
                >
                  <div class="block">
                    <div class="w-full text-lg font-semibold">Empresas</div>
                    <div class="w-full">Deseas inscribir a tu empresa para dar charlas</div>
                  </div>
                  <svg
                    class="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li className="">
                <input
                  type="radio"
                  onClick={() => handleFormularioClick("CentroEducativo")}
                  id="hosting-medium"
                  name="hosting"
                  value="hosting-medium"
                  class="hidden peer"
                  required
                />
                <label
                  for="hosting-medium"
                  class="inline-flex items-center justify-between w-full p-5 text-accent-100 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:bg-accent-200 peer-checked:border-primary-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-accent-200 dark:hover:bg-gray-700"
                >
                  <div class="block">
                    <div class="w-full text-lg font-semibold">
                      Centro educativo
                    </div>
                    <div class="w-full">Eres un profesor que desea solicitar charlas</div>
                  </div>
                  <svg
                    class="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {formulario && (
        <section className="text-gray-600 p-4 body-font mt-12">
          <div className="container  bg-accent-100 shadow-sm shadow-[#00000050] px-10 sm:px-5 py-12 mx-auto flex justify-center rounded-xl">
            {formulario === "TechRiders" && <FormTechRiders />}
            {formulario === "Empresas" && <FormRepresentante />}
            {formulario === "CentroEducativo" && <FormCentros />}
            {/* ... otros formularios ... */}
          </div>
        </section>
      )}
    </main>
  );
};

export default RegistroUsuario;
