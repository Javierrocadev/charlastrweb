import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";
import { NavLink } from "react-router-dom";
import CalendarComponent from "../../ui/CalendarComponent";

const MenuCentro = () => {
  const [centro, setCentro] = useState([]);
  const [isCentro, setIsCentro] = useState(false);

  const PanelCentro = ({ centro }) => {
    return (
      <section className="pt-10">
        {centro.map((centro, index) => (
          <div
            key={index}
            className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <span className="text-accent-200">centro: </span>
              {centro.nombre}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Direccion: </span>
                  {centro.direccion}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Telefono: </span>
                  {centro.telefono}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Persona de contacto: </span>
                  {centro.personaContacto}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  };
  const PanelCalendario = () => {
    const [charlas, setCharlas] = useState([]);

    useEffect(() => {
      const fechData = async () => {
        try {
          const responseTrCentro = await axiosApi.empresas.getTRByEmpresa();

          const charlasPromises = responseTrCentro.map(async (data) => {
            const responseCharlasCentro =
              await axiosApi.empresas.getCharlasTrEmpresa(data.idTechRider);

            const fiteredCharlas = responseCharlasCentro.filter(
              (chTr) => chTr.idTechRider === data.idTechRider
            );

            return fiteredCharlas;
          });

          const charlasData = await Promise.all(charlasPromises);
          setCharlas(charlasData);

        } catch (error) {
          console.log("Error al obtener charlas");
        }
      };
      fechData();
    }, []);
    return (
      <section className="border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <h3 className="my-6 text-xl font-semibold text-gray-900 dark:text-white">
          Calendario centro
        </h3>
        <CalendarComponent charlas={charlas} />
      </section>
    );
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const responsable = axiosApi.usuarios.getPerfilUsuario();
        const responseCentro =
          await axiosApi.empresasCentros.getEmpresasCentros();
        const filteredResponse = responseCentro.filter(
          (centro) => centro.idEmpresaCentro === responsable.idEmpresaCentro
        );

        setCentro(filteredResponse);
        console.log(filteredResponse);
        setIsCentro(true);
      } catch (error) {
      } finally {
        setIsCentro(false);
      }
    };

    fechData();
  }, []);

  return (
    <section className="w-full h-[100vh] mx-auto relative">
      <div className="w-full h-full md:h-[100vh] bg-slate-300">
        <header className="bg-black w-full h-[80px] flex justify-end items-center px-5">
          {centro.length ? (
            <div>
              <svg
                class="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 
                  0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 
                  0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
                />
              </svg>
            </div>
          ) : centro.length === 0 ? (
            <NavLink
              to="/inscripcioncentro"
              className=" text-white py-2 px-3 rounded-md flex float-end items-center space-x-2
              hover:translate-x-1 transition-all cursor-pointer"
            >
              <span>Agregar Centro</span>
              <svg
                class="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </NavLink>
          ) : (
            <p className="hidden">Loading...</p>
          )}
        </header>

        <div className="w-[90%] mx-auto">
          {isCentro ? (
            <PanelCentro centro={centro} />
          ) : centro.length === 0 ? (
            <PanelCalendario />
          ) : (
            <span className="hidden"> No hay centro</span>
          )}
        </div>
      </div>
    </section>
  );
};
export default MenuCentro;
