import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import logoTr from "../../assets/images/LogoTechRiders.png";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  if (isAuthenticated === false) {
    // Navigate to login page if user is not authenticated
    return (
      <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
        <nav
          class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
          aria-label="Global"
        >
          <Link
            to={"/"}
            class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100"
          >
            <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
          </Link>
          <div class="custom:order-3 flex items-center gap-x-2">
            <Link
              to={"/login"}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Iniciar Sesión
            </Link>
            <Link
              to={"/registro"}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Registrarse
            </Link>
            <button
              type="button"
              class="duration-300 custom:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div
            id="navbar-alignment"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow custom:grow-0 custom:basis-auto custom:block custom:order-2"
          >
            <div class="flex flex-col gap-5 mt-5 custom:flex-row custom:items-center custom:mt-0 custom:ps-5">
              {/* <Link class="font-medium text-primary-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200" href="#" aria-current="page">Charlas</Link> */}
              <Link
                class="font-medium hover:text-accent-200 text-accent-200 underline underline-offset-4  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/"}
              >
                Charlas
              </Link>

              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/quienessomos"}
              >
                ¿Quiénes somos?
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/calendario"}
              >
                Calendario
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  if (role === 1) {
    // Navigate to login page if user is not authenticated
    return (
      <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
        <nav
          class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
          aria-label="Global"
        >
          <Link
            to={"/"}
            class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100"
          >
            <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
          </Link>
          <div class="custom:order-3 flex items-center gap-x-2">
            <button
              type="button"
              onClick={logout}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Cerrar Sesión
            </button>
            <button
              type="button"
              class="duration-300 custom:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div
            id="navbar-alignment"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow custom:grow-0 custom:basis-auto custom:block custom:order-2"
          >
            <div class="flex flex-col gap-5 mt-5 custom:flex-row custom:items-center custom:mt-0 custom:ps-5">
              {/* <Link class="font-medium text-primary-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200" href="#" aria-current="page">Charlas</Link> */}
              <Link
                class="font-medium hover:text-accent-200 text-accent-200 underline underline-offset-4  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/admin"}
              >
               Perfil
              </Link>
              {/* <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/ejemplo"}
            >
              ejemplo
            </Link> */}
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/vertr"}
            >
              Tech Riders
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/notificacionesadmin"}
            >
              Notificaciones Alta
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/verempresascentro"}
            >
              Empresas-Centros
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/vercharlas"}
            >
            Ver Charlas
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/vistaprofesores"}
            >
              Profesores
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/añadirtecnologia"}
            >
              Añadir Tecnologia
            </Link>
          </div>
        </div>
      </nav>
    </header>
    );
  }
  if (role === 2) {
    // Navigate to login page if user is not authenticated
    return (
      <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
        <nav
          class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
          aria-label="Global"
        >
          <Link
            to={"/"}
            class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100"
          >
            <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
          </Link>
          <div class="custom:order-3 flex items-center gap-x-2">
            <button
              type="button"
              onClick={logout}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Cerrar Sesión
            </button>
            <button
              type="button"
              class="duration-300 custom:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div
            id="navbar-alignment"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow custom:grow-0 custom:basis-auto custom:block custom:order-2"
          >
            <div class="flex flex-col gap-5 mt-5 custom:flex-row custom:items-center custom:mt-0 custom:ps-5">
              {/* <Link class="font-medium text-primary-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200" href="#" aria-current="page">Charlas</Link> */}
              <Link
                class="font-medium hover:text-accent-200 text-accent-200 underline underline-offset-4  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/profesor"}
              >
                Inicio
              </Link>

              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/vercharlasocentro"}
              >
                charlas
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/vercursocentro"}
              >
                cursos
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/verprofesorescentro"}
              >
                profesores
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/inscripcioncentro"}
              >
                inscribir centro
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/propuestatecnologias"}
              >
                Propuestas
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/perfilcentro"}
              >
                Perfil
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  if (role === 4) {
    return (
      <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
        <nav
          class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
          aria-label="Global"
        >
          <Link
            to={"/"}
            class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100"
          >
            <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
          </Link>
          <div class="custom:order-3 flex items-center gap-x-2">
            <button
              type="button"
              onClick={logout}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Cerrar Sesión
            </button>
            <button
              type="button"
              class="duration-300 custom:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div
            id="navbar-alignment"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow custom:grow-0 custom:basis-auto custom:block custom:order-2"
          >
            <div class="flex flex-col gap-5 mt-5 custom:flex-row custom:items-center custom:mt-0 custom:ps-5">
              {/* <Link class="font-medium text-primary-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200" href="#" aria-current="page">Charlas</Link> */}
              <Link
                class="font-medium hover:text-accent-200 text-accent-200 underline underline-offset-4  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/empresa"}
              >
                Inicio
              </Link>

              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/vercharlasoempresa"}
              >
                charlas
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/vistatrempresa"}
              >
                Tech riders
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/inscripcionempresa"}
              >
                inscribir empresa
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/propuestatecnologias"}
              >
                Propuestas
              </Link>
              <Link
                class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
                to={"/perfilempresa"}
              >
                Perfil
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  if (role === 3) {
    // Navigate to login page if user is not authenticated
    return (
      <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
      <nav
        class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
        aria-label="Global"
      >
       <Link
            to={"/"}
            class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100"
          >
            <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
          </Link>
        <div class="custom:order-3 flex items-center gap-x-2">
          
          <button
            type="button"
            onClick={logout}
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Cerrar Sesión
          </button>
          <button
            type="button"
            class="duration-300 custom:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            data-hs-collapse="#navbar-alignment"
            aria-controls="navbar-alignment"
            aria-label="Toggle navigation"
          >
            <svg
              class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div
          id="navbar-alignment"
          class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow custom:grow-0 custom:basis-auto custom:block custom:order-2"
        >
          <div class="flex flex-col gap-5 mt-5 custom:flex-row custom:items-center custom:mt-0 custom:ps-5">
            {/* <Link class="font-medium text-primary-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200" href="#" aria-current="page">Charlas</Link> */}
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/charlastechrider"}
            >
              Mis Charlas
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/verempresascentro"}
            >
              Empresas-Centros
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/vercharlas"}
            >
            Ver Charlas
            </Link>
          </div>
        </div>
      </nav>
    </header>
    );
  }
  return (
    <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
      <nav
        class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
        aria-label="Global"
      >
        <Link
          to={"/"}
          class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100"
        >
          <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
        </Link>
        <div class="custom:order-3 flex items-center gap-x-2">
          <Link
            to={"/login"}
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Iniciar Sesión
          </Link>
          <Link
            to={"/registro"}
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Registrarse
          </Link>
          <button
            type="button"
            class="duration-300 custom:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            data-hs-collapse="#navbar-alignment"
            aria-controls="navbar-alignment"
            aria-label="Toggle navigation"
          >
            <svg
              class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div
          id="navbar-alignment"
          class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow custom:grow-0 custom:basis-auto custom:block custom:order-2"
        >
          <div class="flex flex-col gap-5 mt-5 custom:flex-row custom:items-center custom:mt-0 custom:ps-5">
            {/* <Link class="font-medium text-primary-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200" href="#" aria-current="page">Charlas</Link> */}
            <Link
              class="font-medium hover:text-accent-200 text-accent-200 underline underline-offset-4  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Charlas
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/empresas"}
            >
              Empresas
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/centros"}
            >
              Centros
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Tech Riders
            </Link>

            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/quienessomos"}
            >
              ¿Quiénes somos?
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/calendario"}
            >
              Calendario
            </Link>
            <button
              type="button"
              onClick={logout}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
