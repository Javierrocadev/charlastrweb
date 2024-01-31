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
              <span className="text-accent-200">Centro: </span>
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
          const mappedIds = responseTrCentro.map((tr) => tr.idTechRider);
          const charlasResponse = await axiosApi.charlas.getCharlas();
          const filteredChalas = charlasResponse.filter((c) =>
            mappedIds.includes(c.idTechRider)
          );
          //const responseCharlas = await axiosApi.empresas.getCharlasTrEmpresa(mappedIds);

          console.log("Filtered Charlas: ", filteredChalas);

          setCharlas(filteredChalas);
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
        const responsable = await axiosApi.usuarios.getPerfilUsuario();

        const responseCentro =
          await axiosApi.empresasCentros.getEmpresasCentros();
        const filteredResponse = responseCentro.filter((centro) => {
          if (centro.idEmpresaCentro === responsable.idEmpresaCentro) {
            return centro;
          } else {
            return false;
          }
        });

        setCentro(filteredResponse);
        // console.log(
        //   "usuario: " +
        //     responsable.idEmpresaCentro +
        //     ", Centro: " +
        //     filteredResponse
        // );
        setIsCentro(true);
      } catch (error) {
        console.log(error);
      }
    };

    fechData();
  }, []);

  return (
    <section className="w-full h-[100vh] mx-auto">
      <div className="w-full h-full  bg-slate-100">
        <header className="bg-black w-full h-[80px] px-5">
          {centro.length ? (
            <div className="flex justify-between items-center p-5">
              <span className=" float-left text-2xl text-white uppercase">
                {centro.map((centro) => centro.nombre)}
              </span>
              <div className="w-10 float-right">
                <svg
                  class="w-full h-full text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-1c0-.3.2-.6.5-.8l7-4.5a1 1 0 0 1 1 0l7 4.5c.3.2.5.5.5.8v1c0 .3-.2.5-.5.5h-15a.5.5 0 0 1-.5-.5Z"
                  />
                </svg>
              </div>
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

        <div className="relative w-[90%] h-[100%] mx-auto">
          {isCentro ? (
            <div>
              <PanelCentro centro={centro} />
              <PanelCalendario />
            </div>
          ) : (
            <span className="hidden"> No hay centro</span>
          )}
        </div>
      </div>
    </section>
  );
};
export default MenuCentro;
