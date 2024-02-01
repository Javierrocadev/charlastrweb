import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";

const VerEmpresasCentroAdmin = () => {
    const [formulario, setFormulario] = useState(null);

    const handleFormularioClick = (tipoUsuario) => {
      setFormulario(tipoUsuario);
    };


  const [charlasResponse, setCharlasResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [cursosResponse, setCursosResponse] = useState([]);
  const [tecnologiasResponse, setTecnologiasResponse] = useState([]);
  const [tecnologiasCharlasResponse, setTecnologiasCharlasResponse] = useState([]);
  const [centroEmpresaResponse, setEmpresasCentrosResponse] = useState([]);
  const [usuariosResponse, SetUsuariosResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nombreCurso, setNombreCurso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idCentroCurso, setIdCentroCurso] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState(null);


    const [seccionesVisibles, setSeccionesVisibles] = useState([]);
  
    const cargarVisible = (idCentro) => {
    
      if (seccionesVisibles.includes(idCentro)) {

        setSeccionesVisibles(seccionesVisibles.filter((id) => id !== idCentro));

      } else {
        setSeccionesVisibles([...seccionesVisibles, idCentro]);
        setSeccionesVisiblesEliminar(seccionesVisiblesEliminar.filter((id) => id !== idCentro));

      }
    };
  
    const [seccionesVisiblesEliminar, setSeccionesVisiblesEliminar] = useState([]);
  
    const cargarVisibleEliminar = (idCentro) => {
      
      if (seccionesVisiblesEliminar.includes(idCentro)) {

        setSeccionesVisiblesEliminar(seccionesVisiblesEliminar.filter((id) => id !== idCentro));

      } else {
        setSeccionesVisiblesEliminar([...seccionesVisiblesEliminar, idCentro]);
        setSeccionesVisibles(seccionesVisibles.filter((id) => id !== idCentro));

      }
    };
    
  const handleNombreChange = (e) => {
    setNombreCurso(e.target.value);
  };
  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };
  const handleSubmitCurso = (e) => {
    e.preventDefault();
    // Llamar al método en otro componente y pasar el valor del input
    console.log(idCentroCurso,nombreCurso,descripcion)
   axiosApi.cursos.postCurso(idCentroCurso,nombreCurso,descripcion);
  };

  const handleEliminarCurso = async (e) => {
    e.preventDefault();
    try {
      if (selectedCurso) {
        await axiosApi.cursos.eliminarCurso(selectedCurso);
      console.log('Curso eliminado con éxito');
       await axiosApi.centros.getCursos();
      // Puedes realizar alguna acción adicional después de eliminar la charla
      } else {
        // Handle the case when no technology is selected
        console.error("Please select a technology");
      }
   
    } catch (error) {
      console.error('Error al intentar eliminar la charla:', error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  };
  useEffect(() => {
    const fetchData = async () => {
        try {
            const centroEmpresaResponse = await axiosApi.empresasCentros.getEmpresasCentros();
            setEmpresasCentrosResponse(centroEmpresaResponse);
            console.log("empresas:", centroEmpresaResponse);
            console.log(centroEmpresaResponse)

            const responseUsuarios = await axiosApi.usuarios.getUsuarios();
            console.log("Users:", responseUsuarios);
            SetUsuariosResponse(responseUsuarios);

            const cursosResponse = await axiosApi.centros.getCursos();
            console.log("Cursos:", cursosResponse);
            setCursosResponse(cursosResponse);

            const responseProvincias = await axiosApi.provincias.getProvincias();
            console.log("Charlas responseProvincias:", responseProvincias);
            setProvinciasResponse(responseProvincias);
          
            setLoading(false);
          } catch (error) {
            console.error("Error:", error);
            // Manejar errores y marcar la carga como completa incluso si hay errores
            setLoading(false);
          }
       
    };

    fetchData();
  }, []);
  const getRepresentantesEmpresas = (idEmpresaCentro) => {
    const nombreRepresentante = usuariosResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro && p.idEmpresaCentro ===4
    );
    return nombreRepresentante ? nombreRepresentante.nombre : "Desconocido";
  };

  const getProvinciaNombre = (idProvincia) => {
    const provincia = provinciasResponse.find(
      (p) => p.idProvincia === idProvincia
    );
    return provincia ? provincia.nombreProvincia : "Desconocido";
  };
  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100">
       <section class="text-gray-600 body-font mt-6">
       <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-accent-200 dark:border-gray-700">
          {/* <!-- Header --> */}
          <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
            {/* <!-- Input --> */}
            <div class="sm:col-span-1">
              <label for="hs-as-table-product-review-search" class="sr-only">Search</label>
              <div class="relative">
                <input type="text" id="hs-as-table-product-review-search" name="hs-as-table-product-review-search" class="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Search"/>
                <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                  <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* <!-- End Input --> */}

            <div class="sm:col-span-2 md:grow">
              <div class="flex justify-end gap-x-2">
             

                <div class="hs-dropdown relative inline-block [--placement:bottom-right]" data-hs-dropdown-auto-close="inside">
                  <button id="hs-as-table-table-filter-dropdown" type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
                    Filter
                    <span class="ps-2 text-xs font-semibold text-blue-600 border-s border-gray-200 dark:border-gray-700 dark:text-blue-500">
                      1
                    </span>
                  </button>
                  <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[12rem] z-10 bg-white shadow-md rounded-lg mt-2 dark:divide-gray-700 dark:bg-accent-200 dark:border dark:border-gray-700" aria-labelledby="hs-as-table-table-filter-dropdown">
                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                      <label for="hs-as-filters-dropdown-all" class="flex py-2.5 px-3">
                        <input type="checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-as-filters-dropdown-all" checked/>
                        <span class="ms-3 text-sm text-gray-800 dark:text-gray-200">All</span>
                      </label>
                      <label for="hs-as-filters-dropdown-published" class="flex py-2.5 px-3">
                        <input type="checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-as-filters-dropdown-published"/>
                        <span class="ms-3 text-sm text-gray-800 dark:text-gray-200">Published</span>
                      </label>
                      <label for="hs-as-filters-dropdown-pending" class="flex py-2.5 px-3">
                        <input type="checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-as-filters-dropdown-pending"/>
                        <span class="ms-3 text-sm text-gray-800 dark:text-gray-200">Pending</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Header --> */}

          {/* <!-- Table --> */}
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-slate-800">
              <tr>
                

                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                      Datos
                    </span>
                  </div>
                </th>


                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                   Tipo
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                   Cursos
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                   Desactivar/Activar
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
               Eliminar
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
               Crear Curso
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
               Eliminar Curso
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
               Creando Curso
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
               Eliminando Curso
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              {centroEmpresaResponse.map((centro, index)=>(
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
                                    {centro.nombre}
                                  </span>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.direccion}
                                  </span>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.telefono}
                                  </span>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.personaContacto}
                                  </span>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.cif}
                                  </span>
                                  <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {centro.razonSocial}
                                  </span>
                                  <span className="block text-sm text-accent-100">
                                {getProvinciaNombre(centro.idProvincia)}
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
                                  {centro.idTipoEmpresa ===2 ?(
                          <span class="block text-sm text-accent-100">Centro</span>
                        ):(
                          <span class="block text-sm text-accent-100">Empresa</span>
                        )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td class="h-px w-px whitespace-nowrap align-top">
                            <div class="block p-6">
                              <div class="flex items-center gap-x-4 text-black">
                                {centro.idTipoEmpresa === 2 && (
                                  <div>
                                    {cursosResponse
                                      .filter((curso) => centro.idTipoEmpresa === 2 && centro.idEmpresaCentro === curso.idCentro)
                                      .map((curso, index) => (
                                        <div key={index}>
                                          {curso.nombreCurso}
                                        </div>
                                      ))}
                                    {cursosResponse.filter((curso) => centro.idTipoEmpresa === 2 && centro.idEmpresaCentro === curso.idCentro).length === 0 && (
                                      <div>
                                        Sin cursos
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td class="h-px w-px whitespace-nowrap align-top">                         
                            <div>
                        {centro.estadoEmpresa === 1 ? (
                    <button
            type="button"
            onClick={() =>axiosApi.empresasCentros.updateEstadoCentroEmpresa(centro.idEmpresaCentro,0)}
            class="py-2 mt-3 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
          >
            Desactivar
          </button>
            ) : (
                <button
                type="button"
                onClick={() =>axiosApi.empresasCentros.updateEstadoCentroEmpresa(centro.idEmpresaCentro,1)}
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              >
                Activar
              </button>
            )}                                                        
                            </div>
                          </td>
                          <td class="h-px w-px whitespace-nowrap align-top">                         
                          <button
                type="button"
                 onClick={() =>axiosApi.empresasCentros.eliminarEmpresaCentro(centro.idEmpresaCentro)}
                class="py-2 mt-3 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
                Eliminar
              </button>

                          </td>

                          <td class="h-px w-px whitespace-nowrap align-top">                         
                          <button
                type="button"
                onClick={() => {
                  cargarVisible(centro.idEmpresaCentro);
                  setIdCentroCurso(centro.idEmpresaCentro);
                }}
                class="py-2 mt-3 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-red-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none "
              >
                Crear Curso
              </button>
                          </td>

                          
                          <tr class="h-px w-px whitespace-nowrap align-top">                         
                          <button
                type="button"
                onClick={() => cargarVisibleEliminar(centro.idEmpresaCentro)}
                class="py-2 mt-3 ml-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
               Eliminar Curso
              </button>
                
              </tr>  
                <td className="flex-inline ">
                  {/* Crear Curso */}
                  {seccionesVisibles.includes(centro.idEmpresaCentro) && centro.idTipoEmpresa === 2 && (
                    <form>
          
                    <div class=" flex flex-col bg-primary-100 rounded m-1 p-1">
              
              
                      <div class="">
                        <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 ">
                      Nombre del Curso
                        </label>
                      </div>

                      <div class="">
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            style={{ margin: "30px", border: "1px solid black" }}
                            value={nombreCurso}
                            onChange={handleNombreChange}/>  
                      </div>

                      <div class="sm:col-span-3">
                        <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 ">
                    Descripcion Del Curso
                        </label>
                      </div>
                    
                      <div class="sm:col-span-3">
                        <input
                            type="text"
                            className="form-control"
                            id="desc"
                            style={{ margin: "30px", border: "1px solid black" }}
                            value={descripcion}
                            onChange={handleDescripcionChange}/>  
                      </div>
              
                      <div class="sm:col-span-3">
                      <button  onClick={handleSubmitCurso} type="submit" class="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
                        Añadir Curso
                      </button>
                      </div> 
                    </div>
                  </form>
                )}  
                </td>
                                
<div>
  {/* Eliminar Curso */}   
                     {seccionesVisiblesEliminar.includes(centro.idEmpresaCentro) && centro.idTipoEmpresa === 2 && (
                     <form>
                        <div>
                        <h1>Selecciona un curso</h1>
                        <select onChange={(e) => setSelectedCurso(e.target.value)} class="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0  text-sm relative focus:z-10  focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 ">
                        {cursosResponse
                              .filter((curso) => centro.idTipoEmpresa === 2 && centro.idEmpresaCentro === curso.idCentro)
                              .map((curso) => (                
                                  <option key={curso.idCurso} value={curso.idCurso}>
                                    {curso.nombreCurso}
                                    </option> 
                                       
                              )  
                              )}
    
                         </select>
                <button
                type="button"
               onClick={handleEliminarCurso}
                class="py-2 mt-3 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
               Eliminar 
              </button>
                        </div>
                      </form>  
                        )}        
</div>
                     
                          
              </tr>    
            ))}

            </tbody>

          </table>
          {/* <!-- End Table --> */}

       
          {/* <!-- Footer --> */}
          <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
            

            <div>
              <div class="inline-flex gap-x-2">
                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Prev
                </button>

                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Next
                  <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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

export default VerEmpresasCentroAdmin;
