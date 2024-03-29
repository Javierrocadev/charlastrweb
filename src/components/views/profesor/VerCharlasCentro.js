import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import SolicitudCharla from "../user/formularios/SolicitudCharla";

const VistaCharlasCentrto = () => {
  const [charlas, setCharlas] = useState([]);
  const [misCharlas, setMisCharlas] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [responseTr, setResponseTr] = useState([]);
  const [responseCursos, setResponseCursos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedSolicitar, setSelectedSolicitar] = useState(null);
  const [estadoCharla, setEstadoCharla] = useState([]);
  //const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("posiblescharlas");
  //const [loading, setLoading] = useState(false);

  const handleComponentChange = (selected) => {
    setSelectedComponent(selected);
  };

  const solicitarrCharlaHandleClick = (charla) => {
    setSelectedSolicitar((previous) => {
      return previous === charla ? null : charla;
    });
    setSelected((previous) => {
      return previous === charla ? null : charla;
    });

    //setOpen((prev) => (prev && prev !== charla ? false : !prev));

    if (selected && setSelectedSolicitar) {
      setSelected(null);
      setSelectedSolicitar(null);
    }
  };

  const RenderIcon = ({ isSelected }) => {
    return (
      <svg
        className={`w-4 h-4 text-green-600 ${
          isSelected ? "text-red-400" : "dark:text-white"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 8"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={
            isSelected
              ? "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              : "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          }
        />
      </svg>
    );
  };

  const getEstadoNombre = (idEstadoCharla) => {
    const estado = estadoCharla.find(
      (es) => es.idEstadosCharla === idEstadoCharla
    );
    return estado ? estado.tipo : "Desconocido";
  };

  const DetailForm = ({ isOpen, ch, misCharlas }) => {
    const [tr, setTr] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProvinciaNombre = (idProvincia) => {
      const provincia = provincias.find((p) => p.idProvincia === idProvincia);
      return provincia ? provincia.nombreProvincia : "Desconocido";
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const tr = responseTr.filter((tr) => tr.idUsuario === ch.idTechRider);
          const cursos = responseCursos.filter(
            (curso) => curso.idCurso === ch.idCurso
          );

          console.log("Tr que ha impartido la charla: ", tr);
          console.log("Curso al que va dirigido la charla: ", cursos);

          setTr(tr);
          setCursos(cursos);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [misCharlas, isOpen, ch]);

    return (
      <div className={`${isOpen ? "" : "hidden"} pt-5 mt-10 border-t-2`}>
        <h6 className="text-lg font-medium text-gray-900">
          Detalles de la charla
        </h6>
        <div className="w-full flex flex-col md:flex-row items-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {tr.length === 0 ? (
                <p>No hay TechRiders asignado.</p>
              ) : (
                tr.map((techRider, index) => (
                  <div key={index} className="w-full h-full md:flex-1">
                    <div
                      className="relative md:max-w-full h-[160px] mx-auto px-4 py-5 mb-4 bg-white border 
                      border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <p className="flex items-center gap-3 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <span className="text-accent-200">
                          <svg
                            className="w-10 h-10 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1"
                              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </span>
                        {" " + techRider.nombre + "  " + techRider.apellidos}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 gap-2">
                        <div>
                          <p className="text-sm text-accent-100 dark:text-gray-400">
                            <span className="font-semibold">Email: </span>
                            {" " + techRider.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-accent-100 dark:text-gray-400">
                            <span className="font-semibold">Linkedin: </span>
                            {techRider.linkedIn}
                          </p>
                        </div>
                      </div>
                      <div children="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div>
                          <p className="text-sm text-accent-100 dark:text-gray-400">
                            <span className="font-semibold">Teléfono: </span>
                            {techRider.telefono}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Localidad: </span>
                            {getProvinciaNombre(techRider.idProvincia)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {cursos.length === 0 ? (
                <p>No hay cursos asignados.</p>
              ) : (
                cursos.map((curso, index) => (
                  <div
                    key={index}
                    className="w-full h-full p-4 md:block md:flex-1"
                  >
                    <div
                      className="relative md:max-w-full h-[160px] mx-auto px-4 py-5 mb-4
                    bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        <span className="text-accent-100">Curso: </span>
                        {" " + curso.nombreCurso + " "}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        <div>
                          <p className="text-sm text-accent-100 dark:text-gray-400">
                            <span className="font-semibold">Descripción: </span>
                            {" " + curso.descripcionCurso}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const Loading = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    return (
      <div>
        <span className="ml-2">{dots}</span>
      </div>
    );
  };

  const PosiblesCharlas = () => {
    return (
      <section>
        <h1 className="text-3xl font-bold text-center py-6">
          {" "}
          Posibles Charlas
        </h1>
        {charlas.length === 0 ? (
          <h5 className="text-center text-2xl font-semibold py-4 flex">
            Posibles charlas
            <span>
              <Loading />
            </span>
          </h5>
        ) : (
          <div>
            {charlas.map((charla) => (
              <div
                key={charla.idCharla}
                className="relative w-full min-w-[400px] sm:w-2/2 md:w-3/3 lg:w-4/4 xl:w-6/6 mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-500">
                        {charla.descripcion}
                      </span>
                      <span>
                        <svg
                          class="w-8 h-8 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="0.4"
                            d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z"
                          />
                        </svg>
                      </span>
                    </p>
                  </div>
                  <div
                    className=" flex items-center hover:scale-95 transition-transform cursor-pointer"
                    onClick={() => solicitarrCharlaHandleClick(charla)}
                  >
                    <span className="font-semibold mr-2 ">
                      Solicitar charla
                    </span>
                    <RenderIcon isSelected={selectedSolicitar === charla} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Fecha: </span>
                      {charla.fechaCharla}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Turno: </span>
                      {charla.turno}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Modalidad: </span>
                      {charla.modalidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Estado: </span>
                      {getEstadoNombre(charla.idEstadoCharla)}
                    </p>
                  </div>
                </div>
                <div className="w-auto">
                  <SolicitudCharla
                    isOpen={selectedSolicitar === charla}
                    idCurso={charla}
                    idCentro={charla}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  const MisCharlas = () => {
    const [select, setSelect] = useState(null);

    const handleClickDetailCharlaProfesor = (d) => {
      setSelect((previous) => {
        return previous === d ? null : d;
      });
    };

    return (
      <section>
        <h1 className="text-3xl font-bold text-center py-6"> Mis Charlas</h1>
        {misCharlas.length === 0 ? (
          <h5 className="text-center text-3xl font-semibold py-4 flex">
            Mis Charlas
            <span className="text-blue-700">
              <Loading />
            </span>
          </h5>
        ) : (
          <div>
            {misCharlas.map((charla) => (
              <div
                key={charla.idCharla}
                className="relative w-full min-w-[400px] sm:w-2/2 md:w-3/3 lg:w-4/4 xl:w-6/6 mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="gap-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      <span className="text-blue-500 flex items-center">
                        {charla.descripcionCharla}

                        {/* <span>
                          <svg
                            class="w-8 h-8 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="0.4"
                              d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z"
                            />
                          </svg>
                        </span> */}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`${
                      charla.descripcionCharla.length > 100
                        ? "absolute bottom-5 right-5"
                        : "absolute top-5 right-5"
                    } flex items-center hover:scale-95 transition-transform cursor-pointer`}
                    onClick={() => handleClickDetailCharlaProfesor(charla)}
                  >
                    <span className="font-semibold mr-2 ">detalles</span>
                    <RenderIcon isSelected={select === charla} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Fecha: </span>
                      {charla.fechaCharla}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Observaciones: </span>
                      {charla.observacionesCharla}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Modalidad: </span>
                      {charla.modalidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-accent-100 dark:text-gray-400">
                      <span className="font-semibold">Estado: </span>
                      {getEstadoNombre(charla.idEstadoCharla)}
                    </p>
                  </div>
                </div>
                <div>
                  <DetailForm
                    isOpen={select === charla}
                    ch={charla}
                    misCharlas={misCharlas}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharlas =
          await axiosApi.centros.getPosiblesCharlasCentro();

        // filtrar por estado pendiente
        const responseFiltered = await responseCharlas.filter(
          (ch) => ch.idEstadoCharla === 2
        );
        // filtrar charlas si tiene TR
        const filteredWithTR = await responseFiltered.filter(
          (chwtr) => chwtr.idTechRider != null
        );

        if (!filteredWithTR.length) {
          return <Loading />;
        } else {
          setCharlas(filteredWithTR);
        }

        const responseEstado = await axiosApi.charlas.getEstadoCharlas();
        setEstadoCharla(await responseEstado);

        const profesor = await axiosApi.usuarios.getPerfilUsuario();
        const resp = await axiosApi.charlas.getCharlasByProfesor(
          profesor.idUsuario
        );
        setMisCharlas(resp);

        const responseProvincias = await axiosApi.provincias.getProvincias();
        setProvincias(responseProvincias);

        const responseTr = await axiosApi.usuarios.getUsuarios();
        setResponseTr(responseTr);
        const responseCursos = await axiosApi.centros.getCursos();
        setResponseCursos(responseCursos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100 p-2">
    <section className="container mx-auto">
      <div className="text-sm font-medium text-center border-b border-blue-400">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              className={`${
                selectedComponent === "posiblescharlas"
                  ? "bg-accent-200  text-white"
                  : "active bg-accent-100 hover:bg-blue-600  text-white"
              } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
              onClick={() => handleComponentChange("posiblescharlas")}
            >
              posibles charlas
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${
                selectedComponent === "mischarlas"
                  ? "bg-accent-200 text-white"
                  : "active bg-accent-100 hover:bg-blue-600 text-white"
              } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
              onClick={() => handleComponentChange("mischarlas")}
            >
              mis charlas
            </button>
          </li>
        </ul>
      </div>
      <div className="pt-5">
        {selectedComponent === "posiblescharlas" && <PosiblesCharlas />}
        {selectedComponent === "mischarlas" && <MisCharlas />}
      </div>
    </section>
    </main>
  );
};
export default VistaCharlasCentrto;
