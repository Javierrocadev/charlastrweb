import React from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
const Navbar = () => {
    const { isAuthenticated, role , logout } = useContext(AuthContext);

    if (!isAuthenticated) {
        // Navigate to login page if user is not authenticated
        return (
            <nav>
              <ul>
                <li><Link to={"/"}>home</Link></li>
                <li><Link to={"/pag1"}>pag1</Link></li>
                <li><Link to={"/pag2"}>pag2</Link></li>
                <li><Link to={"/pag3"}>pag3</Link></li>
                <li><Link to={"/pag4"}>pag4</Link></li>
                <li><Link to={"/pag5"}>pag5</Link></li>
                <li><Link to={"/login"}>login</Link></li>
             
              </ul>
            </nav>
          );
      }
      if (role ===1) {
        // Navigate to login page if user is not authenticated
        return (
            <nav>
              <ul>
                <li><Link to={"/"}>home</Link></li>
                <li><Link to={"/pag1"}>pag1</Link></li>
                <li><Link to={"/pag2"}>pagdddddddddd2</Link></li>
                <li><Link to={"/pag3"}>pag3</Link></li>            
                <button onClick={logout}>Logout</button>           
              </ul>
            </nav>
          );
      }

  return (
    <nav>
      <ul>
        <li><Link to={"/"}>home</Link></li>
        <li><Link to={"/pag1"}>pag1</Link></li>
        <li><Link to={"/pag2"}>pag2</Link></li>
        <li><Link to={"/pag3"}>pag3</Link></li>
        <li><Link to={"/pag4"}>pag4</Link></li>
        <li><Link to={"/pag5"}>pag5</Link></li>
        <li><Link to={"/login"}>login</Link></li>
     
      </ul>
    </nav>
  );
};

export default Navbar;