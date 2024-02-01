import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import SolicitudCharla from "../user/formularios/SolicitudCharla";
import banner from "../../../assets/images/imgcurso.jpeg";

const VistaCursosCentrto = () => {
  const [cursos, setCursos] = useState([]);
  const [cursosProfesor, setCursosProfesor] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("cursos");
  const [loaded, setLoaded] = useState(false);

  const handleComponentChange = (selected) => {
    setSelectedComponent(selected);
  };

  const handleClick = (curso) => {
    setSelectedOption((prevSelected) => {
      return prevSelected === curso ? null : curso;
    });
    setOpen((prev) => !prev);
  };

  const renderIcon = () => {
    return (
      <svg
        className="w-4 h-4 pt-2 text-gray-800 dark:text-white"
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

  const ModalAlerta = ({ exitosa, onClose }) => {
    useEffect(() => {
      const timerId = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timerId);
    }, [exitosa, onClose]);

    return (
      exitosa !== null && (
        <div
          className={`p-4 ${
            exitosa ? "bg-green-500" : "bg-red-500"
          } text-white transition-opacity duration-500 ease-in-out opacity-100`}
        >
          {exitosa ? "Curso creado exitosamente" : "Error al crear el curso"}
        </div>
      )
    );
  };

  const ModalAlertaEliminar = ({ exitosa, onClose }) => {
    useEffect(() => {
      const timerId = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timerId);
    }, [exitosa, onClose]);

    return (
      exitosa !== null && (
        <div className="relative w-[90%] h-[250px] mx-auto">
          <div
            className={`z-80 py-4 px-5 mt-3 absolute top-10 mx-auto ${
              exitosa
                ? "bg-green-500 transform translate-y-0 opacity-100 transition-transform ease-in-out duration-500"
                : "bg-red-500 transform translate-y-full opacity-100 transition-transform ease-in-out duration-500"
            } text-white w-[90%] mx-auto`}
          >
            {exitosa
              ? "Curso eliminado exitosamente"
              : "Error al eliminar el curso"}
          </div>
        </div>
      )
    );
  };

  const Cursos = ({ loaded }) => {
    return (
      <div className="">
        {loaded ? (
          cursos.map((curso, index) => (
            <div
              key={index}
              className="relative w-full min-w-[400px] sm:w-2/2 md:w-3/3 lg:w-4/4 xl:w-6/6 mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                <span className="text-accent-200">Curso: </span>
                {" " + curso.nombreCurso} {"(" + curso.descripcionCurso + ")"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Profesor/a: </span>
                    {" " + curso.profesor}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Centro: </span>
                    {curso.centro}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Provincia: </span>
                    {curso.provinciaCentro}
                  </p>
                </div>
              </div>

              <div
                className={`py-5 inline-flex max-w-[130px]
                 items-center hover:translate-x-5 transition-transform ease-in-out duration-300 cursor-pointer`}
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
          ))
        ) : (
          <h3 className="mt-8">No hay cursos disponibles en este momento.</h3>
        )}
      </div>
    );
  };

  const AlumnosProfesor = () => {
    const [exitosa, setExitosa] = useState(null);

    const handleClick = async (curso) => {
      try {
        console.log("Curso a eliminado: ", curso);
        const responsedelete = await axiosApi.profesores.EliminarCurso(
          curso.idCurso
        );
        //console.log("Curso eliminado exitosamente: ", responsedelete);
        if (responsedelete.response && responsedelete.response.status !== 200) {
          setExitosa(false);
        } else {
          setExitosa(true);
        }
      } catch (error) {
        console.log(error);
        setExitosa(false);
      }
    };

    const handleClickSolicitarCharla = async (curso) => {
      setSelectedOption((prevSelected) => {
        return prevSelected === curso ? null : curso;
      });
      setOpen((prev) => !prev);
    };

    const handleClose = () => {
      setExitosa(null);
    };

    return (
      <section className="pt-10">
        <div className="w-full h-full relative">
          {cursosProfesor.map((curso) => (
            <div
              key={curso.idCurso}
              className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
                <span className="text-accent-200">
                  {curso.descripcionCurso} {"(" + curso.nombreCurso + ")"}
                </span>
                <div
                  className={`top-5 right-10 ml-10 inline-flex
                items-center hover:translate-x-2 transition-transform ease-in-out duration-300 cursor-pointer`}
                  onClick={() => handleClickSolicitarCharla(curso)}
                >
                  <span className="font-semibold mr-2 text-sm">
                    Solicitar charla
                  </span>

                  {renderIcon()}
                </div>
                {/* <div
                  className=" top-5 right-5 ml-10
            flex items-center hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => handleClick(curso)}
                >
                  <span className="font-semibold mr-2 text-sm ">
                    Eliminar curso
                  </span>
                </div> */}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Centro: </span>
                    {curso.centro}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Email: </span>
                    {curso.emailProfesor}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Telefono: </span>
                    {curso.telefonoProfesor}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Provincia: </span>
                    {curso.provinciaCentro}
                  </p>
                </div>
              </div>

              <SolicitudCharla
                isOpen={selectedOption === curso}
                idCurso={curso.idCurso}
                idCentro={curso.idCentro}
              />
            </div>
          ))}
          <div className="absolute top-14 left-12 w-[90%] mx-auto">
            <ModalAlertaEliminar exitosa={exitosa} onClose={handleClose} />
          </div>
        </div>
      </section>
    );
  };

  const CrearCurso = () => {
    const [idCentro, setIdCentro] = useState(0);
    const [nombreCurso, setNombreCurso] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [exitosa, setExitosa] = useState(null);

    const handleInputChangeNombre = (e) => {
      setNombreCurso(e.target.value);
    };

    const handleInputChangeDescripcion = (e) => {
      setDescripcion(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const dataJSON = {
          idCurso: 0,
          idCentro: idCentro,
          nombreCurso: nombreCurso,
          descripcion: descripcion,
        };
        console.log(dataJSON);

        const postCurso = axiosApi.profesores.CrearCurso(dataJSON);
        console.log("datos del curso: ", postCurso);
        if (
          postCurso &&
          postCurso.response &&
          postCurso.response.status === 200
        ) {
          setExitosa(true);
        } else {
          setExitosa(false);
        }
      } catch (error) {
        console.log(error);
        setExitosa(false);
      }
    };

    const handleClose = () => {
      setExitosa(null);
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axiosApi.usuarios.getPerfilUsuario();
          setIdCentro(resp.idEmpresaCentro);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [idCentro]);

    return (
      <section className="pt-10 px-10">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-5">
          <div className="bg-white text-black rounded-md shadow-md md:flex-1">
            <header className="w-full h-20 flex justify-center items-center bg-accent-200  text-white">
              <h2 className="text-4xl font-bold mb-4">crear un curso</h2>
            </header>

            <form onSubmit={handleSubmit} className="px-5 py-5">
              <div className="mb-6">
                <label
                  htmlFor="nombre"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombreCurso}
                  onChange={handleInputChangeNombre}
                  placeholder="nombre técnico"
                  className="shadow appearance-none border rounded 
                  md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight  
            focus:outline-none "
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="descripcion"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Descripción:
                </label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleInputChangeDescripcion}
                  placeholder="nombre completo"
                  className="sshadow appearance-none border rounded 
                  md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight  
            focus:outline-none"
                />
              </div>

              <div className="w-[100%] inline-block mx-auto px-5">
                <button
                  type="submit"
                  className="w-full transition duration-300 bg-accent-200  text-white font-bold hover:bg-accentDark-200 py-3"
                  //onClick={() => handleSubmit()}
                >
                  Crear curso
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:block md:flex-1 relative">
            <img
              src={banner}
              alt="Tech riders"
              className="w-full h-full object-cover rounded-sm shadow-md"
            />
            <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
          </div>
        </div>
        <div>
          <ModalAlerta exitosa={exitosa} onClose={handleClose} />
        </div>
      </section>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const responseCursos = await axiosApi.centros.getCursosByCentro();
        const profesorCentro = await axiosApi.usuarios.getPerfilUsuario();
        const responseCursos = await axiosApi.centros.getCursos();
        const cursosFilter = responseCursos.filter(
          (c) => c.idCentro === profesorCentro.idEmpresaCentro
        );

        console.log("cursos: ", responseCursos);
        console.log("cursos del centro: ", cursosFilter);

        const responseAlumnosProfesor =
          await axiosApi.centros.getCursosByCentro();
        console.log("Cursos profesor: ", responseAlumnosProfesor);
        setCursosProfesor(responseAlumnosProfesor);

        setCursos(cursosFilter);
        setLoaded(true);
      } catch (error) {
        console.log(error);
        setLoaded(false);
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
                  selectedComponent === "cursos"
                    ? "bg-blue-700  text-white"
                    : "active bg-blue-400 hover:bg-blue-600  text-white"
                } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
                onClick={() => handleComponentChange("cursos")}
              >
                cursos del centro
              </button>
            </li>
            <li className="me-2">
              <button
                className={`${
                  selectedComponent === "miscursos"
                    ? "bg-accent-200  text-white"
                    : "active bg-accent-100 hover:bg-blue-600  text-white"
                } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
                onClick={() => handleComponentChange("miscursos")}
              >
                mis cursos
              </button>
            </li>
            <li className="me-2">
              <button
                className={`${
                  selectedComponent === "crearcurso"
                    ? "bg-accent-200  text-white"
                    : "active bg-accent-100 hover:bg-blue-600  text-white"
                } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
                onClick={() => handleComponentChange("crearcurso")}
              >
                crear curso
              </button>
            </li>
          </ul>
        </div>
        <div className="pt-5">
          {selectedComponent === "cursos" && <Cursos loaded={loaded} />}
          {selectedComponent === "crearcurso" && <CrearCurso />}
          {selectedComponent === "miscursos" && <AlumnosProfesor />}
        </div>
      </section>
    </main>
  );
};
export default VistaCursosCentrto;
