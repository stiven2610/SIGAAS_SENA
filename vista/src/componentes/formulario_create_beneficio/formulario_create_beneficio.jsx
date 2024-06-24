import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import "./styles.css";

const FormularioCreateBeneficio = () => {
  const navigate = useNavigate();
  const [beneficio, setBeneficio] = useState({
    nombre_beneficio: "",
    cupos_beneficio: "",
    fecha_inicio_beneficio: "",
    fecha_fin_beneficio: "",
  });

  const [errors, setErrors] = useState({
    nombre_beneficio: "",
    cupos_beneficio: "",
    fecha_inicio_beneficio: "",
    fecha_fin_beneficio: "",
  });

  const [successMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/create_beneficio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beneficio),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const fieldWithError = errorData.field;
        setErrors({
          ...errors,
          [fieldWithError]: errorData.message,
        });
      } else {
        alert("Beneficio creado exitosamente");
        navigate("/adjudicados");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar mínimo de caracteres
    if (name === "nombre_beneficio" && value.trim().length < 10) {
      setErrors({
        ...errors,
        [name]: "El nombre del beneficio es muy corto",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Validar que no sea solo espacios en blanco
    if (name === "nombre_beneficio" && value.trim() === "") {
      setErrors({
        ...errors,
        [name]: "El nombre del beneficio no puede estar vacío",
      });
    }

    setBeneficio({ ...beneficio, [name]: value });
  };

  return (
    <>
      <div className="dividir">
        <div className="container_beneficio">
         
          <div className="form_beneficio">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <BackIcon />
            <Typography>CREACIÓN DE BENEFICIO</Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Nombre beneficio"
                name="nombre_beneficio"
                variant="outlined"
                required
                value={beneficio.nombre_beneficio}
                onChange={handleChange}
                error={!!errors.nombre_beneficio}
                helperText={errors.nombre_beneficio}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Ingrese número de cupos"
                name="cupos_beneficio"
                type="number"
                variant="outlined"
                required
                value={beneficio.cupos_beneficio}
                onChange={handleChange}
                error={!!errors.cupos_beneficio}
                helperText={errors.cupos_beneficio}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Fecha inicio"
                name="fecha_inicio_beneficio"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={beneficio.fecha_inicio_beneficio}
                onChange={handleChange}
                error={!!errors.fecha_inicio_beneficio}
                helperText={errors.fecha_inicio_beneficio}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Fecha fin"
                name="fecha_fin_beneficio"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={beneficio.fecha_fin_beneficio}
                onChange={handleChange}
                error={!!errors.fecha_fin_beneficio}
                helperText={errors.fecha_fin_beneficio}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3, bgcolor: "#41be07", color: "#fefefe" }}
              >
                Crear
              </Button>
              {successMessage && (
                <Typography variant="body2" color="success">
                  {successMessage}
                </Typography>
              )}
            </form>
          </div>
        </div>
        <div className="contain-foto">
          <img
            src="..//images/Foto - Google Fotos_files/IMG_20240517_105802748_AE.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default FormularioCreateBeneficio;
