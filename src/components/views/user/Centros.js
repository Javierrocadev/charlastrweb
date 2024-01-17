import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";

const Centros = () => {
  const [empresasCentrosResponse, setEmpresasCentrosResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.empresasCentros.getEmpresasCentros();
        console.log("Charlas response:", response);
        setEmpresasCentrosResponse(response);

        const responseProvincias = await axiosApi.provincias.getProvincias();
        console.log("Charlas responseProvincias:", responseProvincias);
        setProvinciasResponse(responseProvincias);

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const getProvinciaNombre = (idProvincia) => {
    const provincia = provinciasResponse.find(
      (p) => p.idProvincia === idProvincia
    );
    return provincia ? provincia.nombreProvincia : "Desconocido";
  };

  return (
    <main>

      <h2 class="text-3xl mt-8 text-center text-gray-800 font-bold lg:text-4xl dark:text-white">
        Nuestras centros colaboradores
      </h2>
      <p class="mt-4 mb-8 text-center text-gray-800 dark:text-gray-400">
        Los centros educativos de toda España confían y solicitan charlas de todo tipo.
      </p>     
      {loading && (
       <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
             <div className="h-36 sm:h-56 flex flex-col justify-center bg-bg-100 border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700">
               <div className="animate-pulse flex justify-center items-center w-12 h-12 bg-gradient-to-br from-gray-100 via-gray-100 via-20% to-gray-200 to-90% rounded-lg mx-auto">
                 <svg
                   className="flex-shrink-0 w-7 h-7 text-white"
                   xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 >
                   <path d="M2 3h20" />
                   <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                   <path d="m7 21 5-5 5 5" />
                 </svg>
               </div>

               <div className="mt-3">
                 <h3 className="text-sm sm:text-base  font-semibold text-gray-800 dark:text-gray-200">
                    Empresa participante
                 </h3>
               </div>
             </div>
             <div className="h-36 sm:h-56 flex flex-col justify-center bg-bg-100 border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700">
               <div className="animate-pulse flex justify-center items-center w-12 h-12 bg-gradient-to-br from-gray-100 via-gray-100 via-20% to-gray-200 to-90% rounded-lg mx-auto">
                 <svg
                   className="flex-shrink-0 w-7 h-7 text-white"
                   xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 >
                   <path d="M2 3h20" />
                   <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                   <path d="m7 21 5-5 5 5" />
                 </svg>
               </div>

               <div className="mt-3">
                 <h3 className="text-sm sm:text-base  font-semibold text-gray-800 dark:text-gray-200">
                    Empresa participante
                 </h3>
               </div>
             </div>
             <div className="h-36 sm:h-56 flex flex-col justify-center bg-bg-100 border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700">
               <div className="animate-pulse flex justify-center items-center w-12 h-12 bg-gradient-to-br from-gray-100 via-gray-100 via-20% to-gray-200 to-90% rounded-lg mx-auto">
                 <svg
                   className="flex-shrink-0 w-7 h-7 text-white"
                   xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 >
                   <path d="M2 3h20" />
                   <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                   <path d="m7 21 5-5 5 5" />
                 </svg>
               </div>

               <div className="mt-3">
                 <h3 className="text-sm sm:text-base  font-semibold text-gray-800 dark:text-gray-200">
                    Empresa participante
                 </h3>
               </div>
             </div>
             <div className="h-36 sm:h-56 flex flex-col justify-center bg-bg-100 border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700">
               <div className="animate-pulse flex justify-center items-center w-12 h-12 bg-gradient-to-br from-gray-100 via-gray-100 via-20% to-gray-200 to-90% rounded-lg mx-auto">
                 <svg
                   className="flex-shrink-0 w-7 h-7 text-white"
                   xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 >
                   <path d="M2 3h20" />
                   <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                   <path d="m7 21 5-5 5 5" />
                 </svg>
               </div>

               <div className="mt-3">
                 <h3 className="text-sm sm:text-base  font-semibold text-gray-800 dark:text-gray-200">
                    Empresa participante
                 </h3>
               </div>
             </div>
       
       </div>
     </div>
      )}

      {!loading && (
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {empresasCentrosResponse.filter(empresa => empresa.idTipoEmpresa === 2).map((empresa) => (
             <div class="h-36 sm:h-56 flex flex-col justify-center bg-bg-100 border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700">
            
             <div class="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-accent-100 via-accent-100 via-20% to-accent-200 to-90% rounded-lg mx-auto">
               <svg class="flex-shrink-0 w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>
             </div>
             
       
             <div class="mt-3">
               <h3 class="text-sm sm:text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                 {empresa.nombre}
               </h3>
             </div>
           </div>
          
       
        
        ))}
      </div>
      </div>
      )}
    </main>
  );
};

export default Centros;
