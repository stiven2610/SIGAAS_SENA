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
              <p className="m-4 text-muted">
              Es una estrategia que contribuye a brindar servicios a los aprendices en formación de los programas técnicos y tecnológicos de las modalidades , presencial, virtual y a distancia con el fin de promover acciones que permitan fortalecer sus competencias y habilidades socioemocionales, deportivas, artísticas, de liderazgo, culturales , brindar información sobre la promoción de la salud y prevención de la enfermedad, ofrecer apoyos socioeconómicos para el mejoramiento de su calidad de vida y la satisfacción de culminar  su proceso formativo  con éxito.
              </p>
            </div>
          </div>

          <div className="container-carousel row">
            <div className="carousel col-md-12 ">
              <Carousel interval={3000}>
                <Carousel.Item>
                  <img
                    className="img-carousel"
                    src="../../../public/images/IMG_20240524_155518852_AE.jpg"
                    alt="Imagen 1"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="img-carousel"
                    src="../../../public/images/IMG_20240430_171151646_AE.jpg"
                    alt="Imagen 2"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="img-carousel"
                    src="../../../public/images/IMG_20240214_164502930_AE.jpg"
                    alt="Imagen 2"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="img-carousel"
                    src="../../../public/images/SAVE_20230929_173601.jpg"
                    alt="Imagen 2"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
         
          <div className="container-objetivos row m-4 text-center">
            <h5 className="titulos ">
              Información bienestar
            </h5>
            {datos.map((item) => (
              <div className="col-md-4" key={item.id_informacion}>
                <div className="col-md-12 mt-2">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="titulo">{item.titulo}</h4>
                      <p className="card-text">{item.contenido}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="container-informacion row m-3 mt-4">
            <h3 className="titulos p-3 text-center w-100">
            Objetivos Plan de Bienestar al Aprendiz
             
            </h3>
            {objetivos.map((item, index) => (
              <div className="col-lg-4 col-md-6 " key={index}>
                <div className="card m-1 h-100">
                  <div className="card-body">
                    <h4 className="titulo text-center">{item.titulo_objetivo}</h4>
                    <p className="card-text">{item.contenido_objetivo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
      <div className="container-equipo row mt-3 text-center">
            <h3 className="titulos m-3">Equipo de Bienestar al Aprendiz</h3>
            {equipo.map((item, index) => (
              <div className="col-md-4 mb-3 d-flex justify-content-center" key={index}>
                <div className="border rounded p-2 shadow  ">
                  <div
                    style={{
                      width: "250px",
                      height: "270px",
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
      <Footer />
    </>
  );
};

export default Inicio;
