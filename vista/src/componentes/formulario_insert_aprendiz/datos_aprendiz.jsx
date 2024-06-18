
import React, { useEffect } from "react";
import { Grid, FormControl, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material";
import { useState } from "react"; // Asegúrate de importar useState

const Datos_aprendiz = ({ handleChange, errors, documentos }) => {
  const [documentosOptions, setDocumentosOptions] = useState([]); // Estado local para almacenar los documentos

  useEffect(() => {
    fetch("http://localhost:4000/get_documentos")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setDocumentosOptions(data.data); // Almacena los documentos obtenidos en el estado local
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
      <p className="titulos text-center">Datos del aprendiz</p>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="nombre_completo_aprendiz"
              name="nombre_completo_aprendiz"
              label="Nombre completo aprendiz"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.nombre_completo_aprendiz}
              helperText={errors.nombre_completo_aprendiz}
              required
              inputProps={{
                maxLength: 150, 
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.id_tipo_documento}>
              <InputLabel id="tipo-documento-label">Tipo de documento</InputLabel>
              <Select
                labelId="tipo-documento-label"
                id="id_tipo_documento"
                name="id_tipo_documento"
                onChange={handleChange}
                required
              >
                <MenuItem value="">Selecciona...</MenuItem>
                {documentosOptions.map((item) => ( // Utiliza documentosOptions para mostrar las opciones
                  <MenuItem key={item.id_tipo_documento} value={item.id_tipo_documento}>
                    {item.nombre_documento}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_tipo_documento && (
                <FormHelperText>{errors.id_tipo_documento}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="numero_documento_aprendiz"
              name="numero_documento_aprendiz"
              label="Número documento aprendiz"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.numero_documento_aprendiz}
              helperText={errors.numero_documento_aprendiz}
              required
              inputProps={{
                maxLength: 10, 
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="numero_telefono_fijo"
              name="numero_telefono_fijo"
              label="Número teléfono fijo"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.numero_telefono_fijo}
              helperText={errors.numero_telefono_fijo}
              required
              inputProps={{
                maxLength: 6, 
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="numero_telefono_movil"
              name="numero_telefono_movil"
              label="Número teléfono móvil"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.numero_telefono_movil}
              helperText={errors.numero_telefono_movil}
              required
              inputProps={{
                maxLength: 10, 
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="direccion_residencia_aprendiz"
              name="direccion_residencia_aprendiz"
              label="Dirección de residencia del aprendiz"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.direccion_residencia_aprendiz}
              helperText={errors.direccion_residencia_aprendiz}
              required
              inputProps={{
                maxLength: 50, 
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="email_aprendiz"
              name="email_aprendiz"
              label="Correo electrónico del aprendiz"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.email_aprendiz}
              helperText={errors.email_aprendiz}
              type="email"
              required
              inputProps={{
                maxLength: 100, 
              }}
            />
          </Grid>
        </Grid>
    
</>
  );
};

export default Datos_aprendiz;