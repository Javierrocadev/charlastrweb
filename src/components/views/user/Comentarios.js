import React, { useState, useEffect } from "react";
import axiosApi from "../../../api/axiosApi";

const Comentarios = () => {
  const [charlasResponse, setCharlasResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.ValoracionesCharlas.getValoracionesCharlas();
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
      <h1>Comentarios</h1>
      <ul>
        {charlasResponse.map((charla) => (
          <li key={charla.idCharla}>
            <strong>ID de Charla:</strong> {charla.idValoracion}<br />
            <strong>Valoración:</strong> {charla.valoracion}<br />
            <strong>Comentario:</strong> {charla.comentario}<br />
            {/* Agrega más campos según sea necesario */}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Comentarios;
