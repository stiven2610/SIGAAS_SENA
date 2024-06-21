
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import BackIcon from "../backIcon/BackIcon";

const Suspendidos = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fetchSuspendidos = () => {
    setCargando(true);
    fetch("http://localhost:4000/get_suspendidos")
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
  };

  const reactivar_aprendiz = (numero_documento_aprendiz) => {
    const confirmacion = window.confirm("¿Desea reactivar el aprendiz?");
    
    if (!confirmacion) {
      return; // Si el usuario cancela, no hacemos nada
    }
   
    fetch(`http://  localhost:4000/reactivaraprendiz/${numero_documento_aprendiz}`, {
      method: 'PUT', // Usa PUT o POST según el diseño de tu API
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al reactivar el aprendiz");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Aprendiz reactivado exitosamente");
          // Volver a obtener la lista actualizada de aprendices suspendidos
          fetchSuspendidos();
        } else {
          console.error("Los datos recibidos no son válidos.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  useEffect(() => {
    fetchSuspendidos();
  }, []);

  return (
    <>
      <div className="container_insert vh-100">
        <div className="table-container">
          <h4 className="titulos">APRENDICES SUSPENDIDOS</h4>
          <BackIcon />
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Nombre Completo del Aprendiz</th>
                  <th>Código de Ficha</th>
                  <th>Tipo de Documento</th>
                  <th>Número de Documento</th>
                  <th>Motivo de suspensión</th>
                  <th>Fecha de inicio de suspensión</th>
                  <th>Fecha limite de suspensión</th>
                  <th>Acciones </th>
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
                      <td>{item.nombre_documento}</td>
                      <td>{item.numero_documento_aprendiz}</td>
                      <td>{item.nombre_motivo_suspension}</td>
                      <td>
                        {new Date(
                          item.fecha_inicio_suspension
                        ).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        {new Date(item.fecha_fin_suspension).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td>
                        <Tooltip title="Reactivar aprendiz">
                          <IconButton onClick={() => reactivar_aprendiz(item.numero_documento_aprendiz)}>
                            <ArrowUpwardIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
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

export default Suspendidos;
