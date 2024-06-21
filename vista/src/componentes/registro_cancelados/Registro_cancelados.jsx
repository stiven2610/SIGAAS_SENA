import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import Boton from "../botones/Boton";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";

const Registro_cancelados = ({ datosNovedad }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [motivos, setMotivos] = useState([]);

  useEffect(() => {
    if (datosNovedad) {
      setFormData({
        nombre_completo_aprendiz: datosNovedad.nombre_completo_aprendiz || "",
        numero_documento_aprendiz: datosNovedad.numero_documento_aprendiz || "",
        nombre_programa: datosNovedad.nombre_programa || "",
        codigo_ficha: datosNovedad.codigo_ficha || "",
        id_motivo_suspension: "",
        numero_resolucion: ""
      });
    }
  }, [datosNovedad]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/insert_suspendido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        alert("No se registró la suspensión");
        throw new Error("Error al enviar el formulario");
      } else {
        alert("Aprendiz suspendido del apoyo correctamente");
        navigate("/novedades");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch("http://localhost:4000/get_motivos_suspension")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setMotivos(data.data);
        } else {
          console.error("Los datos recibidos no son válidos.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);

  return (
    <div className="mt-5">
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3}}>
        <BackIcon />
        <Typography variant="h5" className="titulos" align="center" gutterBottom>
          SUSPENDER APRENDIZ
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre Completo del Aprendiz"
                name="nombre_completo_aprendiz"
                onChange={handleChange}
                value={formData.nombre_completo_aprendiz || ""}
                required
                disabled
                error={!!errors.nombre_completo_aprendiz}
                helperText={errors.nombre_completo_aprendiz}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Número de documento del aprendiz"
                name="numero_documento_aprendiz"
                onChange={handleChange}
                value={formData.numero_documento_aprendiz || ""}
                required
                disabled
                error={!!errors.numero_documento_aprendiz}
                helperText={errors.numero_documento_aprendiz}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Código de ficha"
                name="codigo_ficha"
                onChange={handleChange}
                value={formData.codigo_ficha || ""}
                required
                disabled
                error={!!errors.codigo_ficha}
                helperText={errors.codigo_ficha}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre programa de formación"
                name="nombre_programa"
                onChange={handleChange}
                value={formData.nombre_programa || ""}
                required
                disabled
                error={!!errors.nombre_programa}
                helperText={errors.nombre_programa}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.id_motivo_suspension}>
                <InputLabel id="id_motivo_suspension_label">Motivo de suspensión</InputLabel>
                <Select
                  labelId="id_motivo_suspension_label"
                  id="id_motivo_suspension"
                  name="id_motivo_suspension"
                  value={formData.id_motivo_suspension || ""}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Seleccione motivo de suspensión...</MenuItem>
                  {motivos.map((item) => (
                    <MenuItem key={item.id_motivo_suspension} value={item.id_motivo_suspension}>
                      {item.nombre_motivo_suspension}
                    </MenuItem>
                  ))}
                </Select>
                {errors.id_motivo_suspension && (
                  <Typography variant="caption" color="error">
                    {errors.id_motivo_suspension}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número resolución"
                name="numero_resolucion"
                onChange={handleChange}
                value={formData.numero_resolucion || ""}
                required
                error={!!errors.numero_resolucion}
                helperText={errors.numero_resolucion}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Boton texto="Enviar" color="#88fc45" tamaño="20%" />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default Registro_cancelados;
