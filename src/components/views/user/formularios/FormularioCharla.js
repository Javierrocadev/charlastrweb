import React, { useEffect, useState } from "react";
import banner from "../../../../assets/images/HeroImg.jpeg";
import logo from "../../../../assets/images/LogoTechRiders.png";
import axiosApi from "../../../../api/axiosApi";

const FormularioCharla = () => {
  //const [cursos, setCursos] = useState([]);
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [formulario, setFormulario] = useState({
    idCharla: 0,
    descripcion: "",
    idEstadoCharla: 2,
    fechaCharla: "",
    observaciones: null,
    idTechRider: null,
    fechaSolicitud: "",
    turno: "",
    modalidad: "",
    acreditacionLinkedIn: null,
    idCurso: 0,
    idProvincia: 0,
  });

  const [loaded, setLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormulario({ ...formulario, fechaSolicitud });
    //console.log("Datos del formulario:", formulario);
  };

  // Verifica si todos los campos necesarios están completos
  const camposCompletos = Object.values(formulario).every(
    (campo) => campo !== null && campo !== "" && campo !== 0
  );
  console.log(camposCompletos);

  useEffect(() => {
    console.log("Datos del formulario actualizados:", formulario);
  }, [formulario]);

  useEffect(() => {
    const fetchData = async () => {
      //setLoaded(true);
      try {
        // const reponseCursos = await axiosApi.centros.getCursos();
        // setCursos(reponseCursos);
        // //console.log(reponseCursos);

        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        setFechaSolicitud(formattedDate);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loaded) {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        fechaSolicitud,
      }));
    }
  }, [loaded, fechaSolicitud]);

  return (
    <section className=" pt-10">
      <div
        className={`transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } flex flex-col md:flex-row items-stretch justify-center gap-5`}
      >
        <div className="bg-white text-black rounded-md shadow-md md:flex-1">
          <header className="w-full h-20 flex justify-center items-center bg-black text-white">
            <h2 className="text-4xl font-bold mb-4">Solicita una charla</h2>
          </header>

          <form onSubmit={handleSubmit} className="px-5 py-5">
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
                value={formulario.descripcion}
                onChange={handleChange}
                placeholder="¿Temática de la charla ?"
                className="shadow appearance-none border rounded 
              md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline resize-none"
              />
            </div>
            <div className="mb-6 flex items-center gap-5">
              <div className="w-1/2">
                <label
                  htmlFor="fechaCharla"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de Charla:
                </label>
                <input
                  type="date"
                  id="fechaCharla"
                  name="fechaCharla"
                  value={formulario.fechaCharla}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded 
              md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline resize-none"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="fechaSolicitud"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Fecha de solicitud:
                </label>
                <input
                  type="date"
                  id="fechaSolicitud"
                  name="fechaCharla"
                  value={fechaSolicitud}
                  onChange={handleChange}
                  disabled
                  className="shadow appearance-none border rounded 
              md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline resize-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="turno"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Turno:
              </label>
              <select
                name="turno"
                id="turno"
                value={formulario.turno}
                onChange={handleChange}
                className="shadow appearance-none border rounded 
              md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
              >
                <option value="0" selected>seleccione una opción</option>
                <option value="MAÑANA">MAÑANA</option>
                <option value="TARDE">TARDE</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="modalidad"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Modalidad:
              </label>
              <select
                name="modalidad"
                id="modalidad"
                value={formulario.modalidad}
                onChange={handleChange}
                className="shadow appearance-none border rounded 
              md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
              >
                <option value="0" selected>seleccione una opción</option>
                <option value="PRESENCIAL">PRESENCIAL</option>
                <option value="ONLINE">ONLINE</option>
              </select>
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="cursos"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                A quienes va dirigido:
              </label>
              <select
                name="cursos"
                id="cursos"
                value={formulario.idCurso}
                onChange={handleChange}
                className="shadow appearance-none border rounded 
              md:w-full py-2 px-3 mr-10 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
              >
                {cursos.map((curso) => (
                  <option key={curso._id} value={curso.nombreCurso}>
                    {curso.nombreCurso}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="w-[100%] inline-block mx-auto px-5">
              <button
                type="submit"
                disabled={!camposCompletos}
                className={`bg-black text-white py-2 rounded-md ${
                  !camposCompletos
                    ? "opacity-50 cursor-pointer"
                    : "hover:bg-gray-800"
                } w-full transition duration-300 `}
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:flex-1 relative">
          <img
            src={banner}
            alt="Tech riders"
            className="w-full h-full object-cover rounded-md shadow-md"
          />
          <div className="absolute inset-0 bg-black opacity-60 rounded-md">
            <img src={logo} className="pt-56 w-25 h-25" alt="TeachRider logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormularioCharla;
