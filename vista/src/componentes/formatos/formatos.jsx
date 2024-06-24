
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import BackIcon from "../backIcon/BackIcon";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from "react-router-dom";
const Get_Formatos = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
const navigate = useNavigate()
  const fetchFormatos = () => {
    setCargando(true);
    fetch("http://localhost:4000/get_formatos")
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

  useEffect(() => {
    fetchFormatos();
  }, []);

  return (
    <>
      <div className="container_insert vh-100">
        <div className="table-container">
          <h4 className="titulos">Formatos registrados</h4>
          <BackIcon />
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Aprendiz</th>
                  <th>Fecha formato</th>
                  <th>Código de Ficha</th>
                  <th>Tipo de Documento</th>
                  <th>Número de Documento</th>
                  <th>Instructor</th>
                  <th>Número de documento</th>
                  <th>Correó instructor</th>
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
                      <td> {new Date(
                          item.fecha_formato
                        ).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}</td>
                      <td>{item.codigo_ficha}</td>
                      <td>{item.nombre_documento}</td>
                      <td>{item.numero_documento_aprendiz}</td>
                      <td>{item.nombre_instructor_lider}</td>
                      <td>{item.nombre_documento_instructor}</td>
                      <td>{item.email_instructor}</td>
                      <td>
                        <Tooltip title="Generar formato">
                          <IconButton onClick={() => navigate("/ver_formato")}>
                            <PictureAsPdfIcon />
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

export default Get_Formatos;
