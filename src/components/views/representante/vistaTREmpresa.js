import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const VistaTechridersEmpresa = () => {
  const [techriders, setTechriders] = useState([]);
  const [selectedTr, setSelectedTr] = useState(null);

  const handleClickTr = (tr) => {
    setSelectedTr((prevTr) => {
      return prevTr === tr ? null : tr;
    });
    //setSelectedTr((prevTr) => (prevTr === tr ? null : tr));
  };

  const CharlasTr = ({ isOpen, selectedTr, idTr }) => {
    const [charlas, setCharlas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState("");

    useEffect(() => {
      const fechaData = async () => {
        try {
          setLoading(true);
          //idTr que tiene charlas es solo el 3
          //console.log(idTr);
          console.log(selectedTr);

          const response = await axiosApi.empresas.getCharlasTrEmpresa(
            selectedTr.idTechRider
          );
          //console.log(response)
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
    }, [isOpen, selectedTr, idTr]);

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
                  <span className="text-accent-200">Descripcion: </span>
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

  const RenderIcon = ({ isTrSelected }) => {
    return (
      <svg
        className={`w-4 h-4 text-green-600 ${
          isTrSelected ? "text-red-400" : "dark:text-white"
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
            isTrSelected
              ? "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              : "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          }
        />
      </svg>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userloged = await axiosApi.usuarios.getPerfilUsuario();
        const responseTr = await axiosApi.empresas.getTRByEmpresa();

        const trFilter = responseTr.filter(
          (tr) => tr.email !== userloged.email
        ); //tr.idTechRider //email > porque es el único campo comun

        setTechriders(trFilter);
        // console.log("TR EMPRESA: ",responseTr);
        // console.log("TR EMPRESA FILTRADOS: ",trFilter);
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
              <span className="text-accent-200">Tech Rider: </span>
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
                <RenderIcon isTrSelected={selectedTr === tr} />
              </button>
            </div>
            <CharlasTr
              isOpen={selectedTr === tr}
              selectedTr={selectedTr}
              idTr={tr}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default VistaTechridersEmpresa;
