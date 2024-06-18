import { useEffect, useState } from "react";
import Boton from "../botones/Boton";
import "./styles.css";
import Nav_instructor from "../nav_index/nav_instructor";
import { TextField } from "@mui/material";

const RegistroNovedadesFormato = () => {
  const [datos, setDatos] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/adjudicados")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setDatos(data.data);
        } else {
          console.error("Los datos recibidos no son válidos.");
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    if (filtroBusqueda) {
      const aprendizEncontrado = datos.find(
        (item) => String(item.numero_documento_aprendiz) === filtroBusqueda
      );
      setAprendizSeleccionado(aprendizEncontrado || null);
    } else {
      setAprendizSeleccionado(null);
    }
  }, [filtroBusqueda, datos]);

  const handleBusquedaChange = (e) => {
    setFiltroBusqueda(e.target.value);
  };

  const renderFormulario = () => {
    if (!aprendizSeleccionado) return null;

    switch (aprendizSeleccionado.id_obligacion_mensual) {
      case 1:
        return (
          <form>
            <p className="titulos">Aprendiz realizando taller mensual</p>
            <table className="table table-bordered">
              <thead>
                <tr className="encabezado">
                  <th>Evaluación del aprendiz</th>
                  <th>SI</th>
                  <th>NO</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    El aprendiz cumple con las actividades correspondientes de su formación
                  </td>
                  <td>
                    <input type="radio" name="actividadesCumplidas" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="actividadesCumplidas" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    El aprendiz presenta a tiempo sus evidencias de su aprendizaje
                  </td>
                  <td>
                    <input type="radio" name="evidenciasPresentadas" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="evidenciasPresentadas" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>El aprendiz ha asistido a comité académico</td>
                  <td>
                    <input type="radio" name="asistenciaComite" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="asistenciaComite" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>El aprendiz ha tenido llamados de atención</td>
                  <td>
                    <input type="radio" name="llamadosAtencion" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="llamadosAtencion" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="boton_novedad">
              <Boton texto="Registrar" color="#41be07" />
            </div>
          </form>
        );
      case 2:
        return (
          <form>
            <p className="titulos">Aprendiz realizando plan de actividades</p>
            <table className="table table-bordered">
              <thead>
                <tr className="encabezado">
                  <th>Evaluación del aprendiz</th>
                  <th>SI</th>
                  <th>NO</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    El aprendiz cumple con las competencias actitudinales, como disciplina,
                    responsabilidad, puntualidad y honestidad en el desarrollo de su actividad como gestor monitor.
                  </td>
                  <td>
                    <input type="radio" name="actividadesCumplidas" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="actividadesCumplidas" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    El aprendiz cumple con el desempeño técnico requerido en el desarrollo de la actividad como gestor monitor.
                  </td>
                  <td>
                    <input type="radio" name="evidenciasPresentadas" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="evidenciasPresentadas" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    El aprendiz ha presentado llamados de atención en el desarrollo de su actividad como gestor monitor.
                  </td>
                  <td>
                    <input type="radio" name="asistenciaComite" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="asistenciaComite" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="boton_novedad">
              <Boton texto="Registrar" color="#41be07" />
            </div>
          </form>
        );
      case 3:
        return (
          <form>
            <p className="titulos">Aprendiz realizando proyecto productivo</p>
            <table className="table table-bordered">
              <thead>
                <tr className="encabezado">
                  <th>Evaluación del aprendiz</th>
                  <th>SI</th>
                  <th>NO</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>El aprendiz cumple con las competencias actitudinales, y comportamentales correspondientes a la Etapa Productiva (Proyecto Productivo).</td>
                  <td>
                    <input type="radio" name="competenciasActitudinales" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="competenciasActitudinales" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>El aprendiz cumple con el desempeño técnico requerido en el desarrollo del Proyecto Productivo.</td>
                  <td>
                    <input type="radio" name="desempenoTecnico" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="desempenoTecnico" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
                <tr>
                  <td>El aprendiz ha presentado llamados de atención en el desarrollo de la Etapa Productiva (Proyecto Productivo).</td>
                  <td>
                    <input type="radio" name="llamadosAtencion" value="si" />
                  </td>
                  <td>
                    <input type="radio" name="llamadosAtencion" value="no" />
                  </td>
                  <td>
                    <TextField
                      id="outlined-textarea"
                     
                      multiline
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="boton_novedad">
              <Boton texto="Registrar" color="#41be07" />
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Nav_instructor />
      <div className="padre">
        <p className="titulos text-center mt-4">
          REGISTRO DE FORMATO DE SEGUIMIENTO MENSUAL
        </p>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nombre Completo del Aprendiz</th>
              <th>Tipo de Documento</th>
              <th>Número de Documento</th>
              <th>Estado de Aprendiz</th>
              <th>Obligación Mensual</th>
              <th>Código de Ficha</th>
              <th>Modalidad</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="7">Cargando datos...</td>
              </tr>
            ) : (
              aprendizSeleccionado && (
                <tr key={aprendizSeleccionado.numero_documento_aprendiz}>
                  <td>{aprendizSeleccionado.nombre_completo_aprendiz}</td>
                  <td>{aprendizSeleccionado.nombre_documento}</td>
                  <td>{aprendizSeleccionado.numero_documento_aprendiz}</td>
                  <td>{aprendizSeleccionado.nombre_estado_aprendiz}</td>
                  <td>{aprendizSeleccionado.nombre_obligacion_mensual}</td>
                  <td>{aprendizSeleccionado.codigo_ficha}</td>
                  <td>{aprendizSeleccionado.nombre_modalidad}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="container_novedades col-md-8">
          <div className="form-group mb-2 text-center">
            <div className="input-group">
              <input
                type="text"
                id="busqueda"
                className="form-control m-1"
                value={filtroBusqueda}
                onChange={handleBusquedaChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  Buscar
                </button>
              </div>
            </div>
          </div>
          {renderFormulario()}
        </div>
      </div>
    </>
  );
};

export default RegistroNovedadesFormato;
