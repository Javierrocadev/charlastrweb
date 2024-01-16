import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const Home = () => {
  const [charlasResponse, setCharlasResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.charlas.getCharlas();
        console.log('Charlas response:', response);
        setCharlasResponse(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
    <h1>Home Comentarios</h1>
    <ul>
      {charlasResponse.map((charla) => (
        <li key={charla.idCharla}>
       
          <strong>descripcion:</strong> {charla.descripcion}<br />
          <strong>turno:</strong> {charla.turno}<br />
          <strong>idProvincia:</strong> {charla.idProvincia}<br />
          <strong>observaciones:</strong> {charla.observaciones}<br />
          {/* Agrega más campos según sea necesario */}
        </li>
      ))}
    </ul>
  </main>
  );
};

export default Home;