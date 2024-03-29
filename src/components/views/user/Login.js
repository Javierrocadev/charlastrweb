import React, { useState, useContext ,useEffect  } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/authContext";

import logo from "../../../assets/images/LogoTechRiders.png";
const Login = () => {
  const { isAuthenticated, login, logout, role } = useContext(AuthContext);
  const [redirectPath, setRedirectPath] = useState(null);
  const handleSubmit = (e) => {

    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    login(email, password);
    
    
  };
  useEffect(() => {
    if (role !== null) {
      switch (role) {
        case 1:
          setRedirectPath("/admin");
          break;
        case 2:
          setRedirectPath("/profesor");
          break;
        case 3:
          setRedirectPath("/tr");
          break;
        case 4:
          setRedirectPath("/representante");
          break;
        default:
          // Handle default case
          break;
      }
    }
  }, [role]);

  if (redirectPath) {
    // Use Navigate to redirect and maintain state
    return <Navigate to={redirectPath} />;
  }


  return (
    // <div className="login-container">
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>Email:</label>
    //     <input type="email" name="email" />
    //     <br />
    //     <label>Password:</label>
    //     <input type="password" name="password" />
    //     <br />
    //     <button type="submit">Login</button>
    //   </form>
    //   {/* {!isAuthenticated && (
    //     <button onClick={logout}>Logout</button>
    //   )} */}
    //    <button onClick={logout}>Logout</button>
    // </div>
<main className="bg-white rounded-xl shadow dark:bg-primary-100">
    <div
      class="relative flex flex-row
     justify-center overflow-hidden"
    >
      <div class="mx-auto text-center max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
        <div class="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
          {/* <!-- Title --> */}
          <h1 class="text-3xl  text-gray-800 font-bold md:text-4xl md:leading-tight  lg:text-5xl lg:leading-tight dark:text-accent-200">
            Si necesitas actualizarte, hay una{" "}
            <span class="text-accent-100 dark:text-accent-100">charla</span>{" "}
            para ti.
          </h1>
          <p class="mt-3 mb-3 text-base text-accent-100">
            Inscríbite ahora y empieza a pedir charlas para tu centro o si te
            atreves, a impartirlas tú mismo.
          </p>
          {/* <!-- End Title --> */}

          {/* <!-- Form --> */}
          <form onSubmit={handleSubmit}>
            <div class="mb-4">
              <label
                for="hs-hero-email-2"
                class="block text-sm font-medium dark:text-white"
              >
                <span class="sr-only">Email address</span>
              </label>
              <input
                type="email" name="email"
                id="hs-hero-email-2"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:bg-accent-100 dark:border-gray-700 dark:placeholder:text-white"
                placeholder="Email address"
              />
            </div>

            <div class="mb-4">
              <label
                for="hs-hero-password-2"
                class="block text-sm font-medium dark:text-white"
              >
                <span class="sr-only">Password</span>
              </label>
              <input
                type="password" name="password"
                id="hs-hero-password-2"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-accent-100 focus:ring-accent-100 focus:ring-2 ring-offset-2  ring-accent-100 outline-0 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:bg-accent-100 dark:border-gray-700 dark:placeholder:text-white "
                placeholder="Password"
                
              />
            </div>

            <div class="grid">
              <button
                type="submit"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-primaryDark-100 dark:border-bg-200 dark:text-textDark-100 dark:hover:bg-primaryDark-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
              >
                Inicia Sesión
              </button>
            </div>
          </form>
          {/* <!-- End Form --> */}

          <div class="py-6 flex items-center text-sm text-gray-400  before:flex-[1_1_0%] before:border-t before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
            O si no...
          </div>
          <div class="mt-2 grid">
            <Link
              to={"/registro"}
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-bg-300 bg-bg-100 text-text-200 shadow-sm duration-300 hover:bg-bg-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
            >
              ¡Regístrate!
            </Link>
            {/* <button
            type="button"
            onClick={logout}
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-800 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Cerrar Sesión
          </button> */}
          </div>
        </div>
      </div>

      <div class="hidden rounded-md p-4 md:flex md:items-center   md:absolute md:top-0 md:start-1/2 md:end-0 py-12 h-full bg-gradient-to-br from-accent-100 via-accent-100 via-20% to-accent-200 to-90% bg-no-repeat bg-center bg-cover">
        <img src={logo} alt="logo tr" />
      </div>
      {/* <!-- End Col --> */}
    </div>
    </main>
  );
};

export default Login;
