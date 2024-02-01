import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const VerProfesoresCentro = () => {
  const [profesores, setProfesores] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [open, setOpen] = useState(false);

  const handleClick = (profe) => {
    setSelectedOption((prevSelected) => {
      return prevSelected === profe.idUsuario ? null : profe.idUsuario;
    });
    //setOpen((prev) => !prev);
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

  const Loading = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
      const loading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
      };
      const intervalId = setInterval(loading, 500);

      return () => clearInterval(intervalId);
    });

    return (
      <div>
        <span className="ml-2">{dots}</span>
      </div>
    );
  };

  const CursosProfesor = ({ isOpen, idProfesor }) => {
    const [cursos, setCursos] = useState([]);
    const [cursosLoad, setCursosLoad] = useState(false);

    useEffect(() => {
      //console.log(idProfesor);

      const fetchData = async () => {
        try {
          setCursosLoad(true);
          const responseCursos = await axiosApi.centros.getCursosByProfesor(
            idProfesor
          );
          console.log(responseCursos);
          setCursos(responseCursos);
        } catch (error) {
          console.log(error);
        } finally {
          setCursosLoad(false);
        }
      };
      fetchData();
    }, [isOpen, idProfesor]);

    return (
      <div
        className={`${
          isOpen ? "transition-all duration-500 h-[10%]" : "hidden transition-all duration-500 h-0"
        } w-full pt-5 mt-10 border-t-2 overflow-hidden`}
      >
        <h6 className="text-lg font-medium text-gray-900">
          cursos del profesor/a:<br/>
        </h6>
        {cursosLoad ? (
          <Loading />
        ) : (
          <div className=" w-full items-center">
            {cursos.length === 0 ? (
              <p className=" text-gray-900">No tiene cursos asignados.</p>
            ) : (
              cursos.map((curso, index) => (
                <div
                  key={index}
                  className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-accent-200 dark:border-gray-700"
                >
                  <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    <span className="text-accent-200">Curso: </span>
                    {" " + curso.nombreCurso}{" "}
                    {"(" + curso.descripcionCurso + ")"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const representante = await axiosApi.usuarios.getPerfilUsuario();
        const responseProfesores = await axiosApi.profesores.getProfesores();

        const profesorFilter = responseProfesores.filter(
          (prof) =>
            prof.idEmpresaCentro === representante.idEmpresaCentro &&
            prof.idUsuario !== representante.idUsuario
        );

        //console.log("Profesores filtrados: ", profesorFilter);
        if (!profesorFilter.length) {
          setLoading(false);
          return <Loading />;
        } else {
          setProfesores(profesorFilter);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      {loading ? (
        <h1 className="text-center text-3xl font-semibold py-4 flex">
          Profesores del centro{" "}
          <span>
            {" "}
            <Loading />{" "}
          </span>
        </h1>
      ) : (
        <div>
          {profesores.map((profe, index) => (
            <div
              key={index}
              className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-accent-200 dark:border-gray-700"
            >
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                <span className="text-accent-200">Profesor/a: </span>
                {" " + profe.nombre + profe.apellidos}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-accent-100 dark:text-gray-400">
                    <span className="font-semibold">Email: </span>
                    {" " + profe.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-accent-100 dark:text-gray-400">
                    <span className="font-semibold">Telefono: </span>
                    {profe.telefono}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-accent-100 dark:text-gray-400">
                    <span className="font-semibold">LinkedIn: </span>
                    {profe.linkedIn}
                  </p>
                </div>
              </div>

              <div
                className="absolute top-5 right-10 
                flex items-center hover:scale-110 transition-transform cursor-pointer"
                onClick={() => handleClick(profe)}
              >
                <span className="font-semibold mr-2 ">Detalles</span>

                <RenderIcon isSelected={selectedOption === profe.idUsuario} />
              </div>
              <div>
                {selectedOption && (
                  <CursosProfesor
                    isOpen={selectedOption === profe.idUsuario}
                    idProfesor={profe.idUsuario}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VerProfesoresCentro;
