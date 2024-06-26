import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../backIcon/BackIcon";
import "./styles.css";

const Talleres = () => {
  const navigate = useNavigate();
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  const irCrearTaller = () => {
    navigate("/creaciondetaller");
  };

  useEffect(() => {
    fetch("http://localhost:4000/talleres")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setTalleres(data.data);
          setCargando(false);
        } else {
          console.error("Los datos recibidos no son válidos.");
          setCargando(false);
        }
      })
      .catch((error) => {
        console.error("Error al obtener talleres:", error);
        setCargando(false);
      });
  }, []);

  const handleClick = (codigo_taller, nombre_taller) => {
    navigate(`/asistencia/${codigo_taller}`, { state: { nombre_taller } });
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <Container className="container_insert vh-100" maxWidth="lg">
      <BackIcon />

      <Box my={4}>

        <h5 className="titulos text-center">
          TALLERES MENSUALES
        </h5>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            
            startIcon={<AddBoxIcon />}
            onClick={irCrearTaller}
          >
            Crear nuevo taller
          </Button>

          <TextField
            variant="outlined"
            placeholder="Buscar taller por nombre"
            value={busqueda}
            onChange={handleBusquedaChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="talleres table">
            <TableHead>
              <TableRow>
                <TableCell align="center">GESTIÓN</TableCell>
                <TableCell align="center">Nombre de taller</TableCell>
                <TableCell align="center">Fecha de taller</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cargando ? (
                <TableRow>
                  <TableCell colSpan="3" align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                talleres
                  .filter((taller) =>
                    taller.nombre_taller
                      .toLowerCase()
                      .includes(busqueda.toLowerCase())
                  )
                  .map((item) => (
                    <TableRow key={item.codigo_taller}>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Tooltip title="Ver asistencias">
                            <IconButton
                              onClick={() =>
                                handleClick(item.codigo_taller, item.nombre_taller)
                              }
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </IconButton>
                          </Tooltip>
                         
                        </Box>
                      </TableCell>
                      <TableCell align="center">{item.nombre_taller}</TableCell>
                      <TableCell align="center">
                        {new Date(item.fecha_taller).toLocaleDateString(
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
      </Box>
    </Container>
  );
};

export default Talleres;
