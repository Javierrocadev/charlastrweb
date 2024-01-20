import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const VistaTechridersEmpresa = () => {
  const [techriders, setTechriders] = useState([]);

  const handleClickTr = (tr) => {
    console.log(tr);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTr = await axiosApi.empresas.getTRByEmpresa();
        setTechriders(responseTr);
        console.log(responseTr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto">
      <div>
        {techriders.map((tr, index) => (
          <div
            key={index}
            className="relative md:max-w-full mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <span className="text-indigo-500">Tech Rider: </span>
              {" " + tr.techRider}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Email: </span>
                  {" " + tr.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Teléfono: </span>
                  {tr.telefonoTechRider}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Linkedin: </span>
                  {tr.linkedIn}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Empresa: </span>
                  {tr.empresa}
                </p>
              </div>
            </div>

            <div
              className="absolute top-5 right-10"
              onClick={() => handleClickTr(tr)}
            >
              <svg
                className="w-6 h-5 
                hover:scale-125 transition-transform cursor-pointer text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default VistaTechridersEmpresa;
