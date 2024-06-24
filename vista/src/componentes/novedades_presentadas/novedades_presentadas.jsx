import { useEffect, useState } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, IconButton } from "@mui/material";
import BackIcon from "../backIcon/BackIcon";  // Asegúrate de que BackIcon esté correctamente importado
import "./styles.css";

const NovedadesPresentadas = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [datosNovedad, setDatosNovedad] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  console.log(datosNovedad);
  
  useEffect(() => {
    fetch("http://localhost:4000/novedades")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setDatos(data.data);
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud de novedades:", error);
        setCargando(false);
      });
  }, []);

  const handleBusquedaChange = (e) => {
    setFiltroBusqueda(e.target.value);
  };

  const handleOpenForm = (index) => {
    setDatosNovedad(filteredDatos[index]);
    setMostrarFormulario(true);
  };

  const handleCloseForm = () => {
    setMostrarFormulario(false);
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
    <div className="container-novedades m-4">
      <Typography variant="h4" className="titulos text-center">NOVEDADES PRESENTADAS</Typography>
      <BackIcon />

      <div className="container_barra m-2">
        <Typography variant="subtitle1" className="subtitulos">
          Buscar Aprendiz:
        </Typography>
        <TextField
          id="busqueda"
          variant="outlined"
          fullWidth
          className="form-control m-1"
          value={filtroBusqueda}
          onChange={handleBusquedaChange}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo del Aprendiz</TableCell>
              <TableCell>Tipo de Documento</TableCell>
              <TableCell>Número de Documento</TableCell>
              <TableCell>Novedad</TableCell>
              <TableCell>Código de ficha</TableCell>
              <TableCell>Nombre Programa de formación</TableCell>
              <TableCell>Fecha Novedad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cargando ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredDatos.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.nombre_completo_aprendiz}</TableCell>
                  <TableCell>{item.nombre_documento}</TableCell>
                  <TableCell>{item.numero_documento_aprendiz}</TableCell>
                  <TableCell>{item.nombre_tipo_novedad}</TableCell>
                  <TableCell>{item.codigo_ficha}</TableCell>
                  <TableCell>{item.nombre_programa}</TableCell>
                  <TableCell>{new Date(item.fecha_novedad).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NovedadesPresentadas;
