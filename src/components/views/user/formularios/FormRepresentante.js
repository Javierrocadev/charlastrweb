import React, { useState, useEffect } from "react";
import axiosApi from "../../../../api/axiosApi";
import axios from "axios";

const FormRepresentante = () => {
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [empresaCentroResponse, setEmpresaCentroResponse] = useState([]);
  const [formulario, setFormulario] = useState({
    idUsuario: 0,
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    linkedIn: "",
    password: "",
    idRole: 4,
    idProvincia: 0,
    idEmpresaCentro: null,
    estado: 2,
    linkedInVisible: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "idProvincia" ||
      name === "idEmpresaCentro" ||
      name === "estado" ||
      name === "idRole" ||
      name === "linkedInVisible"
        ? parseInt(value)
        : value;
    setFormulario({ ...formulario, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formulario);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://apitechriders.azurewebsites.net/api/Usuarios",
        formulario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      alert("Solicitud Enviada", "Sera revisada por el admin");
      // Aquí podrías manejar la respuesta del servidor según tus necesidades
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      // Aquí podrías manejar el error según tus necesidades
    }
  };

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const responseProvincias = await axiosApi.provincias.getProvincias();
        console.log("Charlas responseProvincias:", responseProvincias);
        setProvinciasResponse(responseProvincias);

        const responseEmpresaCentro =
          await axiosApi.empresasCentros.getEmpresasCentros();
        console.log("Charlas responseEmpresaCentro:", responseEmpresaCentro);
        setEmpresaCentroResponse(responseEmpresaCentro);
      } catch (error) {
        console.error("Error al obtener provincias:", error);
      }
    };
    fetchProvincias();
  }, []);

  return (
    <main className="bg-white w-[40em]  rounded-xl shadow dark:bg-primary-100">
    <div className=" py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div className=" p-4 flex flex-col">
      {" "}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-accent-200">
          Form Representante
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Rellena los siguientes datos
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "
          value={formulario.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Apellidos
        </label>
        <input
          type="text"
          name="apellidos"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "
          value={formulario.apellidos}
          onChange={handleChange}
          placeholder="Apellidos"
        />
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Telefono
        </label>
        <input
          type="text"
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "
          placeholder="Teléfono"
        />
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          LinkedIn
        </label>
        <input
          type="text"
          name="linkedIn"
          value={formulario.linkedIn}
          onChange={handleChange}
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "
          placeholder="LinkedIn"
        />
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Correo
        </label>
        <input
          type="email"
          name="email"
          value={formulario.email}
          onChange={handleChange}
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "
          placeholder="Email"
        />
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={formulario.password}
          onChange={handleChange}
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "
          placeholder="Contraseña"
        />
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Provincia
        </label>
        <div>
          <select
            id="idProvincia"
            name="idProvincia"
            className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0 text-sm relative focus:z-10 focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2 ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400"
            value={formulario.idProvincia}
            onChange={handleChange}
          >
            <option value="">Seleccione una provincia</option>
            {provinciasResponse.map((provincia) => (
              <option key={provincia.idProvincia} value={provincia.idProvincia}>
                {provincia.nombreProvincia}
              </option>
            ))}
          </select>
        </div>
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          Empresa
        </label>
        <div>
          <select
            id="idEmpresaCentro"
            name="idEmpresaCentro"
            className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0 text-sm relative focus:z-10 focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2 ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400"
            value={formulario.idEmpresaCentro}
            onChange={handleChange}
          >
            <option value="null">Sin empresa</option>
            {empresaCentroResponse.map((empresacentro) => (
              <option
                key={empresacentro.idEmpresaCentro}
                value={empresacentro.idEmpresaCentro}
              >
                {empresacentro.nombre}
              </option>
            ))}
          </select>
        </div>
        <label
          for="af-account-phone"
          class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-accent-200"
        >
          ¿Tu linkedIn será visible para el resto?
        </label>
        <div>
          <div>
            <input
              type="checkbox"
              id="linkedInVisible"
              name="linkedInVisible"
              value={formulario.linkedInVisible}
              checked={formulario.linkedInVisible === 1}
              onChange={() =>
                setFormulario({
                  ...formulario,
                  linkedInVisible: formulario.linkedInVisible === 1 ? 0 : 1,
                })
              }
            />
            <label htmlFor="linkedInVisible" className="ml-2">
              {formulario.linkedInVisible === 1 ? "Sí" : "No"}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          Enviar
        </button>
      </form>
    </div>
    </div>
    </main>
  );
};

export default FormRepresentante;
