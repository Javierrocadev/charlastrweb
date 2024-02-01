import React, { useState, useEffect, useRef } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";

// import FormRepresentante from "./formularios/FormRepresentante"
// import FormTechRiders from "./formularios/FormTechRiders";
// import FormCentros from "./formularios/FormCentro";
const AlertaExitosa = () => (
  <div className="absolute animate-bounce bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert">
    <p>Actualizado correctamente</p>
  </div>
);
const AlertaDenegada = () => (
  <div className="absolute animate-bounce bg-teal-50 border-t-2 border-red-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert">
    <p>Error</p>
  </div>
);
const HomeTechRiders = () => {

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarAlertaDenegada, setMostrarAlertaDenegada] = useState(false);
  const [nombreTecnologia, setNombreTecnologia] = useState("");

    const [usuarioResponse, setUsuarioResponse] = useState([]);
    const [provinciasResponse, setProvinciasResponse] = useState([]);
    const [empresaCentroResponse, setEmpresaCentroResponse] = useState([]);
    const [TecnologiasIdResponse, setTecnologiasIdResponse] = useState([]);
    const [TecnologiasResposne, setTecnologiasResponse] = useState([]);

    const [newPassword, setNewPassword] = useState("");
    const [newNombre, setNewNombre] = useState("");
    const [newApellidos, setNewApellidos] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newTelefono, setNewTelefono] = useState("");
    const [newLinkedin, setNewLinkedin] = useState("");
    const [newProvincia, setNewProvincia] = useState("");

    const [seccionVisible, setSeccionVisible] = useState(false); // Estado para controlar la visibilidad de la sección
   // const [seccionVisibleEmpresa, setseccionVisibleEmpresa] = useState(false);
    const [selectedTecnologia, setSelectedTecnologia] = useState(null);
   const [selectedEmpresa, setSelectedEmpresa] = useState("");
  
    const handleSubmit = async  (e) => {
console.log("funcion")


      e.preventDefault();
      const datoUsuarioAntes = usuarioResponse
      // const email = e.target.elements.email.value;
      
  //  // Otros campos del formulario
//  const nombre = e.target.elements.nombre.value;
//  const apellidos = e.target.elements.apellidos.value;
//  const linkedIn = e.target.elements.linkedIn.value;
//  const telefono = e.target.elements.telefono.value;
// const idProvincia = usuarioResponse.idProvincia;
// Campos adicionales
const idUsuario = parseInt(e.target.elements.idUsuario.value, 10);
const idRole = parseInt(e.target.elements.idRole.value, 10);
const idEmpresaCentro = parseInt(e.target.elements.idEmpresaCentro.value, 10);
const estado = parseInt(e.target.elements.estado.value, 10);
      
   const updateData = {
    "idUsuario":idUsuario,
    "nombre":newNombre,
    "apellidos":newApellidos,
    "email": newEmail,
    "telefono":newTelefono,
    "linkedIn": newLinkedin,
    "password":  newPassword, // Asegúrate de ajustar esto según tus necesidades
    "idRole":idRole,
    "idProvincia":newProvincia,
    "idEmpresaCentro":idEmpresaCentro,
    "estado":estado,
  };
  if (newPassword.trim() === "" ) {
    updateData.password = datoUsuarioAntes.password;
  }
  if (newNombre.trim() === "" ) {
    updateData.nombre = datoUsuarioAntes.nombre;
  }
  if (newApellidos.trim() === "" ) {
    updateData.apellidos = datoUsuarioAntes.apellidos;
  }
  if (newEmail.trim() === "" ) {
    updateData.email = datoUsuarioAntes.email;
  }
  if (newTelefono.trim() === "" ) {
    updateData.telefono = datoUsuarioAntes.telefono;
  }
  if (newLinkedin.trim() === "" ) {
    updateData.linkedIn = datoUsuarioAntes.linkedIn;
  }
  if (newProvincia.trim() === "" ) {
    updateData.idProvincia = datoUsuarioAntes.idProvincia;
  }
  console.log(updateData);

  
  try {
    // Llamar a la función de actualización
    const responsePut =  axiosApi.usuarios.putUsuarios(updateData);
    console.log("Actualización exitosa:", responsePut);

    if (responsePut) {
      // Mostrar la AlertaExitosa
      setMostrarAlerta(true);
    } else {
      // Mostrar la AlertaDenegada
      setMostrarAlertaDenegada(true);
    }
  } catch (error) {
    // En caso de error, también puedes mostrar la AlertaDenegada
    console.error("Error en la actualización:", error);
    setMostrarAlertaDenegada(true);
  }

    
};
const handleNombreChange = (e) => {
  setNombreTecnologia(e.target.value);
};
const handleSubmitPeticionTecnologia = (e) => {
  e.preventDefault();
  // Llamar al método en otro componente y pasar el valor del input
 axiosApi.peticionesTecnologias.PostPeticionTecnologia(nombreTecnologia);
};

