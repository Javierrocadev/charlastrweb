import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;