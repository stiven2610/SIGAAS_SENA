
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import FormularioRegistroAsistenciaTaller from "../formulario_registro_asistencia_taller/formulario_registro_asistencia_taller";
import "./styles.css";

const Asistencia_taller = () => {
  const location = useLocation();
  const nombreTaller = location.state?.nombre_taller;
  const { codigo_taller } = useParams();
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Función para obtener la lista de asistencias
  const obtenerAsistencias = async () => {
    try {
      const response = await fetch(`http://localhost:4000/asistencias/${codigo_taller}`);
      if (!response.ok) {
        throw new Error("Error al obtener la lista de asistencias.");
      }
      const data = await response.json();
      setAsistencias(data.data || []);
      setCargando(false);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setCargando(false);
    }
  };

  // Función para actualizar la lista de asistencias después de registrar una nueva asistencia
  const actualizarAsistencias = () => {
    obtenerAsistencias();
  };

  useEffect(() => {
    obtenerAsistencias();
  }, [codigo_taller]);

  return (
    <div className="container_registro_asis ">
        <BackIcon />

      <div className="table_container_asistencia">
        <div>
          <FormularioRegistroAsistenciaTaller
            nombreTaller={nombreTaller}
            codigo_taller={codigo_taller}
            actualizarAsistencias={actualizarAsistencias} // Pasamos la función de actualización
          />
        </div>
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre de taller</th>
                <th>Número de documento</th>
                <th>Nombre completo del aprendiz</th>
                <th>Codigo de ficha</th>
                <th>Fecha asistencia</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="5">Cargando Datos...</td>
                </tr>
              ) : asistencias.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay asistencias registradas.</td>
                </tr>
              ) : (
                asistencias.map((item) => (
                  <tr key={item.id}>
                    <td>{nombreTaller}</td>
                    <td>{item.numero_documento_aprendiz}</td>
                    <td>{item.nombre_completo_aprendiz}</td>
                    <td>{item.codigo_ficha}</td>
                    <td>{new Date(item.fecha_insert).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Asistencia_taller;