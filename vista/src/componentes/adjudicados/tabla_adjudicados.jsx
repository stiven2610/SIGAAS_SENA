import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../botones/Boton";
import "./styles.css";
import Registro_cancelados from "../registro_cancelados/Registro_cancelados";
import Update_aprendiz from "../update_aprendiz/update_aprendiz";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";
const Tabla_adjudicados = () => {
  const navigate = useNavigate();
  const [datosNovedad, setDatosNovedad] = useState(null);
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarCancelar, setMostrarCancelar] = useState(false);
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(null);

  const formularioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:4000/adjudicados")
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
    if (mostrarFormulario && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mostrarFormulario]);

  useEffect(() => {
    if (mostrarCancelar && formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mostrarCancelar]);

  const handleBusquedaChange = (e) => {
    setFiltroBusqueda(e.target.value);
  };

  const handleEditarClick = (aprendiz) => {
    setAprendizSeleccionado(aprendiz);
    setMostrarFormulario(true);
  };

  const handleOpenForm = (aprendiz) => {
    setDatosNovedad(aprendiz);
    setMostrarCancelar(true);
  };

  const handleCloseForm = () => {
    setMostrarFormulario(false);
    setAprendizSeleccionado(null);
  };

  const handleCloseFormNovedad = () => {
    setMostrarCancelar(false);
    setAprendizSeleccionado(null);
  };

  const filteredDatos = datos.filter((item) => {
    return (
      item.nombre_completo_aprendiz
        .toLowerCase()
        .includes(filtroBusqueda.toLowerCase()) ||
      String(item.numero_documento_aprendiz).includes(String(filtroBusqueda))
    );
  });

  return (
    <>
    <div className="container_adjudicados text-center">
      <div className="container_adjudicados_table text-center">
        <div className="container-busqueda">
          
          <div className="busqueda">
            <TextField
              id="busqueda"
              label="Buscar Aprendiz"
              variant="outlined"
              size="small"
              fullWidth
              value={filtroBusqueda}
              onChange={handleBusquedaChange}
              sx={{ mr: 2 }}
            />
          </div>
        <h4 className="titulos">APRENDICES ADJUDICADOS</h4>

          <div className="add">
            <Tooltip title="Adjudicar un aprendiz">
              <Button variant="contained" endIcon={<AddBoxIcon />}>
                Nuevo
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="adjudicados">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>GESTIONAR</TableCell>
                  <TableCell>Nombre Completo del Aprendiz</TableCell>
                  <TableCell>Tipo de Documento</TableCell>
                  <TableCell>Número de Documento</TableCell>
                  <TableCell>Estado de Aprendiz</TableCell>
                  <TableCell>Obligación Mensual</TableCell>
                  <TableCell>Código de Ficha</TableCell>
                  <TableCell>Nombre Programa</TableCell>
                  <TableCell>Nombre Beneficio</TableCell>
                  <TableCell>Modalidad</TableCell>
                  <TableCell>Teléfono Fijo</TableCell>
                  <TableCell>Teléfono Móvil</TableCell>
                  <TableCell>Dirección de Residencia del Aprendiz</TableCell>
                  <TableCell>Correo Electrónico del Aprendiz</TableCell>
                  <TableCell>Fecha de Adjudicación</TableCell>
                  <TableCell>Fecha inicio de ficha</TableCell>
                  <TableCell>Fecha fin lectiva</TableCell>
                  <TableCell>Fecha inicio productiva</TableCell>
                  <TableCell>Fecha fin ficha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cargando ? (
                  <TableRow>
                    <TableCell colSpan={18}>Cargando datos...</TableCell>
                  </TableRow>
                ) : (
                  filteredDatos.map((item) => (
                    <TableRow key={item.numero_documento_aprendiz}>
                      <TableCell>
                        <div className="iconos_gestion d-flex flex-column align-items-center">
                          <Tooltip title="Actualizar datos">
                            <IconButton onClick={() => handleEditarClick(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Suspender o cancelar">
                            <IconButton onClick={() => handleOpenForm(item)}>
                              <ArrowCircleDownIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell>{item.nombre_completo_aprendiz}</TableCell>
                      <TableCell>{item.nombre_documento}</TableCell>
                      <TableCell>{item.numero_documento_aprendiz}</TableCell>
                      <TableCell>{item.nombre_estado_aprendiz}</TableCell>
                      <TableCell>{item.nombre_obligacion_mensual}</TableCell>
                      <TableCell>{item.codigo_ficha}</TableCell>
                      <TableCell>{item.nombre_programa}</TableCell>
                      <TableCell>{item.nombre_beneficio}</TableCell>
                      <TableCell>{item.nombre_modalidad}</TableCell>
                      <TableCell>{item.numero_telefono_fijo}</TableCell>
                      <TableCell>{item.numero_telefono_movil}</TableCell>
                      <TableCell>
                        {item.direccion_residencia_aprendiz}
                      </TableCell>
                      <TableCell>{item.email_aprendiz}</TableCell>
                      <TableCell>
                        {new Date(item.fecha_adjudicacion).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(item.fecha_inicio_ficha).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(item.fecha_fin_lectiva).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          item.fecha_inicio_etapa_productiva
                        ).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(item.fecha_fin_ficha).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {mostrarFormulario && aprendizSeleccionado && (
            <div ref={formularioRef} className="container_edicion">
              <Update_aprendiz
                aprendiz={aprendizSeleccionado}
                id_tipo_documento={aprendizSeleccionado.id_tipo_documento}
                id_estado_aprendiz={aprendizSeleccionado.id_estado_aprendiz}
              />
              <div onClick={handleCloseForm}>
                <Boton texto="Cancelar" textcolor="#fffff" color="#fa4711" />
              </div>
            </div>
          )}
          {mostrarCancelar && datosNovedad && (
            <div ref={formularioRef} className="container_edicion">
              {datosNovedad && datosNovedad.nombre_completo_aprendiz && (
                <Registro_cancelados datosNovedad={datosNovedad} />
              )}
              <div onClick={handleCloseFormNovedad}>
                <Boton texto="Cancelar" textcolor="#ffffff" color="#fa4711" />
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default Tabla_adjudicados;
