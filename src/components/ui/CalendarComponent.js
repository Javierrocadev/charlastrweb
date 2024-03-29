import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axiosApi from "../../api/axiosApi";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";

const CalendarComponent = ({ charlas }) => {
  const [date, setDate] = useState(new Date());
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [tecnologiasResponse, setTecnologiasResponse] = useState([]);
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState(
    []
  );

  const [isOpen, setIsOpen]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const charlasEnDia = charlas.filter((charla) =>
    isSameDay(new Date(charla.fechaCharla), date)
  );

  const tileContent = ({ date, view }) => {
    const hasCharla = charlas.some((charla) =>
      isSameDay(new Date(charla.fechaCharla), date)
    );

    if (hasCharla) {
      return <div className="bg-blue-300 h-[20px] w-[20px] rounded-full mx-auto mt-2"></div>;
    }

    return null;
  };
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

  const handleIsOpen=()=>{
    setIsOpen(!isOpen);
  }
  const Calendario = () => {
    return (
      <div className="">
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded h-[540px] m-auto md:m-0  md:min-w-full justify-center  bg-green-100 border-none text-accent-200 flex flex-col"
          calendarClassName="bg-green-100"
          tileContent={tileContent}
          tileClassName="size-[5em] bg-blue-600 hover:bg-blue-600 transition duration-300 ease-in-out"
        />
      </div>
    );
  };

  return (
    <div className="calendar-container flex-wrap items-start  gap-8 bg-accent-100 p-4 border border-bg-300 rounded">
      <div className="flex-1 w-[90%] mx-auto">
        <Calendario />
      </div>
      <div className="flex-1 mt-5 w-[90%] mx-auto">
        {charlasEnDia.length === 0 ? (
          <p className="text-accent-200   font-bold text-xl rounded border  h-80 border-gray-400 flex justify-center items-center bg-white">
            No hay charlas en este día.
          </p>
        ) : (
          <ul className="w-full list-none p-0">
            {charlasEnDia.map((charla) => (
              <li
                key={charla.idCharla}
                className=" h-[300px] hs-accordion active bg-white dark:text-gray-800 border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-accent-200 dark:border-gray-700"
                id="hs-bordered-heading-one"
              >
                <div className="flex flex-row">
                  <button
                    className="hs-accordion-toggle hs-accordion-active:text-accent-200 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-accent-200 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
                    aria-controls="hs-basic-bordered-collapse-one"
                  >
                    
                    <svg
                      className="hidden hs-accordion-active:hidden  w-4 h-4"
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
                      className="hidden hs-accordion-active:block w-4 h-4"
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
                  {/* <button
                    type="button"
                    class="py-2 px-3 sm:shrink-0 m-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                  >
                    Solicitar charla
                  </button> */}
                </div>

                <div
                  id="hs-basic-bordered-collapse-one"
                  className="hs-accordion-content -mt-2 w-full overflow-hidden transition-[height] duration-300"
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

                        {/* <div className="hidden sm:block sm:shrink-0">
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
                        </div> */}
                      </div>

                      <div className="mt-4">
                        {(() => {
                          switch (charla.observaciones) {
                            case null:
                              return <></>;
                            default:
                              return (
                                <p className="max-w-[40ch] text-sm text-accent-200 bg-primary-100 p-2 rounded">
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
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
