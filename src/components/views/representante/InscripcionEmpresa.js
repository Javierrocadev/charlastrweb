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

  const [selectedComponent, setSelectedComponent] = useState("inscripcion");

  const handleComponentChange = (selected) => {
    setSelectedComponent(selected);
  };

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
        idEmpresaCentro: 0,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        personaContacto: personaContacto,
        cif: cif,
        idProvincia: provincia,
        razonSocial: razonSocial,
        idTipoEmpresa: tipoEmpresa,
        estadoEmpresa: 1,
      };

      console.log(centroJSON);
      const responseCentro =
        await axiosApi.empresasCentros.insertarEmpresaCentro(centroJSON);
      const idCentroEmpresa = responseCentro.idEmpresaCentro;

      const reponsePeticion =
        await axiosApi.empresasCentros.peticionesAltaEmpresaCentro(
          idCentroEmpresa
        );
      console.log("Centro insertado: ", responseCentro);
      console.log("Peticion enviada: ", reponsePeticion);

      // const responseCentro =
      //   await axiosApi.empresasCentros.insertarEmpresaCentro(centroJSON);
      // console.log("Centro insertado: ", responseCentro.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FormularioInscripcion = () => {
    return (
      <form className="max-w-full m-5" onSubmit={insertarCentro}>
        <h2 class="text-3xl font-bold mb-7 text-gray-800">
          Inscribe tu centro
        </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              onChange={handleInputChangeProvincia}
            >
              <option selected disabled>
                Elige la provincia
              </option>
              {provincias.map((provincias, index) => {
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
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="razón social "
              onChange={handleInputChangeRazonSocial}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="tiposEmpresas"
              value={tipoEmpresa}
              required
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              onChange={handleInputChangeTipoEmpresa}
            >
              <option selected disabled>
                Elige el tipo de empresa
              </option>

              {tipoEmpresas.map((tipo, index) => {
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
    );
  };

  const BuscarMiEmpresa = () => {
    const [centros, setCentros] = useState([]);
    const [centrobuscado, setCentroBuscado] = useState(0);

    const handleClickCentro = (centro) => {
      //console.log(centro);
      setCentroBuscado(centro);
    };

    const handleSubmit = async () => {
      try {
        const responsable = await axiosApi.usuarios.getPerfilUsuario();
        const putResponsableEmpresa =
          axiosApi.empresasCentros.putResponsableEmpresa(
            centrobuscado,
            responsable.idUsuario
          );
        console.log(putResponsableEmpresa);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      const fechData = async () => {
        try {
          const resp = await axiosApi.empresasCentros.getEmpresasCentros();
          setCentros(resp);
        } catch (error) {
          console.log(error);
        }
      };
      fechData();
    }, []);
    return (
      <div className="w-full md:w-[95%] mx-auto p-6 bg-accent-100 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Busca tu centro
        </h1>
        <div className="relative">
          <label
            htmlFor="buscar"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Selecciona tu centro
          </label>
          <div className="relative">
            <select
              id="buscar"
              onChange={(e) => handleClickCentro(e.target.value)}
              className="block w-full px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {centros.map((centro) => (
                <option
                  value={centro.idEmpresaCentro}
                  key={centro.idEmpresaCentro}
                  className="py-4"
                >
                  {centro.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pt-5 flex justify-center items-center">
          <button
            onClick={() => handleSubmit()}
            className="py-2 px-5 text-white bg-black hover:bg-gray-900"
          >
            formar parte
          </button>
        </div>
      </div>
    );
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
    <section className="container bg-white py-4 rounded mx-auto">
      <div className="text-sm font-medium text-center text-accent-100 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              className={`${
                selectedComponent === "inscripcion"
                  ? "bg-accent-200  text-white"
                  : "active bg-accent-100 hover:bg-blue-600  text-white"
              } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
              onClick={() => handleComponentChange("inscripcion")}
            >
              inscribir centro
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${
                selectedComponent === "buscarempresa"
                  ? "bg-accent-200  text-white"
                  : "active bg-accent-100 hover:bg-blue-600  text-white"
              } inline-block p-4 border-b-2 border-transparent rounded-t-sm focus:outline-none`}
              onClick={() => handleComponentChange("buscarempresa")}
            >
              buscar mi centro
            </button>
          </li>
        </ul>
      </div>
      <div className="pt-5">
        {selectedComponent === "inscripcion" && <FormularioInscripcion />}
        {selectedComponent === "buscarempresa" && <BuscarMiEmpresa />}
      </div>
    </section>
  );
};

export default InscripcionEmpresa;
