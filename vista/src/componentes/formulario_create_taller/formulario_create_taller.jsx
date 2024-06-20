import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import { validateField } from "../validaciones/validaciones";
import "./styles.css";

const Formulario_create_taller = () => {
  const navigate = useNavigate();

  // Estado para almacenar los valores del formulario y los errores
  const [formData, setFormData] = useState({
    nombre_taller: "",
    fecha_taller: "",
  });

  const [errors, setErrors] = useState({
    nombre_taller: "",
    fecha_taller: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si hay errores antes de enviar el formulario
    if (errors.nombre_taller || errors.fecha_taller) {
      alert("Por favor, verifique los datos ingresados antes de enviar el formulario.");
      return; // Detener el envío del formulario si hay errores
    }

    try {
      const response = await fetch("http://localhost:4000/creaciontaller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Taller creado exitosamente");
        navigate('  /talleres');
      } else {
        setResult("Error en la solicitud");
        if (response.status === 400) {
          const errorData = await response.json();
          setErrors({ ...errors, nombre_taller: errorData.error });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error en la solicitud");
    }
  };

  return (
    <div className="container_creacion vh-100" maxWidth="md">
      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
        <Box className="container-foto">
          <img src="../../../public/images/IMG_20240409_151909058_HDR_AE.jpg" className="login-image" alt="Login" />
        </Box>
        <Box className="container_crea_taller" ml={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
          <BackIcon />

            <h5 className="titulo text-center ">
              CREACIÓN DE TALLER MENSUAL
            </h5>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                margin="normal"
                label="Nombre del Taller"
                name="nombre_taller"
                value={formData.nombre_taller}
                onChange={handleChange}
                error={!!errors.nombre_taller}
                helperText={errors.nombre_taller}
              />
              <TextField
                required
                fullWidth
                margin="normal"
                type="date"
                label="Fecha"
                InputLabelProps={{ shrink: true }}
                name="fecha_taller"
                value={formData.fecha_taller}
                onChange={handleChange}
                error={!!errors.fecha_taller}
                helperText={errors.fecha_taller}
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
              />
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#50bb1b", color: "#fefefe" }}
                >
                  Crear
                </Button>
              </Box>
              {result && (
                <Typography variant="body2" color="error" align="center" mt={2}>
                  {result}
                </Typography>
              )}
            </form>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Formulario_create_taller;
