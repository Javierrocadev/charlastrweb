import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import SolicitudCharla from "../user/formularios/SolicitudCharla";

const VistaCharlasCentrto = () => {
  const [charla, setCharla] = useState([]);
  const [misCharlas, setMisCharlas] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedSolicitar, setSelectedSolicitar] = useState(null);
  const [estadoCharla, setEstadoCharla] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("posiblescharlas");

  /*const handleClickDetailCharla = (detail) => {
    setSelected((previous) => {
      return previous === detail ? null : detail;
    });
    setOpen((prev) => (prev && prev !== detail ? false : !prev));

    if (selectedSolicitar) {
      setSelectedSolicitar(null);
    }
  };*/

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

    setOpen((prev) => (prev && prev !== charla ? false : !prev));

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

  const DetailForm = ({ isOpen, idTr, misCharlas }) => {
    const [tr, setTr] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const charlas = misCharlas.filter((ch) => ch.idTechRider === idTr);

          const response = await axiosApi.usuarios.getUsuarios();

          const tr = response.filter((tr) => {
            if (tr.idUsuario === charlas.idTechRider) {
              return tr;
            } else {
              return false;
            }
          });

          setTr(tr);
          console.log("Charlas con TR: "+charlas);

        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [misCharlas,idTr]);

    return (
      <div className={`${isOpen ? "" : "hidden"}  pt-5 mt-10 border-t-2`}>
        <h6 className="text-lg font-medium text-gray-900">
          Detalles de la charla
        </h6>
        <div className=" w-full items-center">
          {loading ? (
            <p>Loading...</p>
          ) : tr.length === 0 ? (
            <p>No hay TechRiders asignado.</p>
          ) : (
            tr.map((tr, index) => (
              <div
                key={index}
                className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  <span className="text-indigo-500">Nombre: </span>
                  {" " + tr.nombre + "  " + tr.apellidos}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Email: </span>
                      {" " + tr.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Linkedin: </span>
                      {tr.linkedIn}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Teléfono: </span>
                      {tr.telefono}
                    </p>
                  </div>
                </div>
              </div>
            ))
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
        {charla.length === 0 ? (
          <h5 className="text-center text-3xl font-semibold py-4 flex">
            Posibles charlas
            <span>
              <Loading />
            </span>
          </h5>
        ) : (
          <div>
            {charla.map((charla) => (
              <div
                key={charla.idCharla}
                className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      <span className="text-indigo-500">Descripción: </span>
                      {charla.descripcion}
                    </p>
                  </div>
                  <div
                    className=" flex items-center hover:scale-95 transition-transform cursor-pointer"
                    onClick={() => solicitarrCharlaHandleClick(charla)}
                  >
                    <span className="font-semibold mr-2 ">
                      Solicitar charla
                    </span>
                    <RenderIcon isSelected={selected === charla} />
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg> */}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Fecha: </span>
                      {charla.fechaCharla}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Turno: </span>
                      {charla.turno}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Modalidad: </span>
                      {charla.modalidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Estado: </span>
                      {getEstadoNombre(charla.idEstadoCharla)}
                    </p>
                  </div>
                </div>
                <div>
                  <SolicitudCharla
                    isOpen={selectedSolicitar === charla}
                    idCurso={charla.idCurso}
                    idCentro={charla.idCentro}
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

    /*useEffect(() => {
      const fetchData = async () => {
        try {
          const profesor = await axiosApi.usuarios.getPerfilUsuario();
          const resp = await axiosApi.charlas.getCharlasByProfesor(
            profesor.idUsuario
          );
          //console.log(resp)
          setMisCharlas(resp);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);*/
    return (
      <section>
        {misCharlas.length === 0 ? (
          <h5 className="text-center text-3xl font-semibold py-4 flex">
            Mis Charlas
            <span>
              <Loading />
            </span>
          </h5>
        ) : (
          <div>
            {misCharlas.map((charla) => (
              <div
                key={charla.idCharla}
                className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      <span className="text-indigo-500">Descripción: </span>
                      {charla.descripcionCharla}
                    </p>
                  </div>
                  <div
                    className=" mr-5  flex items-center hover:scale-95 transition-transform cursor-pointer"
                    onClick={() => handleClickDetailCharlaProfesor(charla)}
                  >
                    <span className="font-semibold mr-2 ">detalles</span>
                    <RenderIcon isSelected={select === charla} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Fecha: </span>
                      {charla.fechaCharla}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Observaciones: </span>
                      {charla.observacionesCharla}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Modalidad: </span>
                      {charla.modalidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Estado: </span>
                      {getEstadoNombre(charla.idEstadoCharla)}
                    </p>
                  </div>
                </div>
                <div>
                  <DetailForm
                    isOpen={select === charla}
                    idTr={charla.idTechRider}
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
        const responseFiltered = responseCharlas.filter(
          (ch) => ch.idEstadoCharla === 2
        );
        // filtrar charlas si tiene TR
        const filteredWithTR = responseFiltered.filter(
          (chwtr) => chwtr.idTechRider != null
        );

        if (!filteredWithTR.length) {
          return <Loading />;
        } else {
          setCharla(filteredWithTR);
        }

        const responseEstado = axiosApi.charlas.getEstadoCharlas();
        setEstadoCharla(await responseEstado);

        const profesor = await axiosApi.usuarios.getPerfilUsuario();
        const resp = await axiosApi.charlas.getCharlasByProfesor(
          profesor.idUsuario
        );
        setMisCharlas(resp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              className={`${
                selectedComponent === "posiblescharlas"
                  ? "bg-black  text-white"
                  : "active  text-accent-200"
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
                  ? "bg-black  text-white"
                  : "active text-accent-200"
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
        {selectedComponent === "mischarlas" && <MisCharlas/>}
      </div>
    </section>
  );
};
export default VistaCharlasCentrto;
