import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import ("./styles.css")
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
    <Container className="container_registro_asistencia" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" className="titulos" align="center" gutterBottom>
          Registro de Asistencia para {nombreTaller}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Número de documento del aprendiz"
              type="number"
              fullWidth
              value={numero_documento_aprendiz}
              onChange={handleInputChange}
              error={!!error}
              helperText={error}
              required
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#39A900", color: "#f8f8f8" }}
            >
              Registrar Asistencia
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FormularioRegistroAsistenciaTaller;
