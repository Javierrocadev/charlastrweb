import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import { NavLink } from "react-router-dom";
import CalendarComponent from "../../ui/CalendarComponent";

const MenuEmpresa = () => {
  const [empresa, setEmpresa] = useState([]);
  const [isEmpresa, setIsEmpresa] = useState(false);

  const PanelEmpresa = ({ empresa }) => {
    console.log(empresa);
    return (
      <section className="pt-10">
        {empresa.map((empresa, index) => (
          <div
            key={index}
            className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-accent-200 dark:border-gray-700"
          >
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <span className="text-accent-100">Empresa: </span>
              {empresa.nombre}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-accent-100 dark:text-gray-400">
                  <span className="font-semibold">Direccion: </span>
                  {empresa.direccion}
                </p>
              </div>
              <div>
                <p className="text-sm text-accent-100 dark:text-gray-400">
                  <span className="font-semibold">Telefono: </span>
                  {empresa.telefono}
                </p>
              </div>
              <div>
                <p className="text-sm text-accent-100 dark:text-gray-400">
                  <span className="font-semibold">Persona de contacto: </span>
                  {empresa.personaContacto}
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
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const fechData = async () => {
        try {
          // const responsTrEmpresa = await axiosApi.empresas.getTRByEmpresa();
          // const charlasPromises = responsTrEmpresa.map(async (data) => {
          //   const resp = await axiosApi.empresas.getCharlasTrEmpresa(40); //data.idTechRider
          //   console.log("CHARLAS DE LOS TR DE LA EMPRESA: ", resp);
          //   const filteredResponse = resp.filter((chTr)=> chTr.idTechRider === data.idTechRider);
          //   return resp;
          // });

          const responseTrCentro = await axiosApi.empresas.getTRByEmpresa();
          const mappedIds = responseTrCentro.map((tr) => tr.idTechRider);
          const charlasResponse = await axiosApi.charlas.getCharlas();
          const filteredChalas = charlasResponse.filter((c) =>
            mappedIds.includes(c.idTechRider)
          );

          setCharlas(filteredChalas);
          setLoaded(true);

          //const charlasData = await Promise.all(charlasPromises);
          //console.log("CHARLAS DE LOS TR DE LA EMPRESA: ", charlasData);
        } catch (error) {
          console.log(error);
        }
      };
      fechData();
    }, []);

    return (
      <section className="w-[100%] h-auto border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <h3 className="my-6 text-xl font-semibold text-gray-900 dark:text-white">
          Calendario empresa
        </h3>
        <CalendarComponent charlas={charlas} />
      </section>
    );
  };

  const Loading = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
      const loading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
      };
      const intervalId = setInterval(loading, 500);

      return () => clearInterval(intervalId);
    });

    return (
      <div>
        <span className="ml-2">{dots}</span>
      </div>
    );
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const responseEmpresa =
          await axiosApi.empresasCentros.getEmpresasCentros();

        const userlogin = await axiosApi.usuarios.getPerfilUsuario();
        //setUser(userlogin);

        if (userlogin) {
          if (responseEmpresa) {
            const filterEmpresa = responseEmpresa.filter(
              (emp) => emp.idEmpresaCentro === userlogin.idEmpresaCentro
            );
            setEmpresa(filterEmpresa);
            setIsEmpresa(true);
          } else {
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  return (
    <section className="w-full h-[100%] mx-auto relative ">
      <div className="w-full h-full rounded bg-white dark:bg-accent-100">
        <header className="bg-accent-200 w-full h-[80px] px-5">
          {empresa.length ? (
            <div className="flex justify-between items-center p-5">
              <span className=" float-left text-2xl text-white uppercase">
                {empresa.map((centro) => centro.nombre)}
              </span>
              <div className="w-10 float-right">
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
            </div>
          ) : !isEmpresa ? (
            <p className="text-white py-2 px-3 flex">
              Loading{" "}
              <span className="">
                <Loading />
              </span>
            </p>
          ) : (
            <NavLink
              to="/inscripcionempresa"
              className=" text-white py-2 px-3 rounded-md flex float-end items-center space-x-2
              hover:translate-x-1 transition-all cursor-pointer"
            >
              <span>Agregar Empresa</span>
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
          )}
        </header>
        {isEmpresa ? (
          <div className="w-[90%] h-[100%] mx-auto">
            <PanelEmpresa empresa={empresa} />
            <PanelCalendario />
          </div>
        ) : (
          <span className="hidden"> No hay empresa</span>
        )}
      </div>
    </section>
  );
};
export default MenuEmpresa;
