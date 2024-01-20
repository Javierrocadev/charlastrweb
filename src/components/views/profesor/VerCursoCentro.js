import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const VistaCursosCentrto = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (curso) => {
    setSelectedOption((prevSelected) => {
      return prevSelected === curso ? null : curso;
    });
  };

  const FormSolicitudCharla = ({ isOpen, idCurso, idCentro }) => {
    const [descripcion, setDescripcion] = useState("");
    const [turno, setTurno] = useState("");
    const [modalidad, setModalidad] = useState("");
    const [fechaCharla, setFechaCharla] = useState("");
    const [fechaSolicitud, setFechaSolicitud] = useState("");
    const [provincia, setProvincia] = useState([]);

    const handleInputChangeDescripcion = (e) => {
      setDescripcion(e.target.value);
    };

    const handleInputChangeModalidad = (e) => {
      setModalidad(e.target.value);
    };

    const handleInputChangeTurno = (e) => {
      setTurno(e.target.value);
    };

    const handleInputChangeFechaCharla = (e) => {
      setFechaCharla(e.target.value);
    };

    const centro = provincia.find(
      (centro) => centro.idEmpresaCentro === idCentro
    );
    //console.log(centro);

    const insertarCharla = async () => {
      try {
        const dataJSON = {
          idCharla: 0,
          descripcion: descripcion,
          idEstadoCharla: 2, //PENDIENTE
          fechaCharla: fechaCharla, // fecha
          observaciones: null, //comentario
          idTechRider: null,
          fechaSolicitud: fechaSolicitud, // fecha en la que se pidió
          turno: turno, // turno
          modalidad: modalidad, // modalidad
          acreditacionLinkedIn: null,
          idCurso: idCurso, // curso seleccionado del centro pasados por props
          idProvincia: centro.idProvincia, // dato capturado del centro pasados por props
        };

        const postSolicitud = axiosApi.charlas.createCharla(dataJSON);
        console.log("datos de charla: ", postSolicitud);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const provinciaresponse =
            await axiosApi.empresasCentros.getEmpresasCentros();
          //console.log(provinciaresponse.data);
          setProvincia(provinciaresponse);

          const date = new Date();
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

          setFechaSolicitud(formattedDate);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []);

    return (
      <div className={`${isOpen ? "" : "hidden"} pt-5 mt-10 border-t-2`}>
        <div className=" w-full items-center">
          <div className="flex justify-between items-center mb-5">
            <div className="w-full mt-5 mr-3">
              <label
                htmlFor="comentario"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                descripción:
              </label>
              <input
                type="text"
                id="comentario"
                value={descripcion}
                className="shadow appearance-none border rounded 
            md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline resize-none"
                onChange={handleInputChangeDescripcion}
                placeholder="¿Titulo de la charla?"
              />
            </div>
            <div className="w-1/2 mt-5 mr-3">
              <label
                htmlFor="modalidad"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Modalidad:
              </label>
              <select
                type="text"
                id="modalidad"
                value={modalidad}
                className="shadow appearance-none border rounded 
            md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline resize-none"
                onChange={handleInputChangeModalidad}
              >
                <option value="" selected>
                  {" "}
                  seleccione una opción{" "}
                </option>
                <option value="ONLINE">ONLINE</option>
                <option value="PRESENCIAL">PRESENCIAL</option>
              </select>
            </div>
            <div className="w-1/2 mt-5 mr-3">
              <label
                htmlFor="turno"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Turno:
              </label>
              <select
                type="text"
                id="turno"
                value={turno}
                required
                className="shadow appearance-none border rounded 
            md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline resize-none"
                onChange={handleInputChangeTurno}
              >
                <option value="" selected>
                  {" "}
                  seleccione una opción{" "}
                </option>
                <option value="MAÑANA">MAÑANA</option>
                <option value="TARDAE">TARDE</option>
              </select>
            </div>
            <div className="w-1/2 mt-5">
              <label
                htmlFor="fechaCharla"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha charla:
              </label>
              <input
                type="date"
                id="fechaCharla"
                value={fechaCharla}
                className="shadow appearance-none border rounded 
            md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline resize-none"
                onChange={handleInputChangeFechaCharla}
              />
            </div>
          </div>
          <button
            onClick={() => insertarCharla()}
            className="bg-gray-950  hover:bg-gray-800 transition-colors
          text-white font-semibold py-2 px-4 rounded 
          focus:outline-none focus:shadow-outline"
          >
            Enviar solicitar
          </button>
        </div>
      </div>
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
              <svg
                className="w-6 h-5 text-gray-800 dark:text-white"
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
            </div>
            <FormSolicitudCharla
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
