import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, MenuItem, Container, Paper } from "@mui/material";
import BackIcon from "../backIcon/BackIcon";
import { validateField } from "../validaciones/validaciones";

const Update_aprendiz = ({ aprendiz }) => {
  const [estados, set_estados] = useState([]);
  const [documentos, set_documentos] = useState([]);
  const [formData, setFormData] = useState({
    numero_documento_aprendiz: aprendiz.numero_documento_aprendiz || "",
    codigo_ficha: aprendiz.codigo_ficha || "",
    nombre_documento: aprendiz.nombre_documento || "",
    id_tipo_documento: aprendiz.id_tipo_documento || "",
    id_estado_aprendiz: aprendiz.id_estado_aprendiz || "",
    nombre_estado: aprendiz.nombre_estado_aprendiz || "",
    id_obligacion_mensual: aprendiz.id_obligacion_mensual || "",
    nombre_obligacion_mensual: aprendiz.nombre_obligacion_mensual || "",
    numero_resolucion_adjudicacion: aprendiz.numero_resolucion_adjudicacion || "",
    codigo_beneficio: aprendiz.nombre_beneficio || "",
    nombre_completo_aprendiz: aprendiz.nombre_completo_aprendiz || "",
    fecha_adjudicacion: aprendiz.fecha_adjudicacion || "",
    numero_telefono_fijo: aprendiz.numero_telefono_fijo || "",
    numero_telefono_movil: aprendiz.numero_telefono_movil || "",
    direccion_residencia_aprendiz: aprendiz.direccion_residencia_aprendiz || "",
    email_aprendiz: aprendiz.email_aprendiz || "",
    modalidad_productiva: "false",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/get_documentos")
      .then((response) => response.json())
      .then((data) => set_documentos(data.data || []))
      .catch((error) => console.error("Error en la solicitud:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/get_estados")
      .then((response) => response.json())
      .then((data) => set_estados(data.data || []))
      .catch((error) => console.error("Error en la solicitud:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      alert("Por favor, verifique los datos ingresados antes de enviar el formulario.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/actualizardatos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Error al enviar el formulario");
      } else {
        alert("Datos del aprendiz actualizados correctamente");
        navigate("/novedades");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <BackIcon />
        <h4 className="titulos">
          Formulario de actualización de datos
        </h4>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography variant="h6" gutterBottom>
            Datos personales
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre Completo del Aprendiz"
                name="nombre_completo_aprendiz"
                onChange={handleChange}
                value={formData.nombre_completo_aprendiz}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors.nombre_completo_aprendiz}
                helperText={errors.nombre_completo_aprendiz}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Tipo de Documento"
                name="id_tipo_documento"
                onChange={handleChange}
                value={formData.id_tipo_documento}
                required
                error={!!errors.id_tipo_documento}
                helperText={errors.id_tipo_documento}
              >
                <MenuItem value="">Selecciona...</MenuItem>
                {documentos.map((item) => (
                  <MenuItem key={item.id_tipo_documento} value={item.id_tipo_documento}>
                    {item.nombre_documento}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Documento del Aprendiz"
                name="numero_documento_aprendiz"
                onChange={handleChange}
                value={formData.numero_documento_aprendiz}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors.numero_documento_aprendiz}
                helperText={errors.numero_documento_aprendiz}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Teléfono Fijo"
                name="numero_telefono_fijo"
                onChange={handleChange}
                value={formData.numero_telefono_fijo}
                required
                error={!!errors.numero_telefono_fijo}
                helperText={errors.numero_telefono_fijo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Teléfono Móvil"
                name="numero_telefono_movil"
                onChange={handleChange}
                value={formData.numero_telefono_movil}
                required
                error={!!errors.numero_telefono_movil}
                helperText={errors.numero_telefono_movil}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección de Residencia del Aprendiz"
                name="direccion_residencia_aprendiz"
                onChange={handleChange}
                value={formData.direccion_residencia_aprendiz}
                required
                error={!!errors.direccion_residencia_aprendiz}
                helperText={errors.direccion_residencia_aprendiz}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo Electrónico del Aprendiz"
                name="email_aprendiz"
                onChange={handleChange}
                value={formData.email_aprendiz}
                required
                error={!!errors.email_aprendiz}
                helperText={errors.email_aprendiz}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Datos de beneficio
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Código de Ficha"
                name="codigo_ficha"
                onChange={handleChange}
                value={formData.codigo_ficha}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors.codigo_ficha}
                helperText={errors.codigo_ficha}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estado del aprendiz"
                name="id_estado_aprendiz"
                onChange={handleChange}
                value={formData.nombre_estado}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors.id_estado_aprendiz}
                helperText={errors.id_estado_aprendiz}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Obligación Mensual"
                name="id_obligacion_mensual"
                onChange={handleChange}
                value={formData.id_obligacion_mensual}
                required
                error={!!errors.id_obligacion_mensual}
                helperText={errors.id_obligacion_mensual}
              >
                <MenuItem value={aprendiz.id_obligacion_mensual}>
                  {aprendiz.nombre_obligacion_mensual}
                </MenuItem>
                <MenuItem value="1">Taller Mensual</MenuItem>
                <MenuItem value="2">Plan de Actividades</MenuItem>
              </TextField>
            </Grid>
            {formData.id_estado_aprendiz === "2" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Modalidad Productiva"
                  name="modalidad_productiva"
                  onChange={handleChange}
                  value={formData.modalidad_productiva}
                  required
                  error={!!errors.modalidad_productiva}
                  helperText={errors.modalidad_productiva}
                >
                  
                  <MenuItem value="true">Taller Mensual</MenuItem>
                  <MenuItem value="false">Plan de Actividades</MenuItem>
                </TextField>
              </Grid>
            )}
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Datos de adjudicación
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de resolución de adjudicación"
                name="numero_resolucion_adjudicacion"
                onChange={handleChange}
                value={formData.numero_resolucion_adjudicacion}
                required
                error={!!errors.numero_resolucion_adjudicacion}
                helperText={errors.numero_resolucion_adjudicacion}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Código de Beneficio"
                name="codigo_beneficio"
                onChange={handleChange}
                value={formData.codigo_beneficio}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors.codigo_beneficio}
                helperText={errors.codigo_beneficio}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Adjudicación"
                name="fecha_adjudicacion"
                onChange={handleChange}
                value= {new Date(formData.fecha_adjudicacion).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
                required
                InputProps={{
                  readOnly: true,
                }}
                error={!!errors.fecha_adjudicacion}
                helperText={errors.fecha_adjudicacion}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

Update_aprendiz.propTypes = {
  aprendiz: PropTypes.object.isRequired,
};

export default Update_aprendiz;
