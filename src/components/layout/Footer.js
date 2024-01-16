import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logoTr from "../../assets/images/LogoTechRiders.png"
const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScroll(scrollTop > 200); // Muestra el botón cuando el desplazamiento supera los 200 píxeles
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer className="bg-bg-100 border-t">
      <div className="relative mx-auto max-w-screen-xl px-4 py-12  lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button
            className="inline-block rounded-full bg-accent-100 p-2 text-white shadow transition hover:bg-accent-200 sm:p-3 lg:p-4"
                onClick={scrollToTop}
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-teal-600 lg:justify-start">
             <img src={logoTr} class="h-8 me-3 invert" alt="logo Tech Riders" />
            </div>

            <p className="mx-auto mt-6 max-w-sm text-center leading-relaxed text-gray-500 lg:text-left">
            Conectando Futuros: Charlas Tecnológicas para la Excelencia en
                la Formación Profesional.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-6">
         
            <li>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Charlas
            </Link>
            </li>

            <li>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Empresas
            </Link>
            </li>
            <li>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Centros
            </Link>
            </li>
            <li>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              Tech Riders
            </Link>
            </li>

            <li>
            <Link
              class="font-medium hover:text-accent-200 text-text-200  dark:text-text-100 dark:hover:text-text-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              to={"/"}
            >
              ¿Quiénes somos?
            </Link>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2024. Tajamar, todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
