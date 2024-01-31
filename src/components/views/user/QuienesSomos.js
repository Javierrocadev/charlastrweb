import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";
import { Link } from "react-router-dom";
import logoTajamar from "../../../assets/images/LogoTajamar.png";
import heroImg from "../../../assets/images/HeroImg.jpeg";
import quienessomos from "../../../assets/images/Quienessmos.jpeg"

const QuienesSomos = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Maneja el evento de carga de la imagen
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Añade un efecto secundario para restablecer el estado cuando cambia la imagen
  useEffect(() => {
    setImageLoaded(false);
  }, []); // Dependencia: quienessomos

  return (
 <main className="bg-white rounded-xl shadow dark:bg-primary-100">
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="aspect-w-16 aspect-h-7">
          {!imageLoaded && (
            <img
            class={`w-full h-80 object-cover rounded-xl bg-gray-300 animate-pulse`}
            alt="charlas"
          />
          )}
          <img
            class={`w-full object-cover rounded-xl ${!imageLoaded ? "hidden" : ""}`}
            src={quienessomos}
            alt="charlas"
            onLoad={handleImageLoad}
          />
        </div>

  <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
    <div class="lg:col-span-1">
      <h2 class="font-bold text-2xl md:text-3xl text-gray-800 dark:text-primaryDark-100">
        Techs Riders
      </h2>
      <p class="mt-2 md:mt-4 text-gray-508">
        Conectámos a empresas y personas con centros educativos. Las ventajas que recibirán los alumnos de estas charlas son inmejorables.</p>
    </div>
    

    <div class="lg:col-span-2">
      <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
        
        <div class="flex gap-x-5">
          <svg class="flex-shrink-0 mt-1 w-6 h-6 text-accent-200 dark:text-accent-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>
          <div class="grow">
            <h3 class="text-lg font-semibold text-gray-800 ">
            Adquisición de Conocimientos
            </h3>
            <p class="mt-1 text-gray-600 dark:text-gray-800">
            Escuchar charlas educativas permite a la audiencia obtener información actualizada y profundizar en nuevos temas, ampliando su base de conocimientos.</p>
          </div>
        </div>
       
        <div class="flex gap-x-5">
          <svg class="flex-shrink-0 mt-1 w-6 h-6 text-accent-200 dark:text-accent-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
          <div class="grow">
            <h3 class="text-lg font-semibold text-gray-800 ">
            Inspiración y Motivación
            </h3>
            <p class="mt-1 text-gray-600 dark:text-gray-800">
            Las charlas educativas pueden inspirar y motivar a la audiencia, proporcionando ejemplos prácticos y perspectivas que impulsan el crecimiento personal y profesional. </p>
          </div>
        </div>
       
        <div class="flex gap-x-5">
          <svg class="flex-shrink-0 mt-1 w-6 h-6 text-accent-200 dark:text-accent-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          <div class="grow">
            <h3 class="text-lg font-semibold text-gray-800 ">
            Networking
            </h3>
            <p class="mt-1 text-gray-600 dark:text-gray-800">
            Ofrecemos oportunidades para establecer conexiones valiosas con personas que comparten intereses similares, creando redes de apoyo y colaboración.  </p>
          </div>
        </div>
    
        <div class="flex gap-x-5">
          <svg class="flex-shrink-0 mt-1 w-6 h-6 text-accent-200 dark:text-accent-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <div class="grow">
            <h3 class="text-lg font-semibold text-gray-800 ">
            Desarrollo de Habilidades Críticas
            </h3>
            <p class="mt-1 text-gray-600 dark:text-gray-800">
            Exponerse a diversas charlas fomenta el pensamiento crítico, la capacidad de análisis y la evaluación reflexiva de conceptos presentados.   </p>
          </div>
        </div>
        
      </div>
    </div>

  </div>

</div>
 </main>
  );
};

export default QuienesSomos;
