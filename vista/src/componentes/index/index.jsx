
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Footer from "../Footer/Footer";
import "./styles.css";

const Inicio = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [objetivos, setObjetivos] = useState([]);
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/get_information")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setDatos(data.data);
          setCargando(false);
        } else {
          console.error("Los datos recibidos no son válidos.");
          setCargando(false);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/get_objetivos")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setObjetivos(data.data);
          setCargando(false);
        } else {
          console.error("Los datos recibidos no son válidos.");
          setCargando(false);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/get_equipo")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setEquipo(data.data);
          setCargando(false);
        } else {
          console.error("Los datos recibidos no son válidos.");
          setCargando(false);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setCargando(false);
      });
  }, []);

  return (
    <>
      <div className="container-inicio">
        <>
          <div className="row">
            <div className="col-md-12 text-center pt-4">
            <h3 className="titulos">¿ Qué es Bienestar al Aprendiz ?</h3>
              <p className=" m-2 text-muted">
                Es una estrategia institucional para contribuir en la
                permanencia y el desempeño exitoso de los aprendices de la
                entidad en su proceso formativo con enfoque territorial y
                diferencial.
              </p>
            </div>
          </div>

          <div className="container-carousel row">
            <div className="carousel col-md-12 ">
              <Carousel interval={3000}>
                <Carousel.Item>
                  <img
                    className="img-carousel"
                    src="https://www.wradio.com.co/resizer/cXRNhRWnP1qz5piF1R6Ulc-9_rc=/1024x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/prisaradioco/QGJ6WGMV45GD7GPAV2CTEKCSME.png"
                    alt="Imagen 1"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="img-carousel"
                    src="https://www.sena.edu.co/es-co/comunidades/aprendices/PublishingImages/Paginas/bienestarAprendiz/bienestar_SENA_600.jpg"
                    alt="Imagen 2"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          <div className="container-equipo row mt-3 text-center">
            <h3 className="titulos m-3">Equipo de Bienestar al Aprendiz</h3>
            {equipo.map((item, index) => (
              <div className="col-md-3 mb-4 aling-items." key={index}>
                <div className="border rounded p-2 shadow  d-flex flex-column align-items-center  justify-content-center">
                  <div
                    style={{
                      width: "200px",
                      height: "250px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={"http://localhost:4000/" + item.ruta_foto}
                      alt="Persona 1"
                      className="img-fluid"
                      style={{ width: "100%", height: "auto" }} // Establece el ancho al 100% para que la imagen se ajuste al contenedor
                    />
                  </div>
                  <h6>{item.nombre}  {item.apellido}</h6>
                  <p>{item.cargo}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="container-objetivos row m-4 text-center">
            <h3 className="titulos p-3">
              Objetivos Plan de Bienestar al Aprendiz
            </h3>
            {datos.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="col-md-12 mt-2">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="titulos">{item.titulo}</h4>
                      <p className="card-text">{item.contenido}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="container-informacion row m-3 mt-4">
            <h3 className="titulos p-3 text-center w-100">
             Información bienestar
            </h3>
            {objetivos.map((item, index) => (
              <div className="col-lg-4 col-md-6 " key={index}>
                <div className="card m-1 h-100">
                  <div className="card-body">
                    <h4 className="titulos">{item.titulo_objetivos}</h4>
                    <p className="card-text">{item.contenido_objetivos}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};

export default Inicio;