import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";

const NotificacionesAdmin = () => {
  const [formulario, setFormulario] = useState(null);

  const handleFormularioClick = (tipoUsuario) => {
    setFormulario(tipoUsuario);
  };

  const [charlasResponse, setCharlasResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [tecnologiasResponse, setTecnologiasResponse] = useState([]);
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState([]);
  const [centroEmpresaResponse, setEmpresasCentrosResponse] = useState([]);
  const [peticionCentroEmpresaResponse, setPeticionCentroEmpresaResponse] = useState([]);
  const [usuariosResponse, SetUsuariosResponse] = useState([]);
  const [rolesResponse, SetRolesResponse] = useState([]);
  const [peticionesResponse, SetRpeticionesResponse] = useState([]);
  const [solicitudAcreditacionResponse, SetsolicitudAcreditacionResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombreTecnologia, setNombreTecnologia] = useState("");


  const handleClick = async (idusuario, idestado) => {
    const responseUpdateUser = axiosApi.usuarios.updateEstadoUsuario(
      idusuario,
      idestado
    );
    console.log("Algo: ", responseUpdateUser);
  };

  const handleAlta = async (idempresacentro,estado,idpeticion) => {
    console.log(idempresacentro)
    const altaEmpresaResponse = axiosApi.empresasCentros.updateEstadoCentroEmpresa(
      idempresacentro,
      estado
    );
    const eliminarPeticionResponse = await axiosApi.peticionesCentroEmpresa.deletePeticionCentroEmpresa(idpeticion)

    loadPeticiones()
    console.log("alta: ", altaEmpresaResponse);
    console.log("eliminarPeticion", eliminarPeticionResponse)

  };

  const handleBaja = async (idpeticion) => {
    const DenegadaEmpresaResponse = axiosApi.peticionesCentroEmpresa.deleteAllPeticionCategoria(
      idpeticion
    );

    loadPeticiones()
    console.log("Algo: ", DenegadaEmpresaResponse);
  
  };
  const handleNombreChange = (e) => {
    setNombreTecnologia(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar al método en otro componente y pasar el valor del input
   axiosApi.tecnologias.postTecnologia(nombreTecnologia);
  };

  const loadPeticiones = async ()=>{
    try{
       const peticionCentroEmpresaResponse =
        await axiosApi.peticionesCentroEmpresa.getPeticionesCentroEmpresa();
      console.log("Centros:", peticionCentroEmpresaResponse);
      setPeticionCentroEmpresaResponse(peticionCentroEmpresaResponse);
    }catch(error){
      console.log(error)
    }
   
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsuarios = await axiosApi.usuarios.getUsuarios();
        console.log("Users:", responseUsuarios);
        SetUsuariosResponse(responseUsuarios);

        const charlasResponse = await axiosApi.charlas.getCharlas();
        console.log("Users:", charlasResponse);
        setCharlasResponse(charlasResponse);

        const peticionesResponse = await axiosApi.peticionesTecnologias.getPeticionesTecnologias();
        console.log("Users:", peticionesResponse);
        SetRpeticionesResponse(peticionesResponse);

        const solicitudAcreditacionResponse = await axiosApi.solicitudesAcreditacion.getSolicitudesAcreditacion();
        console.log("Users:", solicitudAcreditacionResponse);
        SetsolicitudAcreditacionResponse(solicitudAcreditacionResponse);

        const centroEmpresaResponse =
          await axiosApi.empresasCentros.getEmpresasCentros();
        console.log("Centros:", centroEmpresaResponse);
        setEmpresasCentrosResponse(centroEmpresaResponse);

        loadPeticiones()

        const responseRoles = await axiosApi.roles.getRoles();
        console.log("Roles:", responseRoles);
        SetRolesResponse(responseRoles);

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        // Manejar errores y marcar la carga como completa incluso si hay errores
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProvinciaNombre = (idProvincia) => {
    console.log("dentro" + idProvincia);
    const provincia = provinciasResponse.find(
      (p) => p.idProvincia === idProvincia
    );
    return provincia ? provincia.nombreProvincia : "Desconocido";
  };

  // const handleAcreditar = async (idcharla) => {
  //   const responseAcreditarCharla =  axiosApi.charlas.acreditarCharla(idcharla);
  //   console.log("Algo: ", responseAcreditarCharla);
  // };

  const handleAcreditar = async (idcharla,idpeticion) => {
    try {
      const responseAcreditarCharla = await axiosApi.charlas.acreditarCharla(idcharla,idpeticion);
      console.log("Algo: ", responseAcreditarCharla);
    } catch (error) {
      console.error("Error al acreditar charla:", error);
    }
  };

  const [seccion, setSeccion] = useState('altauser'); // Estado para controlar la sección

    const cargarDatos = (seccion) => {
      setSeccion(seccion); // Actualiza el estado con la nueva sección
    };
  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100 p-2">
               <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font text-7xl  mb-4 font-bold text-gray-900">
            Notificaciones
            </h1>
            </div>
      
            
       
      <section class="text-gray-600 body-font mt-6">
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-accent-200 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  {/* <!-- Input --> */}
                  <div class="sm:col-span-1">
                    <label
                      for="hs-as-table-product-review-search"
                      class="sr-only"
                    >
                      Search
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="hs-as-table-product-review-search"
                        class="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Search"
                      />
                      <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <svg
                          class="h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Input --> */}
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                    onClick={() => cargarDatos('altauser')}
                  >
                    Alta Usuarios
                  </button>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                    onClick={() => cargarDatos('altacentroempresa')}
                  >
                    Alta centro-empresa
                  </button>

                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                    onClick={() => cargarDatos('altatecnologia')}
                  >
                    Alta Tecnologia
                  </button>
                  
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                    onClick={() => cargarDatos('altaacreditacion')}
                  >
                    Alta Acreditacion Charla
                  </button>

                  <div class="sm:col-span-2 md:grow">
                    <div class="flex justify-end gap-x-2">
                      <div
                        class="hs-dropdown relative inline-block [--placement:bottom-right]"
                        data-hs-dropdown-auto-close="inside"
                      >
                        <button
                          id="hs-as-table-table-filter-dropdown"
                          type="button"
                          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            class="flex-shrink-0 w-3.5 h-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M7 12h10" />
                            <path d="M10 18h4" />
                          </svg>
                          Filter
                          <span class="ps-2 text-xs font-semibold text-blue-600 border-s border-gray-200 dark:border-gray-700 dark:text-blue-500">
                            1
                          </span>
                        </button>
                        <div
                          class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[12rem] z-10 bg-white shadow-md rounded-lg mt-2 dark:divide-gray-700 dark:bg-accent-200 dark:border dark:border-gray-700"
                          aria-labelledby="hs-as-table-table-filter-dropdown"
                        >
                          <div class="divide-y divide-gray-200 dark:divide-gray-700">
                            <label
                              for="hs-as-filters-dropdown-all"
                              class="flex py-2.5 px-3"
                            >
                              <input
                                type="checkbox"
                                class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                id="hs-as-filters-dropdown-all"
                                checked
                              />
                              <span class="ms-3 text-sm text-gray-800 dark:text-gray-200">
                                All
                              </span>
                            </label>
                            <label
                              for="hs-as-filters-dropdown-published"
                              class="flex py-2.5 px-3"
                            >
                              <input
                                type="checkbox"
                                class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                id="hs-as-filters-dropdown-published"
                              />
                              <span class="ms-3 text-sm text-gray-800 dark:text-gray-200">
                                Published
                              </span>
                            </label>
                            <label
                              for="hs-as-filters-dropdown-pending"
                              class="flex py-2.5 px-3"
                            >
                              <input
                                type="checkbox"
                                class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                id="hs-as-filters-dropdown-pending"
                              />
                              <span class="ms-3 text-sm text-gray-800 dark:text-gray-200">
                                Pending
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Table  MOSTAR ALTA USUARIOS  --> */}
                {seccion === 'altauser' &&(
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Nombre/Apellidos
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Correo
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Empresa-Centro
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Role
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Telefono
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            LinkedIn
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Status
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Alta/Baja
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {usuariosResponse
                      .filter((usuario) => usuario.estado === 2)
                      .map((usuario, index) => (
                        <tr
                          key={index}
                          class="bg-white hover:bg-gray-50 dark:bg-accent-200 dark:hover:bg-slate-800"
                        >
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-3">
                                {/* <div class="inline-block h-[2.375rem] w-[2.375rem] bg-accent-100 rounded-full" src="" alt=""></div> */}
                                <div class="grow">
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {usuario.nombre}
                                  </span>
                                  <span class="block text-sm text-accent-100">
                                    {usuario.apellidos}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-4">
                                <div>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {usuario.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="h-px w-px whitespace-nowrap align-top">
                  {centroEmpresaResponse
                    .filter((centro) => usuario.idEmpresaCentro === centro.idEmpresaCentro)
                    .map((centro, index) => (
                      <td class="h-px w-72 align-top">
                        <div class="block p-6">
                          <span class="block text-sm text-accent-100">
                            {centro.nombre}
                          </span>
                        </div>
                      </td>
                    ))}
                  {centroEmpresaResponse
                    .filter((centro) => usuario.idEmpresaCentro === centro.idEmpresaCentro)
                    .length === 0 && (
                    <td class="h-px w-72 align-top">
                      <div class="block p-6">
                        <span class="block text-sm text-accent-100">
                          Ninguna
                        </span>
                      </div>
                    </td>
                  )}
                </td>
                          {rolesResponse
                            .filter((rol) => usuario.idRole === rol.idRole)
                            .map((rol, index) => (
                              <td class="h-px w-72 align-top">
                                <div class="block p-6">
                                  <span class="block text-sm text-accent-100">
                                    {rol.tipoRole}
                                  </span>
                                </div>
                              </td>
                            ))}
                          <td class="h-px w-72 align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-accent-100">
                                {usuario.telefono}
                              </span>
                            </div>
                          </td>
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <a class="block p-6" href={usuario.linkedIn}>
                              <svg
                                y="0"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                width="100"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid meet"
                                height="100"
                                class="w-8 h-8 shrink-0 dark:fill-accent-100 fill-accent-200"
                              >
                                <path d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z"></path>
                              </svg>
                            </a>
                          </td>
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              {usuario.estado === 1 ? (
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                  alta
                                </span>
                              ) : (
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                  baja
                                </span>
                              )}
                            </div>
                          </td>
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">                              
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleClick(usuario.idUsuario, 1)
                                  }
                                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                                >
                                  Activar
                                </button>                             
                              
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                )}

                {/* <!-- Table  MOSTAR ALTA CENTROS EMPRESAS  --> */}
                {seccion === 'altacentroempresa' &&(

                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            ID EMPRESA
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                           DIRECCION
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            TELEFONO
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            PERSONA CONTACTO
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            CIF
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                           Provincia
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Razon Social
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Tipo Empresa
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Alta
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                           Denegar
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {peticionCentroEmpresaResponse.map((peticion, index) => (
                        <tr
                          key={index}
                          class="bg-white hover:bg-gray-50 dark:bg-accent-200 dark:hover:bg-slate-800"
                        >
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-3">
                                {/* <div class="inline-block h-[2.375rem] w-[2.375rem] bg-accent-100 rounded-full" src="" alt=""></div> */}
                                <div class="grow">
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {peticion.idCentroEmpresa}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {centroEmpresaResponse.filter((centro) => centro.idEmpresaCentro === peticion.idCentroEmpresa).map((centro) => (
                                  <>
                                    <td key={centro.id} class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-4">
                                <div>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.direccion}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td class="h-px w-72 align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-accent-100">
                                {centro.telefono}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-accent-100">
                                {centro.personaContacto}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-accent-100">
                                {centro.cif}
                              </span>
                            </div>
                          </td>

                          <td
                            className="h-px w-72 align-top"
                            key={centro.id}
                          >
                            <div className="block p-6">
                              <span className="block text-sm text-accent-100">
                                {getProvinciaNombre(centro.idProvincia)}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-accent-100">
                                {centro.razonSocial}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-accent-100">
                                {centro.idTipoEmpresa}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-px whitespace-nowrap align-top">
                            <button
                              onClick={() =>
                                handleAlta(peticion.idCentroEmpresa,1,peticion.idPeticionCentroEmpresa)
                              }
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                            >
                              Alta
                            </button>
                          </td>
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <button
                            onClick={() =>
                              handleBaja(peticion.idPeticionCentroEmpresa)
                            }
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                            >
                              Denegar
                            </button>
                          </td>
                              
                            </>
                                ))}           
                        </tr>
                      ))}
                  </tbody>
                </table>

                
                )}

                 {/* <!-- Table  MOSTAR ALTA Tecnologias  --> */}
                 {seccion === 'altatecnologia' &&(
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Nombre
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {peticionesResponse.map((peticion, index) => (
                        <tr
                          key={index}
                          class="bg-white hover:bg-gray-50 dark:bg-accent-200 dark:hover:bg-slate-800"
                        >
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-3">
                                {/* <div class="inline-block h-[2.375rem] w-[2.375rem] bg-accent-100 rounded-full" src="" alt=""></div> */}
                                <div class="grow">
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {peticion.nombreTecnologia}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <button
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
                              onClick={handleSubmit} 
                           >
                              Activar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>             
                )}

                   {/* <!-- Table  SolicitudesAcreditacionCharlas  --> */}
                   {seccion === 'altaacreditacion' &&(
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Charla
                          </span>
                        </div>
                      </th>
                    </tr>  
                  </thead>
                  
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
  {solicitudAcreditacionResponse.map((solicitud, index) => {
    const charlaFiltrada = charlasResponse.find(charla => solicitud.idCharla === charla.idCharla);
    return (
      <tr
        key={index}
        class="bg-white hover:bg-gray-50 dark:bg-accent-200 dark:hover:bg-slate-800"
      >
        <td class="h-px w-px whitespace-nowrap align-top">
          <div class="block p-6">
            <div class="flex items-center gap-x-3">
              <div class="grow">
                <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {charlaFiltrada ? charlaFiltrada.descripcion : 'Descripción no encontrada'}
                </span>
                {usuariosResponse.filter((usuario) => usuario.idUsuario === charlaFiltrada.idTechRider).map((usuario) => (
                    <div key={usuario.idUsuario}>
                      {usuario.nombre}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </td>
        <td class="h-px w-px whitespace-nowrap align-top">
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
            onClick={() => handleAcreditar(solicitud.idCharla,solicitud.idPeticionCharla)}
          >
            Acreditar Charla
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

                </table>             
                )}
                {/* <!-- End Table --> */}

                {/* <!-- Footer --> */}
                <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <div class="inline-flex gap-x-2">
                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <svg
                          class="flex-shrink-0 w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Next
                        <svg
                          class="flex-shrink-0 w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotificacionesAdmin;
