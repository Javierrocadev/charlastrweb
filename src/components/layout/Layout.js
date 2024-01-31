import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Layout = ({ children }) => {
  
  return (
    // <div className="flex flex-col min-h-screen bg-neutral-50 absolute inset-0 -z-10 h-fit w-full  bg-[radial-gradient(#d6ebf5_1px,transparent_1px)] [background-size:16px_16px] ">
    <div className="containerBg dark:bg-primaryDark-100">
      <Navbar />
      <div className="flex-grow mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;