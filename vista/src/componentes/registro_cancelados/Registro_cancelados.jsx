
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import Boton from "../botones/Boton";

const Registro_cancelados = ({ datosNovedad }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  console.log(formData);
  const [motivos, setMotivos] = useState([]);

  useEffect(() => {
    if (datosNovedad) {
      setFormData({
        nombre_completo_aprendiz: datosNovedad.nombre_completo_aprendiz || "",
        numero_documento_aprendiz: datosNovedad.numero_documento_aprendiz || "",
        nombre_programa: datosNovedad.nombre_programa || "",
        codigo_ficha: datosNovedad.codigo_ficha || "",
        id_motivo_suspension: "",
        numero_resolucion:""
      });
    }
  }, [datosNovedad]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://  localhost:4000/insert_suspendido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        alert("No se registro la suspensión")
        throw new Error("Error al enviar el formulario");
      } else {
        alert("Aprendiz suspendido del apoyo correctamente");
        navigate("  /novedades")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch("http://  localhost:4000/get_motivos_suspension")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setMotivos(data.data);
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
      <form className="container" onSubmit={handleSubmit} autoComplete="off">
        <BackIcon/>
        <div className="row">
          <div className="col-md-6 datos_beneficio">
            <div className="">
              <p className="titulos">SUSPENDER APRENDIZ</p>
              <div className="container_input">
                <label htmlFor="nombre_completo_aprendiz" className="">
                  Nombre Completo del Aprendiz
                </label>
                <input
                  name="nombre_completo_aprendiz"
                  onChange={handleChange}
                  type="text"
                  required
                  className={`form-control ${
                    errors && errors.nombre_completo_aprendiz && "is-invalid"
                  }`}
                  id="nombre_completo_aprendiz"
                  value={formData.nombre_completo_aprendiz || ""}
                />
                {errors && errors.nombre_completo_aprendiz && (
                  <span className="invalid-feedback">
                    {errors.nombre_completo_aprendiz}
                  </span>
                )}
              </div>

              <div className="container_input">
                <label htmlFor="numero_documento_aprendiz" className="">
                  Número de documento del aprendiz
                </label>
                <input
                  name="numero_documento_aprendiz"
                  onChange={handleChange}
                  type="text"
                  required
                  className={`form-control ${
                    errors && errors.numero_documento_aprendiz && "is-invalid"
                  }`}
                  id="numero_documento_aprendiz"
                  value={formData.numero_documento_aprendiz || ""}
                />
                {errors && errors.numero_documento_aprendiz && (
                  <span className="invalid-feedback">
                    {errors.numero_documento_aprendiz}
                  </span>
                )}
              </div>
              <div className="container_input">
                <label htmlFor="codigo_ficha" className="">
                  Código de ficha
                </label>
                <input
                  name="codigo_ficha"
                  onChange={handleChange}
                  type="text"
                  required
                  className={`form-control ${
                    errors && errors.codigo_ficha && "is-invalid"
                  }`}
                  id="codigo_ficha"
                  value={formData.codigo_ficha || ""}
                />
                {errors && errors.codigo_ficha && (
                  <span className="invalid-feedback">
                    {errors.codigo_ficha}
                  </span>
                )}
              </div>
              <div className="container_input">
                <label htmlFor="nombre_programa" className="">
                  Nombre programa de formación
                </label>
                <input
                  name="nombre_programa"
                  onChange={handleChange}
                  type="text"
                  required
                  className={`form-control ${
                    errors && errors.nombre_programa && "is-invalid"
                  }`}
                  id="nombre_programa"
                  value={formData.nombre_programa || ""}
                />
                {errors && errors.nombre_programa && (
                  <span className="invalid-feedback">
                    {errors.nombre_programa}
                  </span>
                )}
              </div>
              <div className="container_input">
                <label htmlFor="id_motivo_suspension" className="">
                  Motivo de suspensión
                </label>
                <select
                  name="id_motivo_suspension"
                  onChange={handleChange}
                  required
                  className={`form-control ${
                    errors.id_motivo_suspension && "is-invalid"
                  }`}
                  id="id_motivo_suspension"
                  value={formData.id_motivo_suspension}
                >
                  <option value="">Seleccione motivo de suspensión...</option>
                  {motivos.map((item) => (
                    <option
                      key={item.id_motivo_suspension}
                      value={item.id_motivo_suspension}
                    >
                      {item.nombre_motivo_suspension}
                    </option>
                  ))}
                </select>
                {errors.id_motivo_suspension && (
                  <span className="invalid-feedback">
                    {errors.id_motivo_suspension}
                  </span>
                )}
              </div>
              <div className="container_input">
                <label htmlFor="numero_resolucion" className="">
                  Número resolución
                </label>
                <input
                  name="numero_resolucion"
                  onChange={handleChange}
                  type="text"
                  required
                  className={`form-control ${
                    errors && errors.numero_resolucion && "is-invalid"
                  }`}
                  id="numero_resolucion"
                  value={formData.numero_resolucion || ""}
                />
                {errors && errors.numero_resolucion && (
                  <span className="invalid-feedback">
                    {errors.numero_resolucion}
                  </span>
                )}
              </div>
              <Boton texto="Enviar" color="#88fc45" tamaño="20%" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Registro_cancelados;