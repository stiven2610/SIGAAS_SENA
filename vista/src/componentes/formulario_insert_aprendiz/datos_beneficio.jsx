
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";

const Datos_beneficio = ({ handleChange, errors }) => {
  const [datos, setDatos] = useState([]);
  const [codigoBeneficio, setCodigoBeneficio] = useState(""); // Estado para código de beneficio
  const [idObligacionMensual, setIdObligacionMensual] = useState(""); // Estado para id de obligación mensual

  useEffect(() => {
    fetch("http://localhost:4000/get_beneficios")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setDatos(data.data);
        } else {
          console.error("Los datos recibidos no son válidos.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);

  return (
    <>
      <h4 className="text-center mt-3">Datos de beneficio</h4>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth error={!!errors.id_obligacion_mensual}>
            <InputLabel id="tipo-obligacion-label">Obligación mensual</InputLabel>
            <Select
              labelId="tipo-obligacion-label"
              id="id_obligacion_mensual"
              name="id_obligacion_mensual"
              onChange={(e) => {
                handleChange(e);
                setIdObligacionMensual(e.target.value); // Actualiza el estado local
              }}
              required
              value={idObligacionMensual} // Valor del estado controlado
            >
              <MenuItem value="">Selecciona...</MenuItem>
              <MenuItem value="1">Taller mensual</MenuItem>
              <MenuItem value="2">Plan de actividades</MenuItem>
            </Select>
            {errors.id_obligacion_mensual && (
              <FormHelperText>{errors.id_obligacion_mensual}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="numero_resolucion_adjudicacion"
            name="numero_resolucion_adjudicacion"
            label="Número de Resolución de Adjudicación"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.numero_resolucion_adjudicacion}
            helperText={errors.numero_resolucion_adjudicacion}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="fecha_adjudicacion"
            name="fecha_adjudicacion"
            label="Fecha de adjudicación"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.fecha_adjudicacion}
            helperText={errors.fecha_adjudicacion}
            required
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth error={!!errors.codigo_beneficio}>
            <InputLabel id="tipo-beneficio-label">Seleccionar beneficio</InputLabel>
            <Select
              labelId="tipo-beneficio-label"
              id="codigo_beneficio"
              name="codigo_beneficio"
              onChange={(e) => {
                handleChange(e);
                setCodigoBeneficio(e.target.value); // Actualiza el estado local
              }}
              required
              value={codigoBeneficio} // Valor del estado controlado
            >
              <MenuItem value="">Selecciona...</MenuItem>
              {datos.map((item) => (
                <MenuItem key={item.codigo_beneficio} value={item.codigo_beneficio}>
                  {item.nombre_beneficio}
                </MenuItem>
              ))}
            </Select>
            {errors.codigo_beneficio && (
              <FormHelperText>{errors.codigo_beneficio}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Datos_beneficio;