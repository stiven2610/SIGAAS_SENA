
import { useEffect, useState } from "react";
import "./styles.css";
import BackIcon from "../backIcon/BackIcon";
import Datos_aprendiz from "../formulario_insert_aprendiz/datos_aprendiz";
import Datos_formacion from "../formulario_insert_aprendiz/datos_formacion";
const Aprendices_cancelados = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/cancelados")
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

  return (
    <>
    <div className="container_insert vh-100">
      <div className="table-container">
      <h4 className="titulos">APRENDICES CANCELADOS</h4>
<BackIcon/>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre Completo del Aprendiz</th>
                <th>Código de Ficha</th>
                <th>Tipo de Documento</th>
                <th>Número de Documento</th>
                <th>Número de Resolución</th>
                <th>Fecha de Cancelación</th>
                <th>Motivo de Cancelación</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="21">Cargando datos...</td>
                </tr>
              ) : (
                datos.map((item) => (
                  <tr key={item.numero_documento_aprendiz}>
        
                    <td>{item.nombre_completo_aprendiz}</td>
                    <td>{item.codigo_ficha}</td>
                    <td>{item.nombre_tipo_documento}</td>
                    <td>{item.numero_documento_aprendiz}</td>
                    <td>{item.numero_resolucion}</td>
                    <td>{new Date(item.fecha_cancelacion).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}</td>
                    <td>{item.nombre_motivo_suspension}</td>
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

export default Aprendices_cancelados;