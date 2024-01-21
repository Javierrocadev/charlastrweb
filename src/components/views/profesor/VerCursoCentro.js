import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import SolicitudCharla from "../user/formularios/SolicitudCharla";

const VistaCursosCentrto = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (curso) => {
    setSelectedOption((prevSelected) => {
      return prevSelected === curso ? null : curso;
    });
    setOpen((prev) => !prev);
  };

  const renderIcon = () => {
    return (
      <svg
        className="w-4 h-4 text-gray-800 dark:text-white"
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCursos = await axiosApi.centros.getCursosByCentro();
        console.log(responseCursos);
        setCursos(responseCursos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      <div>
        {cursos.map((curso, index) => (
          <div
            key={index}
            className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <span className="text-indigo-500">Curso: </span>
              {" " + curso.nombreCurso} {"(" + curso.descripcionCurso + ")"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Profesor/a: </span>
                  {" " + curso.profesor}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Centro: </span>
                  {curso.centro}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Provincia: </span>
                  {curso.provinciaCentro}
                </p>
              </div>
            </div>

            <div
              className="absolute top-5 right-10 
              flex items-center hover:scale-110 transition-transform cursor-pointer"
              onClick={() => handleClick(curso)}
            >
              <span className="font-semibold mr-2 ">Solicitar charla</span>

              {renderIcon()}
            </div>
            <SolicitudCharla
              isOpen={selectedOption === curso}
              idCurso={curso.idCurso}
              idCentro={curso.idCentro}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default VistaCursosCentrto;
