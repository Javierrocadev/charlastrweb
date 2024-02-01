import React, { useEffect, useState } from "react";
import axiosApi from "../../../../api/axiosApi";

const SolicitudCharla = (props) => {
  const [descripcion, setDescripcion] = useState("");
  const [turno, setTurno] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [fechaCharla, setFechaCharla] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [provincia, setProvincia] = useState([]);
  const [exitosa, setExitosa] = useState(null);

  const handleInputChangeDescripcion = async (e) => {
    await setDescripcion(e.target.value);
  };

  const handleInputChangeModalidad = async (e) => {
    await setModalidad(e.target.value);
  };

  const handleInputChangeTurno = async (e) => {
    await setTurno(e.target.value);
  };

  const handleInputChangeFechaCharla = async (e) => {
    await setFechaCharla(e.target.value);
  };

  const centro = provincia.find(
    async (centro) => centro.idEmpresaCentro === (await props.idCentro)
  );
  //console.log(centro);

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
          className={`p-4 mt-3 ${
            exitosa ? "bg-green-500" : "bg-red-500"
          } text-white transition-opacity duration-500 ease-in-out opacity-100`}
        >
          {exitosa
            ? "Charla solicitada exitosamente"
            : "Error al solicitar la charla "}
        </div>
      )
    );
  };

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
        idCurso: props.idCurso.idCurso, // curso seleccionado del centro pasados por props
        idProvincia: centro.idProvincia, // dato capturado del centro pasados por props
      };

      console.log(dataJSON);

      const postSolicitud = await axiosApi.charlas.createCharla(dataJSON);
      console.log("datos de charla: ", postSolicitud);

      if (postSolicitud.response && postSolicitud.response.status !== 200) {
        setExitosa(false);
      } else {
        setExitosa(true);
      }
    } catch (error) {
      // if (error.response && error.response.status === 200) {
      //   // Si hay una respuesta del servidor con un estado 200, considera que la solicitud fue exitosa
      //   setExitosa(true);
      // } else {
      //   console.error("Respuesta del servidor:", error.response);
      //   setExitosa(false);
      // }
      console.log(error);
    }
  };

  const handleClose = () => {
    setExitosa(null);
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
    <div
      className={`${
        props.isOpen ? "" : "hidden"
      } pt-5 mt-10 border-t-2 min-w-[30vw]`}
    >
      <div className=" w-full items-center">
        <div
          className={`flex flex-col lg:justify-between lg:items-center mb-5 lg:flex-row`}
        >
          <div className="w-1/2 mt-5 mr-3">
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
            w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
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
            w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline resize-none"
              onChange={handleInputChangeFechaCharla}
            />
          </div>
        </div>
        <button
          onClick={() => insertarCharla()}
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
        >
          Enviar solicitar
        </button>
      </div>
      <div>
        <ModalAlerta exitosa={exitosa} onClose={handleClose} />
      </div>
    </div>
  );
};
export default SolicitudCharla;
