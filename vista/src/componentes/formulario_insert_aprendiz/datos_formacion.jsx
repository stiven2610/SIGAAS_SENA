
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import { validateField } from "../validaciones/validaciones";

const Datos_formacion = ({ handleChange, errors }) => {
  const [fichaExistente, setFichaExistente] = useState(false);
  const [formData, setFormData] = useState({
    codigo_ficha: "",
    id_modalidad_formacion: "",
    fecha_inicio_ficha: "",
    fecha_fin_ficha: "",
    nivel_formacion: "",
    nombre_programa: "",
    numero_documento_instructor_lider: "",
    nombre_instructor_lider: "",
    email_instructor: "",
  });

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
          setFormData((prevFormData) => ({
            ...prevFormData,
            codigo_ficha: fichaData[0].codigo_ficha || "",
            fecha_inicio_ficha: fichaData[0].fecha_inicio_ficha
              ? fichaData[0].fecha_inicio_ficha.split("T")[0]
              : "",
              fecha_fin_lectiva: fichaData[0].fecha_fin_lectiva
              ? fichaData[0].fecha_fin_lectiva.split("T")[0]
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
          }));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log("Formulario válido. Enviando datos...", formData);
    } else {
      console.log("Formulario inválido. Corrige los errores.");
    }
  };

  const validate = () => {
    let tempErrors = {};
    for (let field in formData) {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        tempErrors[field] = errorMessage;
      }
    }
    // Actualizar el estado de errores
   
    // Validar si no hay errores
    return Object.keys(tempErrors).length === 0;
  };

  const handleChangeLocal = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado local
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Llamar a la función handleChange del padre para actualizar el estado global
    handleChange(e);
  };

  return (
   <>
      <p className="titulos text-center">Datos de Formación</p>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="codigo_ficha"
              name="codigo_ficha"
              label="Código de ficha"
              variant="outlined"
              value={formData.codigo_ficha}
              onChange={handleChangeLocal}
              onBlur={handleCodigoFichaBlur}
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
                onChange={handleChangeLocal}
                required
                disabled={fichaExistente}
              >
                <MenuItem value="">Selecciona...</MenuItem>
                <MenuItem value="1">Presencial</MenuItem>
                <MenuItem value="2">Virtual</MenuItem>
              </Select>
              {errors.id_modalidad_formacion && (
                <FormHelperText>{errors.id_modalidad_formacion}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="fecha_inicio_ficha"
              name="fecha_inicio_ficha"
              label="Fecha inicio de la ficha"
              variant="outlined"
              value={formData.fecha_inicio_ficha}
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.fecha_inicio_ficha}
              helperText={errors.fecha_inicio_ficha}
              required
              type="date"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="fecha_fin_lectiva"
              name="fecha_fin_lectiva"
              label="Fecha fin de lectiva"
              variant="outlined"
              value={formData.fecha_fin_lectiva}
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.fecha_fin_lectiva}
              helperText={errors.fecha_fin_lectiva}
              required
              type="date"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="fecha_fin_ficha"
              name="fecha_fin_ficha"
              label="Fecha fin de formación"
              variant="outlined"
              value={formData.fecha_fin_ficha}
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.fecha_fin_ficha}
              helperText={errors.fecha_fin_ficha}
              required
              type="date"
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={!!errors.nivel_formacion}>
              <InputLabel id="tipo-documento-label">
                Nivel de formación
              </InputLabel>
              <Select
                labelId="tipo-documento-label"
                id="nivel_formacion"
                name="nivel_formacion"
                value={formData.nivel_formacion}
                onChange={handleChangeLocal}
                required
                disabled={fichaExistente}
              >
                <MenuItem value="">Selecciona...</MenuItem>
                <MenuItem value="Técnico">Técnico</MenuItem>
                <MenuItem value="Tecnólogo">Tecnólogo</MenuItem>
              </Select>
              {errors.nivel_formacion && (
                <FormHelperText>{errors.nivel_formacion}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="nombre_programa"
              name="nombre_programa"
              label="Nombre programa de formación"
              variant="outlined"
              value={formData.nombre_programa}
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.nombre_programa}
              helperText={errors.nombre_programa}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="fecha_inicio_productiva"
              name="fecha_inicio_productiva"
              label="Fecha inicio productiva"
              variant="outlined"
              value={formData.fecha_inicio_etapa_productiva}
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.fecha_inicio_etapa_productiva}
              helperText={errors.fecha_inicio_etapa_productiva}
              required
              type="date"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="numero_documento"
              name="numero_documento_instructor_lider"
              label="Número documento instructor líder"
              variant="outlined"
              value={formData.numero_documento_instructor_lider}
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.numero_documento_instructor_lider}
              helperText={errors.numero_documento_instructor_lider}
              required
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
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} // Añadido por mí
              error={!!errors.nombre_instructor_lider}
              helperText={errors.nombre_instructor_lider}
              required
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
              onChange={handleChangeLocal}
              onBlur={handleChangeLocal} 
              error={!!errors.email_instructor}
              helperText={errors.email_instructor}
              required
            />
          </Grid>
        </Grid>

      </form>
   </> 

  );
};

export default Datos_formacion;