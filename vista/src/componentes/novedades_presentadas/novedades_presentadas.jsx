
import { useEffect, useState } from "react";
import Boton from "../botones/Boton";
import Registro_cancelados from "../registro_cancelados/Registro_cancelados";
import BackIcon from "../backIcon/BackIcon";
import "./styles.css";

const Novedades_presentadas = () => {
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
      <h4 className="titulos text-center">NOVEDADES PRESENTADAS</h4>
      <BackIcon/>

      <div className="container_filtros m-2">
        <label htmlFor="busqueda" className="subtitulos">
          Buscar Aprendiz:
        </label>
        <input
          type="text"
          id="busqueda"
          className="form-control m-1"
          value={filtroBusqueda}
          onChange={handleBusquedaChange}
        />
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Nombre Completo del Aprendiz</th>
            <th>Tipo de Documento</th>
            <th>Número de Documento</th>
            <th>Novedad</th>
            <th>Código de ficha</th>
            <th>Nombre Programa de formación</th>
            <th>Fecha Novedad</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr>
              <td colSpan="8">Cargando datos...</td>
            </tr>
          ) : (
            filteredDatos.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre_completo_aprendiz}</td>
                <td>{item.nombre_documento}</td>
                <td>{item.numero_documento_aprendiz}</td>
                <td>{item.nombre_tipo_novedad}</td>
                <td>{item.codigo_ficha}</td>
                <td>{item.nombre_programa}</td>
                <td>{new Date(item.fecha_novedad).toLocaleDateString(
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
  );
};

export default Novedades_presentadas;