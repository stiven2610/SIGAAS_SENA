import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Boton from "../botones/Boton";
import { TextField } from "@mui/material";
import "./styles.css";

const Formulario_contacto = () => {
  const formulario_inicial = {
    nombre: "",
    asunto: "",
    email: "",
    mensaje: "",
  };

  const [formulario, setFormulario] = useState(formulario_inicial);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "nombre" && value.trim().length < 10) {
      errorMessage = "El nombre debe tener al menos 10 caracteres";
    } else if (name === "asunto" && value.trim().length < 15) {
      errorMessage = "El asunto es muy corto";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      errorMessage = "El correo electrónico no es válido";
    } else if (name === "mensaje" && value.trim().length < 30) {
      errorMessage = "El mensaje debe ser un poco más descriptivo";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/contactanos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });
      if (!res.ok) {
        throw new Error("Error al enviar el formulario");
      } else {
        alert(
          "Correo enviado pronto tendrá respuesta por parte del equipo de bienestar"
        );
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="container-contactanos">
        <div className="contacto-foto">
          <img src="../../../public/bienestar1.jpg" className="login-image" />
        </div>
        <form className="container_form-contacto" onSubmit={handleSubmit}>
          <h5>Contáctanos</h5>
          <div className="input">
            <TextField
              id="nombre"
              name="nombre"
              label="Nombre Completo"
              variant="outlined"
              fullWidth
              value={formulario.nombre}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.nombre}
              helperText={errors.nombre}
              required
            />
          </div>
          <div className="input">
            <TextField
              id="asunto"
              name="asunto"
              label="Asunto"
              variant="outlined"
              fullWidth
              value={formulario.asunto}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.asunto}
              helperText={errors.asunto}
              required
            />
          </div>
          <div className="input">
            <TextField
              id="email"
              name="email"
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              value={formulario.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </div>
          <div className="input">
            <TextField
              id="mensaje"
              name="mensaje"
              label="Mensaje"
              variant="outlined"
              fullWidth
              multiline
              rows={5} 
              value={formulario.mensaje}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!errors.mensaje}
              helperText={errors.mensaje}
              required
            />
          </div>
          <Boton
            texto="Enviar"
            color="#39A900"
            textcolor="#f8f8f8"
            tamaño="20%"
          />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Formulario_contacto;
