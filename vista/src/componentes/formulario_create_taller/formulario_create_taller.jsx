
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../botones/Boton";
import "./styles.css";
import BackIcon from "../backIcon/BackIcon";
import { validateField } from '../validaciones/validaciones';

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
        navigate('/talleres');
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
    <>
      <div className="container_insert vh-100">
        <p className="titulos">CREACIÓN DE TALLER MENSUAL</p>
        <BackIcon/>
        <form className="formulario_taller" onSubmit={handleSubmit}>
          <p className="titulos">TALLER</p>
          <label htmlFor="nombre_taller" className="subtitulos">
            Nombre
          </label>
          <input
            required
            type="text"
            className={`form-control form_input ${errors.nombre_taller && "is-invalid"}`}
            id="nombre_taller"
            name="nombre_taller"
            value={formData.nombre_taller}
            onChange={handleChange}
          />
          {errors.nombre_taller && (
            <span className="invalid-feedback">{errors.nombre_taller}</span>
          )}
          <label htmlFor="fecha_taller" className="subtitulos">
            Fecha
          </label>
          <input
            required
            type="date"
            className={`form-control form_input mb-3 ${errors.fecha_taller && "is-invalid"}`}
            id="fecha_taller"
            name="fecha_taller"
            min={new Date().toISOString().split("T")[0]} 
            value={formData.fecha_taller}
            onChange={handleChange}
          />
          {errors.fecha_taller && (
            <span className="invalid-feedback">{errors.fecha_taller}</span>
          )}
          <Boton className="boton_taller" texto="crear" tamaño="30%" textcolor="#fefefe" color="#50bb1b" />
          {result && <p>{result}</p>}
        </form>
      </div>
    </>
  );
};

export default Formulario_create_taller;