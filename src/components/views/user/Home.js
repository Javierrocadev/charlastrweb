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
    <main className="bg-white rounded-xl shadow dark:bg-primary-100">
    {/* no borrar */}
    <div className="hs-accordion-group hidden ">
      <div className="hs-accordion active" id="hs-basic-heading-one">
        <button
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
          aria-controls="hs-basic-collapse-one"
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
          Accordion #1
        </button>
        <div
          id="hs-basic-collapse-one"
          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading-one"
        >
          <p className="text-gray-800 dark:text-gray-200">
            <em>This is the third item's accordion body.</em> It is hidden by
            default, until the collapse plugin adds the appropriate classes
            that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions.
          </p>
        </div>
      </div>

      <div className="hs-accordion" id="hs-basic-heading-two">
        <button
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
          aria-controls="hs-basic-collapse-two"
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
          Accordion #2
        </button>
        <div
          id="hs-basic-collapse-two"
          className="hs-accordion-content  w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading-two"
        >
          <p className="text-gray-800 dark:text-gray-200">
            <em>This is the third item's accordion body.</em> It is hidden by
            default, until the collapse plugin adds the appropriate classes
            that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions.
          </p>
        </div>
      </div>

      <div className="hs-accordion" id="hs-basic-heading-three">
        <button
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
          aria-controls="hs-basic-collapse-three"
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
          Accordion #3
        </button>
        <div
          id="hs-basic-collapse-three"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-heading-three"
        >
          <p className="text-gray-800 dark:text-gray-200">
            <em>This is the third item's accordion body.</em> It is hidden by
            default, until the collapse plugin adds the appropriate classes
            that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions.
          </p>
        </div>
      </div>
    </div>

    <section className=" body-font ">
      <div className="container  rounded mx-auto flex px-5 sm:py-14 py-8 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font text-7xl  mb-4 font-bold text-gray-900  ">
            Tech Riders
          </h1>

          <p className="mb-4 leading-relaxed text-xl ">
            Conectando Futuros: Charlas Tecnológicas para la Excelencia en la
            Formación Profesional.
          </p>
          <div className="flex gap-2 justify-center items-center">
            {/* <a href="/origen" className="ml-4 shrink-0 inline-flex text-gray-700 border-2 border-primary-500 bg-neutral-50  py-2 px-6 focus:outline-none hover:bg-neutral-100 rounded text-lg">
                Sobre nosotros
              </a> */}
            <Link
              to={"/login"}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primaryDark-100 dark:border-bg-200 dark:text-textDark-100 dark:hover:bg-primaryDark-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Iniciar sesion
            </Link>
            <Link
              to={"/quienessomos"}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              ¿Quiénes somos?
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 relative ">
        
          <img
            className="object-cover object-center  bg-slate-100 rounded"
            alt="hero"
            src={heroImg}
          />
          <img
            className="object-cover object-center rounded absolute -bottom-12 -right-1 [filter:_invert(50%);] "
            alt="hero"
            src={logoTajamar}
          />
        </div>
      </div>
    </section>

    <section className="mx-4 py-4">
      <h2 className="text-3xl text-center text-gray-800 font-bold lg:text-4xl ">
        Nuestras charlas
      </h2>
      <p className="mt-3 mb-8 text-center text-gray-800 dark:text-gray-400">
        Explora nuestras charlas y si quieres, solicita una, ¡TOTALMENTE
        gratis!
      </p>
      <ul className="hs-accordion-group">
        {charlasResponse.map((charla) => (
          <li
            key={charla.idCharla}
            className="hs-accordion active dark:text-gray-800 border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-accent-200 dark:border-gray-700"
            id="hs-bordered-heading-one"
          >
            <div className="flex flex-row">
              <button
                className="hs-accordion-toggle hs-accordion-active:text-accent-200 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-accent-200 dark:text-gray-100 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-accent-100"
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
                type="button"
                className="py-2 px-3 sm:shrink-0 m-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              >
                Solicitar charla
              </button>
            </div>

            <div
              id="hs-basic-bordered-collapse-one"
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-bordered-heading-one"
            >
              <div className="pb-4 px-5 ">
                {/* <p className="text-gray-800 dark:text-gray-200">
             {charla.observaciones}
             </p> */}
                <div className="relative block overflow-hidden rounded-lg border  border-gray-100 p-4 sm:p-6 lg:p-8">
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl mb-4">
                        {getTecnologiaCharlas(charla.idCharla)}
                      </h3>

                      <p className="mt-1 text-xs font-medium ">
                        Modalidad:
                        <span className="text-sm m-1 font-medium p-2 rounded-xl bg-primary-100 ">
                          {charla.modalidad}
                        </span>{" "}
                        /
                        <span className="text-sm m-1 font-medium p-2 rounded-xl bg-primary-100 ">
                          {charla.turno}
                        </span>
                      </p>
                    </div>

                    <div className="hidden sm:block sm:shrink-0">
                      {(() => {
                        switch (charla.acreditacionLinkedIn) {
                          case null:
                            return <></>;
                          default:
                            return (
                              <a href={charla.acreditacionLinkedIn}>
                                <img
                                  alt="imagen tech riders"
                                  className="h-16 w-16 bg-accent-200 rounded-lg object-cover shadow-sm"
                                />
                              </a>
                            );
                        }
                      })()}
                    </div>
                  </div>

                  <div className="mt-4">


                                     {(() => {
                        switch (charla.observaciones) {
                          case null:
                            return <></>;
                          default:
                            return (
                              <p className="max-w-[40ch] text-sm text-accent-100 bg-primary-100 p-2 rounded">
                              {charla.observaciones}
                            </p>
                            );
                        }
                      })()}
                  </div>

                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      {(() => {
                        switch (charla.idEstadoCharla) {
                          case 1:
                            return (
                              <dt className="text-sm my-1 font-medium p-2 rounded-xl bg-red-500 ">
                                Cancelada
                              </dt>
                            );
                          case 2:
                            return (
                              <dt className="text-sm my-1 font-medium p-2 rounded-xl bg-gray-200 ">
                                Pendiente
                              </dt>
                            );
                          case 3:
                            return (
                              <dt className="text-sm my-1 font-medium p-2 rounded-xl bg-green-200 ">
                                Proceso
                              </dt>
                            );
                          case 4:
                            return (
                              <dt className="text-sm my-1 font-medium p-2 rounded-xl bg-amber-200 ">
                                Ocupada
                              </dt>
                            );
                          case 5:
                            return (
                              <dt className="text-sm my-1 font-medium p-2 rounded-xl bg-accent-100 ">
                                Completada
                              </dt>
                            );
                          case 6:
                            return (
                              <dt className="text-sm my-1 font-medium p-2 rounded-xl bg-ambar-200 ">
                                Acreditada
                              </dt>
                            );
                          default:
                            return null;
                        }
                      })()}

                      
                    </div>

                    <div className="flex flex-col-reverse">
                      <dt className="text-sm my-1 font-medium p-2 rounded-xl ">
                        {getProvinciaNombre(charla.idProvincia)}
                      </dt>
                      
                      {/* <dd className="text-xs text-accent-100">{charla.turno}</dd> */}
                    </div>
                   
                  </dl>
                  <dt className="text-xs text-accent-100 dark:text-black mt-1">
                       Creada: {formatFecha(charla.fechaCharla)}
                      </dt>
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
