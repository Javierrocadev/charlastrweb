import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../../assets/images/HeroImg.jpeg"

const NoAutorizado = () => {
  return (
    <main className='mt-8'>
<div class="bg-white shadow rounded-xl py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-lg px-4 md:px-8">
    <div class="grid gap-8 sm:grid-cols-2">
     
      <div class="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
        <p class="mb-4 text-xs font-semibold uppercase text-red-700 md:text-base">Error 403</p>
        <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">Sin acceso</h1>

        <p class="mb-8 text-center text-red-700 sm:text-left md:text-lg">Careces de los permisos para acceder a la siguiente página. Si crees que se trata de un error contacta con los administradores.</p>

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

export default NoAutorizado;