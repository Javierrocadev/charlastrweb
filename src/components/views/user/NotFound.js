import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../../assets/images/HeroImg.jpeg"

const NotFound = () => {
  return (
    <main className='mt-8'>
<div class="bg-white shadow rounded-xl py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-lg px-4 md:px-8">
    <div class="grid gap-8 sm:grid-cols-2">
     
      <div class="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
        <p class="mb-4 text-sm font-semibold uppercase text-accent-200 md:text-base">Error 404</p>
        <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">Página no encontrada</h1>

        <p class="mb-8 text-center text-accent-100 sm:text-left md:text-lg">La página que buscas no existe o se ha movido.</p>

       </div>
  
      <div class="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
        <img src={logo} loading="lazy" alt="Photo by @heydevn" class="absolute inset-0 h-full w-full object-cover object-center" />
      </div>
      
    </div>
  </div>
</div>
    </main>
  );
};

export default NotFound;