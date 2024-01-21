import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const VistaTechridersEmpresa = () => {
  const [techriders, setTechriders] = useState([]);
  const [selectedTr, setSelectedTr] = useState(null);

  const handleClickTr = (tr) => {
    setSelectedTr((prevTr) => {
      return prevTr === tr ? null : tr;
    });
  };

  const CharlasTr = ({ isOpen, idTr }) => {
    const [charlas, setCharlas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState("");

    useEffect(() => {
      const fechaData = async () => {
        try {
          setLoading(true);
          //idTr que tiene charlas es solo el 3
          const response = await axiosApi.empresas.getCharlasTrEmpresa(idTr);

          if (response) {
            setCharlas(response);
          } else {
            setCallback("No tiene charlas");
          }
        } catch (error) {
          console.log("Error al obtener las charlas del TR", error);
        } finally {
          setLoading(false);
        }
      };

      fechaData();
    }, [idTr]);

    return (
      <div className={`${isOpen ? "" : "hidden"}  pt-5 mt-10 border-t-2`}>
        <h6 className="text-lg font-medium text-gray-900">
          Charlas del TechRiders
        </h6>
        <span className={`${charlas.length > 0 ? "block" : "hidden"}`}>
          {callback}
        </span>
        <div className=" w-full items-center">
          {loading ? (
            // Render a loading indicator or message while data is being fetched
            <p>Loading...</p>
          ) : charlas.length === 0 ? (
            <p>No tiene charlas asignado.</p>
          ) : (
            charlas.map((ch, index) => (
              <div
                key={index}
                className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  <span className="text-indigo-500">Descripcion: </span>
                  {" " + ch.descripcionCharla}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Curso: </span>
                      {" " + ch.nombreCurso}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Modalidad: </span>
                      {ch.modalidad}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Fecha: </span>
                      {ch.fechaCharla}
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
        const responseTr = await axiosApi.empresas.getTRByEmpresa();
        setTechriders(responseTr);
        console.log(responseTr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      <div>
        {techriders.map((tr, index) => (
          <div
            key={index}
            className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <span className="text-indigo-500">Tech Rider: </span>
              {" " + tr.techRider}
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
                  <span className="font-semibold">Teléfono: </span>
                  {tr.telefonoTechRider}
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
                  <span className="font-semibold">Empresa: </span>
                  {tr.empresa}
                </p>
              </div>
            </div>

            <div className="absolute top-5 right-10 flex items-center">
              
              <button
                className="w-6 h-6 hover:scale-125 transition-transform cursor-pointer "
                onClick={() => handleClickTr(tr)}
              >
                <svg
                  className="text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
              </button>
            </div>
            <CharlasTr isOpen={selectedTr === tr} idTr={tr.idTechRider} />
          </div>
        ))}
      </div>
    </section>
  );
};
export default VistaTechridersEmpresa;
