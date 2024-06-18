import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Boton from "../botones/Boton";
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
  const  navigate = useNavigate();
console.log(formulario)
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
        alert("Correo enviado pronto tendra respuesta por parte del equipo de bienestar");
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
    <div className="container_contacta">
      <div className="container-contactanos">
        <h3 className="titulos">Contáctanos</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="subtitulos">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingresa tu nombre completo"
            value={formulario.nombre}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`form-control ${errors.nombre && "is-invalid"}`}
            required
          />
          {errors.nombre && (
            <span className="invalid-feedback">{errors.nombre}</span>
          )}
          <label htmlFor="asunto" className="subtitulos">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            placeholder="Ingresa el asunto de tu solicitud"
            value={formulario.asunto}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`form-control ${errors.asunto && "is-invalid"}`}
            required
          />
          {errors.asunto && (
            <span className="invalid-feedback">{errors.asunto}</span>
          )}
          <label htmlFor="email" className="subtitulos">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formulario.email}
            placeholder="Ingresa tu correo electronico"
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`form-control ${errors.email && "is-invalid"}`}
            required
          />
          {errors.email && (
            <span className="invalid-feedback">{errors.email}</span>
          )}
          <label htmlFor="mensaje" className="subtitulos">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Ingrese un mensaje describiendo el motivo de su contacto"
            value={formulario.mensaje}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`form-control mb-3 ${errors.mensaje && "is-invalid"}`}
            required
          />
          {errors.mensaje && (
            <span className="invalid-feedback">{errors.mensaje}</span>
          )}
          <Boton
            texto="Enviar"
            color="#39A900"
            texcolor="#f8f8f8#"
            tamaño="20%"
          />
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Formulario_contacto;
