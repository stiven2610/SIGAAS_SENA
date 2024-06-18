import React, { useState } from "react";
import Boton from "../botones/Boton";

const FormularioRegistroAsistenciaTaller = ({ nombreTaller, codigo_taller, actualizarAsistencias }) => {
  const [numero_documento_aprendiz, setNumero_documento_aprendiz] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!numero_documento_aprendiz) {
      setError("Por favor, complete el campo del número de documento del aprendiz.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/asistenciataller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo_taller,
          numero_documento_aprendiz,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      setNumero_documento_aprendiz("");
      setError("");
      alert("Asistencia registrada correctamente para el aprendiz.");

      // Llamamos a la función de actualización pasada desde Asistencia_taller
      actualizarAsistencias();
    } catch (error) {
      setError(error.message || "Hubo un problema al procesar la solicitud.");
    }
  };

  const handleInputChange = (e) => {
    setError("");
    setNumero_documento_aprendiz(e.target.value);
  };

  return (
    <div className="container_registro_asistencia">
      <form onSubmit={handleSubmit}>
        <label className="subtitulos m-2">
          Ingrese el número de documento del aprendiz:
          <input
            className="form-control mt-2"
            type="number"
            value={numero_documento_aprendiz}
            onChange={handleInputChange}
            required
          />
        </label>
        <Boton texto="Registrar Asistencia" textcolor="#f8f8f8" color="#39A900" />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default FormularioRegistroAsistenciaTaller;