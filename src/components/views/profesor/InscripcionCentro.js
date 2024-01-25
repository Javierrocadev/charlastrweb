import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";

const InscripcionCentro = () => {
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
        estadoEmpresa: 1
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
    <section className="container bg-white rounded py-4 mx-auto">
      <form className="max-w-full m-5" onSubmit={insertarCentro}>
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Inscribe tu centro
      </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="nombre "
            required
            onChange={handleInputChangeNombre}
          />
         
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={direccion}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="direccion "
            required
            onChange={handleInputChangeDireccion}
          />
        
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
            name="telefono"
            id="telefono"
            value={telefono}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder=" telefono "
            required
            onChange={handleInputChangeTelefono}
          />
         
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="persona_contacto"
            id="persona_contacto"
            value={personaContacto}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder=" Persona de contacto "
            required
            onChange={handleInputChangePersonaContacto}
          />
         
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="cif"
              id="cif"
              value={cif}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="CIF "
              required
              onChange={handleInputChangeCief}
            />
            
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="provincias"
              value={provincia}
              required
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="razón social "
              onChange={handleInputChangeRazonSocial}
            />
           
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="tiposEmpresas"
              value={tipoEmpresa}
              required
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Inscribir centro
          </button>
        </div>
      </form>
    </section>
  );
};

export default InscripcionCentro;