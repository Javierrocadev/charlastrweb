import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";

const InscripcionEmpresa = () => {
  //const [centro, setCentro] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [tipoEmpresas, setTipoEmpresas] = useState([]);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [personaContacto, setPersonaContacto] = useState("");
  const [cif, setCief] = useState("");
  const [provincia, setProvincia] = useState([]);
  const [tipoEmpresa, setTipoEmpresa] = useState([]);
  const [razonSocial, setRazonSocial] = useState("");

  const handleInputChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleInputChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const handleInputChangeTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const handleInputChangePersonaContacto = (e) => {
    setPersonaContacto(e.target.value);
  };
  const handleInputChangeCief = (e) => {
    setCief(e.target.value);
  };

  const handleInputChangeProvincia = (e) => {
    setProvincia(parseInt(e.target.value));
  };

  const handleInputChangeTipoEmpresa = (e) => {
    setTipoEmpresa(parseInt(e.target.value));
  };

  const handleInputChangeRazonSocial = (e) => {
    setRazonSocial(e.target.value);
  };
  const insertarCentro = async (e) => {
    e.preventDefault();
    try {
      var centroJSON = {
        idEmpresaCentro: null,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        personaContacto: personaContacto,
        cif: cif,
        idProvincia: provincia,
        razonSocial: razonSocial,
        idTipoEmpresa: tipoEmpresa,
      };

      //console.log(centroJSON);

      const responseCentro = await axiosApi.empresasCentros.insertarEmpresaCentro(centroJSON);
      console.log("Centro insertado: ", responseCentro.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProvincias = await axiosApi.provincias.getProvincias();
        setProvincias(responseProvincias);

        const responseTiposEmpresas =
          await axiosApi.empresasCentros.getTipoEmpresa();
        setTipoEmpresas(responseTiposEmpresas);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      <form className="max-w-full m-5" onSubmit={insertarCentro}>
        <h2 className="text-center text-4xl text-gray-500 bg-transparent mb-5">
          Inscriba su empresa
        </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChangeNombre}
          />
          <label
            htmlFor="nombre"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            nombre
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={direccion}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChangeDireccion}
          />
          <label
            htmlFor="direccion"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Dirección
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
            name="telefono"
            id="telefono"
            value={telefono}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChangeTelefono}
          />
          <label
            htmlFor="telefono"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            telefono
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="persona_contacto"
            id="persona_contacto"
            value={personaContacto}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleInputChangePersonaContacto}
          />
          <label
            htmlFor="persona_contacto"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Persona de contacto
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="cif"
              id="cif"
              value={cif}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleInputChangeCief}
            />
            <label
              htmlFor="cif"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              CIF
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="provincias"
              value={provincia}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            onChange={handleInputChangeProvincia}
            >
              <option selected disabled>
                Elige la provincia
              </option>
              {
                provincias.map((provincias, index) => {
                  return (
                    <option key={index} value={provincias.idProvincia}>
                      {provincias.nombreProvincia}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="razon_social"
              id="razon_social"
              value={razonSocial}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleInputChangeRazonSocial}
            />
            <label
              htmlFor="razon_social"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              razon social
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="tiposEmpresas"
              value={tipoEmpresa}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
             onChange={handleInputChangeTipoEmpresa}
            >
              <option selected disabled>
                Elige el tipo de empresa
              </option>

              {
              tipoEmpresas.map((tipo, index) => {
                  return (
                    <option key={index} value={tipo.idTipoEmpresa}>
                      {tipo.descripcion}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};

export default InscripcionEmpresa;