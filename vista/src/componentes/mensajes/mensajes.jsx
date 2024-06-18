
import { useEffect, useState } from "react";
import BackIcon from "../backIcon/BackIcon";

const Mensajes = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    fetch("http://localhost:4000/get_mensajes")
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
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <>
      <div className="container_insert vh-100">
        <div className="table-container">
          <h4 className="titulos">Mensajes</h4>
          <BackIcon />
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Nombre completo</th>
                  <th>Asunto</th>
                  <th>Correo electrónico</th>
                  <th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td colSpan="4">Cargando datos...</td>
                  </tr>
                ) : (
                  datos.map((item) => (
                    <tr key={item.id_mensaje}>
                      <td>{item.nombre}</td>
                      <td>{item.asunto}</td>
                      <td>
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td>{item.mensaje}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mensajes;