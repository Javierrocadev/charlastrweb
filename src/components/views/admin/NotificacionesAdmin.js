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
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState(
    []
  );
  const [centroEmpresaResponse, setEmpresasCentrosResponse] = useState([]);
  const [usuariosResponse, SetUsuariosResponse] = useState([]);
  const [rolesResponse, SetRolesResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = async (idusuario, idestado) => {
    const responseUpdateUser = axiosApi.usuarios.updateEstadoUsuario(
      idusuario,
      idestado
    );
    console.log("Algo: ", responseUpdateUser);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsuarios = await axiosApi.usuarios.getUsuarios();
        console.log("Users:", responseUsuarios);
        SetUsuariosResponse(responseUsuarios);

        const centroEmpresaResponse =
          await axiosApi.empresasCentros.getEmpresasCentros();
        console.log("Centros:", centroEmpresaResponse);
        setEmpresasCentrosResponse(centroEmpresaResponse);

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

  const [seccion, setSeccion] = useState('altauser'); // Estado para controlar la sección

    const cargarDatos = (seccion) => {
      setSeccion(seccion); // Actualiza el estado con la nueva sección
    };
  return (
    <main>
      <section class="text-gray-600 body-font mt-6">
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
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
                        class="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                    onClick={() => cargarDatos('altauser')}
                  >
                    Alta Usuarios
                  </button>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                    onClick={() => cargarDatos('altacentroempresa')}
                  >
                    Alta centro-empresa
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
                          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                          class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[12rem] z-10 bg-white shadow-md rounded-lg mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700"
                          aria-labelledby="hs-as-table-table-filter-dropdown"
                        >
                          <div class="divide-y divide-gray-200 dark:divide-gray-700">
                            <label
                              for="hs-as-filters-dropdown-all"
                              class="flex py-2.5 px-3"
                            >
                              <input
                                type="checkbox"
                                class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
                                class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
                                class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
                          class="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                        >
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-3">
                                {/* <div class="inline-block h-[2.375rem] w-[2.375rem] bg-accent-100 rounded-full" src="" alt=""></div> */}
                                <div class="grow">
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {usuario.nombre}
                                  </span>
                                  <span class="block text-sm text-gray-500">
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
                              <td class="h-px w-72 max-w-[2rem] align-top">
                                <div class="block p-6">
                                
                                      <span class="block text-sm text-gray-500">
                                        {centro.nombre}
                                      </span>
                                   
                                     
                                </div>
                              </td>
                            ))}
                          </td>
                          {rolesResponse
                            .filter((rol) => usuario.idRole === rol.idRole)
                            .map((rol, index) => (
                              <td class="h-px w-72 max-w-[2rem] align-top">
                                <div class="block p-6">
                                  <span class="block text-sm text-gray-500">
                                    {rol.tipoRole}
                                  </span>
                                </div>
                              </td>
                            ))}
                          <td class="h-px w-72 max-w-[2rem] align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-gray-500">
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
                                class="w-8 h-8 shrink-0 fill-accent-200"
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
                                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
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
                            Nombre
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Direccion
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
                            PersonaContacto
                          </span>
                        </div>
                      </th>

                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Cif
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
                            Tipo Empresa - Centro o empresa
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
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {centroEmpresaResponse
                      .filter((centro) => centro.estadoEmpresa === 0)
                      .map((centro, index) => (
                        <tr
                          key={index}
                          class="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                        >
                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-3">
                                {/* <div class="inline-block h-[2.375rem] w-[2.375rem] bg-accent-100 rounded-full" src="" alt=""></div> */}
                                <div class="grow">
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.nombre}
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
                                    {centro.direccion}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td class="h-px w-72 max-w-[2rem] align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-gray-500">
                                {centro.telefono}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 max-w-[2rem] align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-gray-500">
                                {centro.personaContacto}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 max-w-[2rem] align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-gray-500">
                                {centro.cif}
                              </span>
                            </div>
                          </td>

                          <td
                            className="h-px w-72 max-w-[2rem] align-top"
                            key={centro.id}
                          >
                            <div className="block p-6">
                              <span className="block text-sm text-gray-500">
                                {getProvinciaNombre(centro.idProvincia)}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 max-w-[2rem] align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-gray-500">
                                {centro.razonSocial}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-72 max-w-[2rem] align-top">
                            <div class="block p-6">
                              <span class="block text-sm text-gray-500">
                                {centro.idTipoEmpresa}
                              </span>
                            </div>
                          </td>

                          <td class="h-px w-px whitespace-nowrap align-top">
                            <button
                              type="button"
                              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                            >
                              Alta
                            </button>
                          </td>
                        </tr>
                      ))}
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
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