const handleSubmitTecnologia = (e) => {
  e.preventDefault();
  
  // Check if a technology is selected
  if (selectedTecnologia) {
    // Llamar al método en otro componente y pasar el valor del input
    axiosApi.tecnologiasTechriders.PostTecnologiasTechRider(selectedTecnologia, usuarioResponse.idUsuario);
  } else {
    // Handle the case when no technology is selected
    console.error("Please select a technology");
  }
};
// const handleSubmitEmpresa = (e) => {
//   e.preventDefault();
  
//   // Check if a technology is selected
//   if (selectedEmpresa) {
//     // Llamar al método en otro componente y pasar el valor del input
//     axiosApi.tecnologiasTechriders.PostTecnologiasTechRider(selectedTecnologia, usuarioResponse.idUsuario);
//   } else {
//     // Handle the case when no technology is selected
//     console.error("Seleccione una empresa");
//   }
// };
    useEffect(() => {
      
      const fetchData = async () => {
        try {
          const response = await axiosApi.usuarios.getPerfilUsuario();
          console.log("perfil usuario response:", response);
          setUsuarioResponse(response);

          const responseProvincias = await axiosApi.provincias.getProvincias();
          console.log("Charlas responseProvincias:", responseProvincias);
          setProvinciasResponse(responseProvincias);

          const responseEmpresaCentro = await axiosApi.empresasCentros.getEmpresasCentros();
          console.log("Charlas responseEmpresaCentro:", responseEmpresaCentro);
          setEmpresaCentroResponse(responseEmpresaCentro);

          
          const TecnologiasIdResponse = await axiosApi.tecnologiasTechriders.getTecnologiasTechriders();
          console.log("Tecnologias responseEmpresaCentro:", TecnologiasIdResponse);
          setTecnologiasIdResponse(TecnologiasIdResponse);
          
          const TecnologiasResponse = await axiosApi.tecnologias.getTecnologias();
          console.log("Tecnologias responseEmpresaCentro:", TecnologiasResponse);
          setTecnologiasResponse(TecnologiasResponse);

        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchData();
      const timeoutId = setTimeout(() => {
        setMostrarAlerta(false);
      }, 4000);
    
      return () => {
        // Limpiar el temporizador al desmontar el componente
        clearTimeout(timeoutId);
      };
    }, [mostrarAlerta]);
 const getProvinciaNombre = (idProvincia) => {
    const provincia = provinciasResponse.find(
      (p) => p.idProvincia === idProvincia
    );
    return provincia ? provincia.nombreProvincia : "Desconocido";
  };
 const getCentroNombre = (idEmpresaCentro) => {
    const empresaCentro = empresaCentroResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro
    );
    return empresaCentro ? empresaCentro.nombre : "Sin empresa";
  };

  const getCentroDireccion = (idEmpresaCentro) => {
    const empresaCentro = empresaCentroResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro
    );
    return empresaCentro ? empresaCentro.direccion : "No Encontrada";
  };

  const getCentroTelefono = (idEmpresaCentro) => {
    const empresaCentro = empresaCentroResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro
    );
    return empresaCentro ? empresaCentro.telefono : "Sin Telefono";
  };

  const getCentroPersonaContacto = (idEmpresaCentro) => {
    const empresaCentro = empresaCentroResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro
    );
    return empresaCentro ? empresaCentro.personaContacto : "Sin Persona de contacto";
  };

  const getCentroCif = (idEmpresaCentro) => {
    const empresaCentro = empresaCentroResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro
    );
    return empresaCentro ? empresaCentro.cif : "Sin Cif";
  };

  const getCentroRazonSocial = (idEmpresaCentro) => {
    const empresaCentro = empresaCentroResponse.find(
      (p) => p.idEmpresaCentro === idEmpresaCentro
    );
    return empresaCentro ? empresaCentro.razonSocial : "Sin Razon Social";
  };

  const [seccion, setSeccion] = useState('perfiltechrider');
  
  const cargarVisible = () => { 
    setSeccionVisible(true);
  };
  // const cargarVisibleEmpresa = () => { 
  //   setseccionVisibleEmpresa(true);
  // };
  const cargarDatos = (seccion) => {
    setSeccion(seccion); 
    setSeccionVisible(false);
  };
  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100">
        {usuarioResponse && (
  <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-accent-200">
    <div class="mb-8">
    <button
     type="button"
     class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
     onClick={() => cargarDatos('perfiltechrider')}
       >
      Perfil Tech Riders
      </button>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Tus datos
      </p>
      <div>
      <button
     type="button"
     class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
     onClick={() => cargarDatos('perfilempresa')}
       >
      Perfil Empresa
      </button>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Datos de tu empresa
      </p>
      </div>
     
    </div>
 
 {/* Form Perfil */}
    {seccion === 'perfiltechrider' &&(
   <form >
    <input
                  type="hidden"
                  name="idUsuario"
                  value={usuarioResponse.idUsuario}
                />
                <input
                  type="hidden"
                  name="idRole"
                  value={usuarioResponse.idRole}
                />
                <input
                  type="hidden"
                  name="idEmpresaCentro"
                  value={usuarioResponse.idEmpresaCentro}
                />
                <input
                  type="hidden"
                  name="estado"
                  value={usuarioResponse.estado}
                />
      <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
  
  
        <div class="sm:col-span-3">
          <label for="af-account-full-name" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Nombre completo
          </label>
          <div class="hs-tooltip inline-block">
            <button type="button" class="hs-tooltip-toggle ms-1">
              <svg class="inline-block w-3 h-3 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </button>
            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-accent-100 text-xs font-medium text-white rounded shadow-sm dark:bg-slate-700" role="tooltip">
              Nombre y Apellidos
            </span>
          </div>
        </div>
  
        <div class="sm:col-span-9">
          <div class="sm:flex">
            <input id="af-account-full-name" type="text" class="py-3 px-4 sm:mb-0 mb-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "onChange={(e) => setNewNombre(e.target.value)} placeholder={usuarioResponse.nombre}/>
            <input type="text" class="py-3 px-4  block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " onChange={(e) => setNewApellidos(e.target.value)} placeholder={usuarioResponse.apellidos}/>
          </div>
        </div>
  
        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Email
          </label>
        </div>
  
        <div class="sm:col-span-9">
          <input id="af-account-email" type="email" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " onChange={(e) => setNewEmail(e.target.value)}   placeholder={usuarioResponse.email}/>
        </div>
        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            LinkedIn
          </label>
        </div>
  
        <div class="sm:col-span-9">
          <input  type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "  onChange={(e) => setNewLinkedin(e.target.value)} placeholder={usuarioResponse.linkedIn} />
        </div>
  
        <div class="sm:col-span-3">
          <label for="af-account-password" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Empresa
          </label>
        </div>
  
        <div class="sm:col-span-9">
          <div class="space-y-2">
            <input    type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "  placeholder={getCentroNombre(usuarioResponse.idEmpresaCentro)} disabled/>
          </div>
          {/* <button onClick={() => cargarVisibleEmpresa()} type="button" class="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
          Añadir Empresa
        </button>

        {seccionVisibleEmpresa &&(
        <form>
        <select onChange={(e) => setSelectedEmpresa(e.target.value)} class="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0  text-sm relative focus:z-10  focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 ">
             
                {empresaCentroResponse.map((empresa) => (
                <option key={empresa.idEmpresaCentro} value={empresa.idEmpresaCentro} >
                {empresa.nombre}
              </option>
              ))}
            </select>
          <button onClick={handleSubmitEmpresa} type="button" class="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
          Añadir
        </button>
        </form>
        )} */}
        </div>

        <div class="sm:col-span-3">
          <label for="af-account-password" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Password
          </label>
        </div>
  
        <div class="sm:col-span-9">
          <div class="space-y-2">

            <input   onChange={(e) => setNewPassword(e.target.value)} type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " placeholder={usuarioResponse.password}/>
          </div>
        </div>
  
        <div class="sm:col-span-3">
          <div class="inline-block">
            <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
              Telefono
            </label>
            
          </div>
        </div>

        <div class="sm:col-span-9">
          <div class="sm:flex gap-2">
            <input id="af-account-phone" type="text" class="py-3 mr-4 sm:mb-0 mb-4 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " onChange={(e) => setNewTelefono(e.target.value)} placeholder={usuarioResponse.telefono}/>
            <select onChange={(e) => setNewProvincia(e.target.value)} class="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0  text-sm relative focus:z-10  focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 ">
             
                {provinciasResponse.map((provincia) => (
                <option key={provincia.idProvincia} value={provincia.idProvincia}  selected={provincia.idProvincia === usuarioResponse.idProvincia}>
                {getProvinciaNombre(provincia.idProvincia)}
              </option>
              ))}
            </select>
          </div>
  
         
        </div>

        <div class="sm:col-span-3">
          <div class="inline-block">
            <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
             Mis tecnologias
            </label>
            
          </div>
        </div>
            
            <div class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
      {TecnologiasIdResponse.filter((tecnologiaid) => usuarioResponse.idUsuario === tecnologiaid.idUsuario)
        .map((tecnologiaid) => {
          return TecnologiasResposne.filter((tecnologia) => tecnologia.idTecnologia === tecnologiaid.idTecnologia)
            .map((tecnologia) => tecnologia.nombreTecnologia);
        })
        .join(", ")}

   <button onClick={() => cargarVisible()} type="button" class="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
          Añadir Tecnologia
        </button>
    </div>

 {/*  
        <div class="sm:col-span-3">
          <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            BIO
          </label>
        </div>
       
  
        <div class="sm:col-span-9">
          <textarea id="af-account-bio" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows="6" placeholder="Type your message..."></textarea>
        </div> */}
      
      </div>
  
      <div class="mt-5 flex justify-end gap-x-2">
        <button onSubmit={handleSubmit} type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
          Guardar cambios
        </button>
      </div>
    </form>
    )}
 
    {/* Form Datos de mi empresa */}
    {seccion === 'perfilempresa' &&  (
         <form >
        <input
                      type="hidden"
                      name="idUsuario"
                      value={usuarioResponse.idUsuario}
                    />
                    <input
                      type="hidden"
                      name="idRole"
                      value={usuarioResponse.idRole}
                    />
                    <input
                      type="hidden"
                      name="idEmpresaCentro"
                      value={usuarioResponse.idEmpresaCentro}
                    />
                    <input
                      type="hidden"
                      name="estado"
                      value={usuarioResponse.estado}
                    />
          <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div class="sm:col-span-3">
              <label for="af-account-password" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Nombre
              </label>
            </div>
      
            <div class="sm:col-span-9">
              <div class="space-y-2">
                <input    type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 "  placeholder={getCentroNombre(usuarioResponse.idEmpresaCentro)} disabled/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="af-account-password" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Direccion
              </label>
            </div>
            
            
            <div class="sm:col-span-9">
              <div class="space-y-2">
                <p  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " >{getCentroDireccion(usuarioResponse.idEmpresaCentro)}</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <div class="inline-block">
                <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
                  Telefono
                </label>     
              </div>
            </div>

            <div class="sm:col-span-9">
              <div class="space-y-2">
                <p  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " >{getCentroTelefono(usuarioResponse.idEmpresaCentro)}</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <div class="inline-block">
                <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
                 Persona de Contacto
                </label>
              </div>
            </div>

            <div class="sm:col-span-9">
              <div class="space-y-2">
              <p  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " >{getCentroPersonaContacto(usuarioResponse.idEmpresaCentro)}</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <div class="inline-block">
                <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
                  Provincia
                </label>         
              </div>
            </div>

                        <div class="sm:col-span-9">
              <div  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 ">
                {provinciasResponse.filter((provincia) => provincia.idProvincia === usuarioResponse.idProvincia).map((provincia) => (
                <span key={provincia.idProvincia}>
                  {getProvinciaNombre(provincia.idProvincia)}
                </span>
                ))}
              </div>   
            </div>


            <div class="sm:col-span-3">
              <div class="inline-block">
                <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
              Cif
                </label>
              </div>
            </div>
          
            <div class="sm:col-span-9">
              <div class="space-y-2">
                <input  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " placeholder={getCentroCif(usuarioResponse.idEmpresaCentro)}/>
              </div>
            </div>

            <div class="sm:col-span-3">
              <div class="inline-block">
                <label for="af-account-phone" class="inline-block text-sm  text-gray-800 mt-2.5 dark:text-gray-200">
             Razon Socil
                </label>
              </div>
            </div>
            
            <div class="sm:col-span-9">
              <div class="space-y-2">
              <p  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 " >{getCentroRazonSocial(usuarioResponse.idEmpresaCentro)}</p>
              </div>
            </div>
    {/*  
            <div class="sm:col-span-3">
              <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                BIO
              </label>
            </div>
          
      
            <div class="sm:col-span-9">
              <textarea id="af-account-bio" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows="6" placeholder="Type your message..."></textarea>
            </div> */}
          
          </div>
        </form> 
    )}
    {/* Form Añadir Tecnologia   SOLO MOSTRAR AL DAR AL BOTON AÑADIR TECNOLOGIA*/}
    {seccionVisible &&(
    <form>
   
      <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">


        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
          Selecciona una Tecnologia
          </label>
        </div>
       
        <div className="sm:col-span-3">
        <select onChange={(e) => setSelectedTecnologia(e.target.value)} className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px rounded sm:mt-0 sm:first:ms-0 text-sm relative focus:z-10 focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2 ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400">
          {TecnologiasResposne.filter((tecnologia) => {
            // Filtro para no añadir la tecnologia que ya tiene 
            const hasTechnology = TecnologiasIdResponse.some((techId) => techId.idTecnologia === tecnologia.idTecnologia);
            return !hasTechnology;
          }).map((tecnologia) => (
            <option key={tecnologia.idTecnologia} value={tecnologia.idTecnologia}>
              {tecnologia.nombreTecnologia}
            </option>
          ))}
        </select>
      </div>

        <div class="sm:col-span-3">
        <button  onClick={handleSubmitTecnologia} type="submit" class="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
          Añadir Tecnologia
        </button>
        </div>
         
         <div></div>
         
        <div class="sm:col-span-3">
          <label for="af-account-password" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            Solicita una nueva Tecnologia
          </label>
        </div>
  
        <div class="sm:col-span-3">
          <input
              type="text"
              className="form-control"
              id="nombre"
              style={{ margin: "30px", border: "1px solid black" }}
              value={nombreTecnologia}
              onChange={handleNombreChange}/>  
        </div>

        <div></div>
        <button onClick={handleSubmitPeticionTecnologia} type="submit" class="mt-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200">
          Solicitar Tecnologia
        </button>

 {/*  
        <div class="sm:col-span-3">
          <label for="af-account-bio" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
            BIO
          </label>
        </div>
       
  
        <div class="sm:col-span-9">
          <textarea id="af-account-bio" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows="6" placeholder="Type your message..."></textarea>
        </div> */}
      
      </div>
    </form>
    )}
  </div>
  
  </div> 
       )}
 
 


 {mostrarAlerta && <AlertaExitosa />}
 {mostrarAlertaDenegada && <AlertaDenegada />}

    </main>
  );
};

export default HomeTechRiders;