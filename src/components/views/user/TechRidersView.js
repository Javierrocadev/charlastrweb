import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";


const TechRidersView = () => {
  const [TrResponse, setTrResponse] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.techriders.getTr();
        console.log("Charlas response:", response);
        setTrResponse(response);



        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <main className="bg-white rounded-xl shadow dark:bg-primary-100 pt-4">

      <h2 class="text-3xl mt-8 text-center text-gray-800 font-bold lg:text-4xl ">
        Nuestros Tech Riders
      </h2>
      <p class="mt-4 text-center text-gray-800 dark:text-gray-400">
        Los profesionales que hacen posible todas las charlas. ¡Visitad su linkedIn!
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
                    Tech Riders
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
                    Tech Riders
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
                    Tech Riders
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
                    Tech Riders
                 </h3>
               </div>
             </div>
       
       </div>
     </div>
      )}

      {!loading && (
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-12">
        {TrResponse.filter(tr => tr.linkedInVisible === 1).map((tr) => (
 <a href={tr.linkedIn}>
          <div class="flex flex-row justify-evenly gap-2 items-center border p-2 rounded bg-primary-100 dark:bg-accent-200 hover:bg-primary-200 dark:hover:opacity-50">
         
          <svg
    y="0"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    width="100"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    height="100"
    class="w-8 h-8 shrink-0 dark:fill-accent-100 fill-accent-200"
  >
    <path
      d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z"
    ></path>
  </svg>
          
          <div class="">
            <h3 class="font-medium text-black dark:text-gray-200">
            {tr.techRider}
            </h3>
            <p class="text-sm text-black dark:text-gray-100">
            Tech Rider
            </p>
          </div>
        </div>
       
        </a>
        ))}
      </div>
      </div>
      )}
    </main>
  );
};

export default TechRidersView;
