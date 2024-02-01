import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";

const VerCharlasAdmin = () => {
  const [charlasResponse, setCharlasResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [tecnologiasResponse, setTecnologiasResponse] = useState([]);
  const [valoracionesResponse, setValoracionesResponse] = useState([]);
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState([]);
  
  const handleEliminarCharla = async (idCharla) => {
    try {
    await axiosApi.charlas.eliminarCharla(idCharla);
      console.log('Charla eliminada con éxito');
      // Puedes realizar alguna acción adicional después de eliminar la charla
    } catch (error) {
      console.error('Error al intentar eliminar la charla:', error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.charlas.getCharlas();
        console.log("Charlas response:", response);
        setCharlasResponse(response);
        
        const valoracionesResponse = await axiosApi.ValoracionesCharlas.getValoracionesCharlas();
        console.log("Valoraciones charla:", valoracionesResponse);
        setValoracionesResponse(valoracionesResponse);

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
    <main className="bg-white rounded-xl shadow dark:bg-primary-100">
      {/* no borrar */}
      <div class="hs-accordion-group hidden ">
        <div class="hs-accordion active" id="hs-basic-heading-one">
          <button
            class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
            aria-controls="hs-basic-collapse-one"
          >
            <svg
              class="hs-accordion-active:hidden block w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <svg
              class="hs-accordion-active:block hidden w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
            Accordion #1
          </button>
          <div
            id="hs-basic-collapse-one"
            class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-heading-one"
          >
            <p class="text-gray-800 dark:text-gray-200">
              <em>This is the third item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>

        <div class="hs-accordion" id="hs-basic-heading-two">
          <button
            class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
            aria-controls="hs-basic-collapse-two"
          >
            <svg
              class="hs-accordion-active:hidden block w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <svg
              class="hs-accordion-active:block hidden w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
            Accordion #2
          </button>
          <div
            id="hs-basic-collapse-two"
            class="hs-accordion-content  w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-heading-two"
          >
            <p class="text-gray-800 dark:text-gray-200">
              <em>This is the third item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>

        <div class="hs-accordion" id="hs-basic-heading-three">
          <button
            class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
            aria-controls="hs-basic-collapse-three"
          >
            <svg
              class="hs-accordion-active:hidden block w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <svg
              class="hs-accordion-active:block hidden w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
            Accordion #3
          </button>
          <div
            id="hs-basic-collapse-three"
            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-heading-three"
          >
            <p class="text-gray-800 dark:text-gray-200">
              <em>This is the third item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>
      </div>

   
      <section>
        <h2 class="text-3xl text-center text-gray-800 font-bold lg:text-4xl dark:text-white">
          Nuestras charlas
        </h2>
        <p class="mt-3 mb-8 text-center text-gray-800 dark:text-gray-400">
         TODAS NUESTRAS CHARLAS
        </p>
        <ul class="hs-accordion-group">
          {charlasResponse.map((charla) => (
            <li
              key={charla.idCharla}
              className="hs-accordion active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-accent-200 dark:border-gray-700"
              id="hs-bordered-heading-one"
            >
              <div className="flex flex-row">
                <button
                  className="hs-accordion-toggle hs-accordion-active:text-accent-200 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-accent-200 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
                  aria-controls="hs-basic-bordered-collapse-one"
                >
                  <svg
                    className="hs-accordion-active:hidden block w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                  {charla.descripcion}
                </button>
                <button
                onClick={() => handleEliminarCharla(charla.idCharla)}
                  type="button"
                  class="py-2 px-3 m-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                >
                 Eliminar Charla
                </button>
              </div>

              <div
                id="hs-basic-bordered-collapse-one"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-bordered-heading-one"
              >
                <div className="pb-4 px-5">
                  {/* <p className="text-gray-800 dark:text-gray-200">
               {charla.observaciones}
               </p> */}
                  <div class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <div class="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 sm:text-xl mb-4">
                          {getTecnologiaCharlas(charla.idCharla)}
                        </h3>

                        <p class="mt-1 text-xs font-medium text-gray-600">
                          Modalidad:
                          <span class="text-sm m-1 font-medium p-2 rounded-xl bg-bg-300 text-gray-600">
                            {charla.modalidad}
                          </span>{" "}
                          /
                          <span class="text-sm m-1 font-medium p-2 rounded-xl bg-bg-300 text-gray-600">
                            {charla.turno}
                          </span>
                          
                        </p>
                      </div>

                      <div class="hidden sm:block sm:shrink-0">
                        {(() => {
                          switch (charla.acreditacionLinkedIn) {
                            case null:
                              return <></>;
                            default:
                              return (
                                <a href={charla.acreditacionLinkedIn}>
                                  <img
                                    alt="imagen tech riders"
                                    class="h-16 w-16 bg-accent-200 rounded-lg object-cover shadow-sm"
                                  />
                                </a>
                              );
                          }
                        })()}
                      </div>
                    </div>

                    <div class="mt-4">
                      <p class="max-w-[40ch] text-sm text-accent-100">
                        {charla.observaciones}
                      </p>
                    </div>

                    <dl class="mt-6 flex gap-4 sm:gap-6">
                      <div class="flex flex-col-reverse">
                        {(() => {
                          switch (charla.idEstadoCharla) {
                            case 1:
                              return (
                                <dt class="text-sm my-1 font-medium p-2 rounded-xl bg-red-500 text-gray-600">
                                  Cancelada
                                </dt>
                              );
                            case 2:
                              return (
                                <dt class="text-sm my-1 font-medium p-2 rounded-xl bg-gray-200 text-gray-600">
                                  Pendiente
                                </dt>
                              );
                            case 3:
                              return (
                                <dt class="text-sm my-1 font-medium p-2 rounded-xl bg-green-200 text-gray-600">
                                  Proceso
                                </dt>
                              );
                            case 4:
                              return (
                                <dt class="text-sm my-1 font-medium p-2 rounded-xl bg-amber-200 text-gray-600">
                                  Ocupada
                                </dt>
                              );
                            case 5:
                              return (
                                <dt class="text-sm my-1 font-medium p-2 rounded-xl bg-accent-100 text-gray-600">
                                  Completada
                                </dt>
                              );
                            case 6:
                              return (
                                <dt class="text-sm my-1 font-medium p-2 rounded-xl bg-ambar-200 text-gray-600">
                                  Acreditada
                                </dt>
                              );
                            default:
                              return null;
                          }
                        })()}

                        <dt class="text-xs text-accent-100">
                          {formatFecha(charla.fechaCharla)}
                        </dt>
                      </div>

                      <div class="flex flex-col-reverse">
                        <dt class="text-sm my-1 font-medium p-2 rounded-xl text-gray-600">
                          {getProvinciaNombre(charla.idProvincia)}
                        </dt>
                        {/* <dd class="text-xs text-accent-100">{charla.turno}</dd> */}
                      </div>
                        <div>
                          <h2>Valoraciones de la charla</h2>
                          {valoracionesResponse.filter((valoracion)=> valoracion.idCharla === charla.idCharla).map((valoracion)=>{
                           return valoracion.comentario
                          }) }            
                      </div>               
                    </dl>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default VerCharlasAdmin;
