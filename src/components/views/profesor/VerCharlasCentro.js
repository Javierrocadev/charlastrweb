import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import SolicitudCharla from "../user/formularios/SolicitudCharla";

const VistaCharlasCentrto = () => {
  const [charla, setCharla] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedSolicitar, setSelectedSolicitar] = useState(null);
  const [estadoCharla, setEstadoCharla] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickDetailCharla = (detail) => {
    setSelected((previous) => {
      return previous === detail ? null : detail;
    });
    setOpen((prev) => (prev && prev !== detail ? false : !prev));

    if (selectedSolicitar) {
      setSelectedSolicitar(null);
    }
  };

  const solicitarrCharlaHandleClick = (charla) => {
    setSelectedSolicitar((previous) => {
      return previous === charla ? null : charla;
    });
    setOpen((prev) => (prev && prev !== charla ? false : !prev));

    if (selected) {
      setSelected(null);
    }
  };

  const renderIcon = () => {
    return (
      <svg
        className="w-4 h-2 text-gray-800 dark:text-white"
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
            open
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

  const DetailForm = ({ isOpen, idTr }) => {
    const [tr, setTr] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const charlas = charla.filter((ch) => ch.idTechRider === idTr);

          const response = await axiosApi.usuarios.getUsuarios();

          const tr = response.filter((tr) => {
            if (tr.idUsuario === charlas.idTechRider) {
              return tr;
            } else {
              return false;
            }
          });

          setTr(tr);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [idTr]);

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

        setCharla(filteredWithTR);

        const responseEstado = axiosApi.charlas.getEstadoCharlas();
        setEstadoCharla(await responseEstado);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      <h1 className="text-center text-3xl font-semibold py-4">Posibles charlas</h1>
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
                className=" mr-5  flex items-center hover:scale-95 transition-transform cursor-pointer"
                onClick={() => handleClickDetailCharla(charla)}
              >
                <span className="font-semibold mr-2 ">detalles</span>
                {renderIcon()}
              </div>
              <div
                className=" flex items-center hover:scale-95 transition-transform cursor-pointer"
                onClick={() => solicitarrCharlaHandleClick(charla)}
              >
                <span className="font-semibold mr-2 ">Solicitar charla</span>
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
              <DetailForm
                isOpen={selected === charla}
                idTr={charla.idTechRider}
              />
            </div>
            <SolicitudCharla
              isOpen={selectedSolicitar === charla}
              idCurso={charla.idCurso}
              idCentro={charla.idCentro}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default VistaCharlasCentrto;
