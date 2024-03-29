import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link, NavLink } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";

const Home = () => {
  const [charlasResponse, setCharlasResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [tecnologiasResponse, setTecnologiasResponse] = useState([]);
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState(
    []
  );

  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);

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

  const handleProvinciaFilter = (provinciaId) => {
    setSelectedProvincia(provinciaId);
  };
  
  
  const handleTurnoFilter = (turno) => {
    setSelectedTurno(turno);
  };

  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100">

      <section>
        <h2 class="text-3xl text-center text-gray-800 font-bold lg:text-4xl dark:text-white">
          Nuestras charlas
        </h2>
        <p class="mt-3 mb-8 text-center text-gray-800 dark:text-gray-400">
          Explora nuestras charlas y si quieres, solicita una, ¡TOTALMENTE
          gratis!
        </p>
<div className="mb-8 border border-gray-200 bg-bg-100 p-2 flex flex-col gap-2 rounded">
  
<div >
  <p>Provincia:</p>
      <select onChange={(e) => handleProvinciaFilter(e.target.value)} className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
        <option value={null}>Todos</option>
        {provinciasResponse.map((provincia) => (
          <option key={provincia.idProvincia} value={provincia.idProvincia} >
            {provincia.nombreProvincia}
          </option>
        ))}
      </select>
    </div>
<p>Modalidad:</p>
    <div className="flex gap-2">
      <label
        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 ${
          selectedTurno === null ? "bg-accent-200 text-white" : "bg-bg-100"
        } text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200`}
      >
        <input
          type="radio"
          name="turno"
          value="null"
          checked={selectedTurno === null}
          onChange={() => handleTurnoFilter(null)}
        />
        Ambos
      </label>
      <label
        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 ${
          selectedTurno === "MAÑANA" ? "bg-accent-200 text-white" : "bg-bg-100"
        } text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200`}
      >
        <input
          type="radio"
          name="turno"
          value="MAÑANA"
          checked={selectedTurno === "MAÑANA"}
          onChange={() => handleTurnoFilter("MAÑANA")}
        />
        Mañana
      </label>
      <label
        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 ${
          selectedTurno === "TARDE" ? "bg-accent-200 text-white" : "bg-bg-100"
        } text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200`}
      >
        <input
          type="radio"
          name="turno"
          value="TARDE"
          checked={selectedTurno === "TARDE"}
          onChange={() => handleTurnoFilter("TARDE")}
        />
        Tarde
      </label>
    </div>
</div>
        
        <ul class="hs-accordion-group">
        {charlasResponse
      .filter((charla) => {
        // Aplicar filtro por provincia
        if (
          selectedProvincia !== null &&
          selectedProvincia !== "Todos" &&
          charla.idProvincia !== parseInt(selectedProvincia)
        ) {
          return false;
        }

        // Aplicar filtro por turno
        if (selectedTurno !== null && selectedTurno !== "Todos" && charla.turno !== selectedTurno) {
          return false;
        }

        return true;
      })
      .map((charla) => (
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
                <NavLink
                to="/formulariosolicitudcharla"
                  class="py-2 px-3 m-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                >
                  Solicitar charla
                </NavLink>
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

export default Home;
