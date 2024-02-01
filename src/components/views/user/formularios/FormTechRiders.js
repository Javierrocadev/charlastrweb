import React, { useState, useEffect } from "react";
import axiosApi from "../../../../api/axiosApi";
import { Link } from "react-router-dom";

const FormTechRiders = () => {
  const [empresasCentrosResponse, setEmpresasCentrosResponse] = useState([]);
  const [provinciasResponse, setProvinciasResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre:"",
    apellidos:"",
    email:"",
    telefono:"",
    linkedIn:"",
    password:"",
    idRole:"",
    idProvincia:"",
    idEmpresaCentro:"",
    estado:"",
    billingContact: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    billingAddress: {
      streetAddress: '',
      aptSuiteBuilding: '',
      zipCode: '',
      city: 'City',
      state: 'State',
    },
    paymentMethod: {
      nameOnCard: '',
      cardNumber: '',
      expirationDate: '',
      cvvCode: '',
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };
  const handleSaveChanges = () => {
    // Handle saving the data or perform any other action here
    console.log('Form Data:', formData);
  };


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
    <main className="bg-white rounded-xl shadow dark:bg-primary-100">
 <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Card */}
      <div className="bg-bg-100 rounded-xl shadow p-4 sm:p-7 dark:bg-accent-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            Form Tech Riders
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Rellena los siguientes datos
          </p>
        </div>

        <form>
          {/* Billing contact section */}
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label htmlFor="af-payment-billing-contact" className="inline-block text-sm font-medium dark:text-white">
              Tus datos
            </label>

            <div className="mt-2 space-y-3">
              <input
                id="af-payment-billing-contact"
                type="text"
                value={formData.billingContact.firstName}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Nombre"
              />
              <input
                type="text"
                value={formData.billingContact.lastName}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Apellidos"
              />
              <input
                type="text"
                value={formData.billingContact.phoneNumber}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Telefono"
              />
            </div>
          </div>
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label htmlFor="af-payment-billing-contact" className="inline-block text-sm font-medium dark:text-white">
              Datos de acceso
            </label>

            <div className="mt-2 space-y-3">
              <input
                id="af-payment-billing-contact"
                type="text"
                value={formData.billingContact.firstName}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Correo"
              />
              <input
                type="text"
                value={formData.billingContact.lastName}
                onChange={(e) => handleInputChange('contraseña', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Contraseña"
              />
              <input
                type="text"
                value={formData.billingContact.phoneNumber}
                onChange={(e) => handleInputChange('billingContact', 'phoneNumber', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Repite la contraseña"
              />
          <select
        value={formData.billingAddress.city}
        onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
        className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      >
        <option value="">Select City</option>
        {provinciasResponse.map((provincia) => (
          <option key={provincia.id} value={provincia.nombreProvincia}>
            {provincia.nombreProvincia}
          </option>
        ))}
      </select>
            </div>
          </div>
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label htmlFor="af-payment-billing-contact" className="inline-block text-sm font-medium dark:text-white">
              Tus datos
            </label>

            <div className="mt-2 space-y-3">
              <input
                id="af-payment-billing-contact"
                type="text"
                value={formData.billingContact.firstName}
                onChange={(e) => handleInputChange('billingContact', 'firstName', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="First Name"
              />
              <input
                type="text"
                value={formData.billingContact.lastName}
                onChange={(e) => handleInputChange('billingContact', 'lastName', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Last Name"
              />
              <input
                type="text"
                value={formData.billingContact.phoneNumber}
                onChange={(e) => handleInputChange('billingContact', 'phoneNumber', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Phone Number"
              />
            </div>
          </div>
          {/* End Billing contact section */}

          {/* Billing address section */}
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label htmlFor="af-payment-billing-address" className="inline-block text-sm font-medium dark:text-white">
              Billing address
            </label>

            <div className="mt-2 space-y-3">
              <input
                id="af-payment-billing-address"
                type="text"
                value={formData.billingAddress.streetAddress}
                onChange={(e) => handleInputChange('billingAddress', 'streetAddress', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Street Address"
              />
              <input
                type="text"
                value={formData.billingAddress.aptSuiteBuilding}
                onChange={(e) => handleInputChange('billingAddress', 'aptSuiteBuilding', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Apt, Suite, Building (Optional)"
              />
              <div className="grid sm:flex gap-3">
                <input
                  type="text"
                  value={formData.billingAddress.zipCode}
                  onChange={(e) => handleInputChange('billingAddress', 'zipCode', e.target.value)}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Zip Code"
                />
                <select
                  value={formData.billingAddress.city}
                  onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                  className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                >
                  <option>Select City</option>
                  <option>City 1</option>
                  <option>City 2</option>
                  <option>City 3</option>
                </select>
                <select
                  value={formData.billingAddress.state}
                  onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                  className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                >
                  <option>Select State</option>
                  <option>State 1</option>
                  <option>State 2</option>
                  <option>State 3</option>
                </select>
              </div>
            </div>
          </div>
          {/* End Billing address section */}

          {/* Payment method section */}
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label htmlFor="af-payment-payment-method" className="inline-block text-sm font-medium dark:text-white">
              Payment method
            </label>

            <div className="mt-2 space-y-3">
              <input
                id="af-payment-payment-method"
                type="text"
                value={formData.paymentMethod.nameOnCard}
                onChange={(e) => handleInputChange('paymentMethod', 'nameOnCard', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Name on Card"
              />
              <input
                type="text"
                value={formData.paymentMethod.cardNumber}
                onChange={(e) => handleInputChange('paymentMethod', 'cardNumber', e.target.value)}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Card Number"
              />
              <div className="grid sm:flex gap-3">
                <input
                  type="text"
                  value={formData.paymentMethod.expirationDate}
                  onChange={(e) => handleInputChange('paymentMethod', 'expirationDate', e.target.value)}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Expiration Date"
                />
                <input
                  type="text"
                  value={formData.paymentMethod.cvvCode}
                  onChange={(e) => handleInputChange('paymentMethod', 'cvvCode', e.target.value)}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-accent-200 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="CVV Code"
                />
              </div>
            </div>
          </div>
          {/* End Payment method section */}
        </form>

        <div className="mt-5 flex justify-end gap-x-2">
        
          <button
            type="button"
            onClick={handleSaveChanges}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-accent-200 bg-accent-200 text-white shadow-sm hover:bg-accent-100 duration-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-bg-200 dark:text-text-100 dark:hover:bg-bg-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-bg-200"
          >
            Solicitar</button>
     
     
        </div>
      </div>
      {/* End Card */}
    </div>
    </main>
  );
};

export default FormTechRiders;
