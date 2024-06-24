import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import { validateField } from "../validaciones/validaciones";
import Datos_aprendiz from "./datos_aprendiz";
import Datos_beneficio from "./datos_beneficio";

const Insert_aprendiz = () => {
  const navigate = useNavigate();
  const [fichaExistente, setFichaExistente] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    numero_documento_aprendiz: "",
    codigo_ficha: "",
    id_tipo_documento: "",
    id_obligacion_mensual: "",
    numero_resolucion_adjudicacion: "",
    codigo_beneficio: "",
    nombre_completo_aprendiz: "",
    fecha_adjudicacion: "",
    numero_telefono_fijo: "",
    numero_telefono_movil: "",
    direccion_residencia_aprendiz: "",
    email_aprendiz: "",
    id_modalidad_formacion: "",
    fecha_inicio_ficha: "",
    fecha_fin_lectiva: "",
    fecha_inicio_etapa_productiva: "",
    fecha_fin_ficha: "",
    nivel_formacion: "",
    nombre_programa: "",
    numero_documento_instructor_lider: "",
    nombre_instructor_lider: "",
    email_instructor: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "codigo_ficha") {
      resetFormacionFields();
      setFichaExistente(false);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleCodigoFichaBlur = () => {
    const codigo_ficha = formData.codigo_ficha;

    fetch(`http://localhost:4000/get_ficha/${codigo_ficha}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const fichaData = data.data;
          setFormData({
            ...formData,
            codigo_ficha: fichaData[0].codigo_ficha || "",
            fecha_inicio_ficha: fichaData[0].fecha_inicio_ficha
              ? fichaData[0].fecha_inicio_ficha.split("T")[0]
              : "",
            fecha_fin_lectiva: fichaData[0].fecha_fin_lectiva
              ? fichaData[0].fecha_fin_lectiva.split("T")[0]
              : "",
            fecha_inicio_etapa_productiva: fichaData[0]
              .fecha_inicio_etapa_productiva
              ? fichaData[0].fecha_inicio_etapa_productiva.split("T")[0]
              : "",
            fecha_fin_ficha: fichaData[0].fecha_fin_ficha
              ? fichaData[0].fecha_fin_ficha.split("T")[0]
              : "",
            nombre_programa: fichaData[0].nombre_programa || "",
            id_modalidad_formacion: fichaData[0].id_modalidad || "",
            numero_documento_instructor_lider:
              fichaData[0].numero_documento_instructor_lider || "",
            nivel_formacion: fichaData[0].nivel_formacion || "",
            nombre_instructor_lider: fichaData[0].nombre_instructor_lider || "",
            email_instructor: fichaData[0].email_instructor_lider || "",
          });
          setFichaExistente(true);
          alert(
            "La ficha ya existe. Puedes agregar al aprendiz omitiendo este paso."
          );
        } else {
          console.error("Los datos recibidos no son válidos.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const resetFormacionFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fecha_inicio_ficha: "",
      fecha_fin_lectiva: "",
      fecha_inicio_etapa_productiva: "",
      fecha_fin_ficha: "",
      nombre_programa: "",
      id_modalidad_formacion: "",
      numero_documento_instructor_lider: "",
      nivel_formacion: "",
      nombre_instructor_lider: "",
      email_instructor: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );
    if (!allFieldsFilled || Object.values(errors).some((error) => error)) {
      alert(
        "Por favor, verifique los datos ingresados antes de enviar el formulario."
      );
      return; // Detener el envío del formulario si hay errores o campos vacíos
    }
    try {
      const res = await fetch("http://localhost:4000/insertaraprendiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (res.ok) {
        alert("Aprendiz creado correctamente");
        navigate("/adjudicados");
      } else {
        alert("Ocurrió un error, inténtelo de nuevo por favor...");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div style={{ background: "#dfdada" }}>
        <div
          className="insert_aprendiz"
          style={{
            margin: "auto",
            background: "#f8f8f8",
            maxWidth: "1200px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="titulos mt-3">Adjudicar nuevo aprendiz</h3>

          <form
            className="container"
            onSubmit={handleSubmit}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <BackIcon />
            <Datos_aprendiz handleChange={handleChange} errors={errors} />
            <h4 className="mt-3 text-center">Datos de Formación</h4>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="codigo_ficha"
                  name="codigo_ficha"
                  label="Código de ficha"
                  variant="outlined"
                  value={formData.codigo_ficha}
                  onChange={handleChange}
                  onBlur={() => {
                    handleCodigoFichaBlur();
                    resetFormacionFields();
                  }}
                  error={!!errors.codigo_ficha}
                  helperText={errors.codigo_ficha}
                  required
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.id_modalidad_formacion}>
                  <InputLabel id="tipo-documento-label">
                    Modalidad de formación
                  </InputLabel>
                  <Select
                    labelId="tipo-documento-label"
                    id="id_modalidad_formacion"
                    name="id_modalidad_formacion"
                    value={formData.id_modalidad_formacion}
                    onChange={handleChange}
                    label="Modalidad de formación"
                    required
                    disabled={fichaExistente}
                  >
                    <MenuItem value={1}>Presencial</MenuItem>
                    <MenuItem value={2}>Virtual</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.id_modalidad_formacion}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.nivel_formacion}>
                  <InputLabel id="nivel-formacion-label">
                    Nivel de formación
                  </InputLabel>
                  <Select
                    labelId="nivel-formacion-label"
                    id="nivel_formacion"
                    name="nivel_formacion"
                    value={formData.nivel_formacion}
                    onChange={handleChange}
                    label="Nivel de formación"
                    required
                    disabled={fichaExistente}
                  >
                    <MenuItem value="Técnico">Técnico</MenuItem>
                    <MenuItem value="Tecnólogo">Tecnólogo</MenuItem>
                  </Select>
                  <FormHelperText>{errors.nivel_formacion}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="fecha_inicio_ficha"
                  name="fecha_inicio_ficha"
                  label="Fecha inicio ficha"
                  variant="outlined"
                  value={formData.fecha_inicio_ficha}
                  onChange={handleChange}
                  error={!!errors.fecha_inicio_ficha}
                  helperText={errors.fecha_inicio_ficha}
                  required
                  type="date"
                  disabled={fichaExistente}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="fecha_fin_lectiva"
                  name="fecha_fin_lectiva"
                  label="Fecha fin lectiva"
                  variant="outlined"
                  value={formData.fecha_fin_lectiva}
                  onChange={handleChange}
                  error={!!errors.fecha_fin_lectiva}
                  helperText={errors.fecha_fin_lectiva}
                  required
                  type="date"
                  disabled={fichaExistente}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="fecha_inicio_etapa_productiva"
                  name="fecha_inicio_etapa_productiva"
                  label="Fecha inicio productiva"
                  variant="outlined"
                  value={formData.fecha_inicio_etapa_productiva}
                  onChange={handleChange}
                  error={!!errors.fecha_inicio_etapa_productiva}
                  helperText={errors.fecha_inicio_etapa_productiva}
                  required
                  type="date"
                  disabled={fichaExistente}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="nombre_programa"
                  name="nombre_programa"
                  label="Nombre programa de formación"
                  variant="outlined"
                  value={formData.nombre_programa}
                  onChange={handleChange}
                  error={!!errors.nombre_programa}
                  helperText={errors.nombre_programa}
                  required
                  disabled={fichaExistente}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="fecha_fin_ficha"
                  name="fecha_fin_ficha"
                  label="Fecha fin ficha"
                  variant="outlined"
                  value={formData.fecha_fin_ficha}
                  onChange={handleChange}
                  error={!!errors.fecha_fin_ficha}
                  helperText={errors.fecha_fin_ficha}
                  required
                  type="date"
                  disabled={fichaExistente}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="numero_documento_instructor_lider"
                  name="numero_documento_instructor_lider"
                  label="Número documento instructor líder"
                  variant="outlined"
                  value={formData.numero_documento_instructor_lider}
                  onChange={handleChange}
                  error={!!errors.numero_documento_instructor_lider}
                  helperText={errors.numero_documento_instructor_lider}
                  required
                  disabled={fichaExistente}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="nombre_instructor_lider"
                  name="nombre_instructor_lider"
                  label="Nombre completo instructor líder"
                  variant="outlined"
                  value={formData.nombre_instructor_lider}
                  onChange={handleChange}
                  error={!!errors.nombre_instructor_lider}
                  helperText={errors.nombre_instructor_lider}
                  required
                  disabled={fichaExistente}
                  inputProps={{
                    maxLength: 150,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="email_instructor"
                  name="email_instructor"
                  label="Correo Electrónico instructor"
                  variant="outlined"
                  value={formData.email_instructor}
                  onChange={handleChange}
                  error={!!errors.email_instructor}
                  helperText={errors.email_instructor}
                  required
                  disabled={fichaExistente}
                  inputProps={{
                    maxLength: 100,
                  }}
                />
              </Grid>
            </Grid>
            <Datos_beneficio handleChange={handleChange} errors={errors} />
            <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained">
                Enviar
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};

export default Insert_aprendiz;
