import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import logoTr from "../../assets/images/LogoTechRiders.png";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Navigate to login page if user is not authenticated
    return (
      <nav>
        <ul>
          <li>
            <Link to={"/"}>home</Link>
          </li>
          <li>
            <Link to={"/pag1"}>pag1</Link>
          </li>
          <li>
            <Link to={"/pag2"}>pagddd2</Link>
          </li>
          <li>
            <Link to={"/pag3"}>pagddd3</Link>
          </li>
          <li>
            <Link to={"/pag4"}>pag4</Link>
          </li>
          <li>
            <Link to={"/pag5"}>pag5</Link>
          </li>
          <li>
            <Link to={"/login"}>login</Link>
          </li>
        </ul>
      </nav>
    );
  }
  if (role === 1) {
    // Navigate to login page if user is not authenticated
    return (
      <nav>
        <ul>
          <li>
            <Link to={"/"}>home</Link>
          </li>
          <li>
            <Link to={"/pag1"}>pag1</Link>
          </li>
          <li>
            <Link to={"/pag2"}>pagdddddddddd2</Link>
          </li>
          <li>
            <Link to={"/pag3"}>pag3</Link>
          </li>
          <button onClick={logout}>Logout</button>
        </ul>
      </nav>
    );
  }

  return (
    <header class="flex flex-wrap border-b custom:justify-start custom:flex-nowrap w-full bg-bg-100 text-text-200 py-4 dark:bg-bg-200">
      <nav
        class="max-w-screen-xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between "
        aria-label="Global"
      >
        <Link class="custom:order-1 flex-none text-xl font-semibold dark:text-text-100">
          <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
        </Link>
        <div class="custom:order-3 flex items-center gap-x-2">
          <Link
            to={"/login"}
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Inicar Sesión
          </Link>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Registrarse
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
              to={"/"}
            >
              Charlas
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Empresas
            </Link>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
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
              to={"/"}
            >
              ¿Quiénes somos?
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
