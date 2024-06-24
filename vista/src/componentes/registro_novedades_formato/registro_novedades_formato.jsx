import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Boton from "../botones/Boton";
import Nav_instructor from "../nav_index/nav_instructor";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";

const RegistroNovedadesFormato = () => {
  const [datos, setDatos] = useState([]);
  const [item, setItem] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [itemsEstado, setItemsEstado] = useState({});
  const [observaciones, setObservaciones] = useState({});
  const [areaActividad, setAreaActividad] = useState("");
const navigate = useNavigate()
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
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setItem(data.data);
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

  const handleItemChange = (index, value) => {
    setItemsEstado((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleObservacionChange = (index, value) => {
    setObservaciones((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleAreaActividadChange = (e) => {
    setAreaActividad(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!aprendizSeleccionado) return;

    const payload = {
      numero_documento_aprendiz: aprendizSeleccionado.numero_documento_aprendiz,
      numero_documento_instructor_lider: "1235467", // Cambia esto según sea necesario
      codigo_ficha: aprendizSeleccionado.codigo_ficha,
      id_obligacion_mensual: aprendizSeleccionado.id_obligacion_mensual,
      area_actividad: areaActividad,
      item_uno: itemsEstado[0] || false,
      item_dos: itemsEstado[1] || false,
      item_tres: itemsEstado[2] || false,
      item_cuatro: itemsEstado[3] || false,
      observacion_uno: observaciones[0] || "",
      observacion_dos: observaciones[1] || "",
      observacion_tres: observaciones[2] || "",
      observacion_cuatro: observaciones[3] || ""
    };

    console.log(payload);

    try {
      const res = await fetch("http://localhost:4000/registroformato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        alert("No se registró el formato");
        throw new Error("Error al enviar el formulario");
      } else {
        alert("Formato registrado correctamente");
        navigate("/registronovedad")
        setFiltroBusqueda("")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const renderFormulario = () => {
    if (!aprendizSeleccionado) return null;

    const itemsFiltrados = item.filter(
      (i) => i.id_obligacion_mensual === aprendizSeleccionado.id_obligacion_mensual
    );

    return (
      <form onSubmit={handleSubmit}>
        <p className="titulos">{`Aprendiz realizando ${aprendizSeleccionado.nombre_obligacion_mensual}`}</p>
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
            {itemsFiltrados.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>
                  <input
                    type="radio"
                    name={`item_${index}`}
                    value="true"
                    checked={itemsEstado[index] === true}
                    onChange={() => handleItemChange(index, true)}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`item_${index}`}
                    value="false"
                    checked={itemsEstado[index] === false}
                    onChange={() => handleItemChange(index, false)}
                  />
                </td>
                <td>
                  <TextField
                    id={`outlined-textarea-${index}`}
                    multiline
                    value={observaciones[index] || ""}
                    onChange={(e) => handleObservacionChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="form-group">
          <label htmlFor="areaActividad">Área de Actividad:</label>
          <input
            type="text"
            id="areaActividad"
            className="form-control"
            value={areaActividad}
            onChange={handleAreaActividadChange}
          />
        </div>
        <div className="boton_novedad">
          <Boton texto="Registrar" color="#41be07" />
        </div>
      </form>
    );
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
/*
"SELECT a.numero_documento_aprendiz ,
a.numero_documento_instructor_lider ,
    a.codigo_ficha ,
    a.area_actividad ,
    b.item_uno ,
    b.item_dos ,
    b.item_tres ,
    b.item_cuatro ,
	b.observacion_uno ,
	b.observacion_dos ,
	b.observacion_tres ,
	b.observacion_cuatro ,
  c.nombre_completo_instructor_lider,
  d.nombre_completo_aprendiz,
  a.fecha_registro  FROM formato_registrado AS a, apartado_taller_mensual
    AS b, aprendiz AS D, instructor_lider AS C
    
    WHERE a.numero_documento_aprendiz  = d.nombre_completo_aprendiz 
     AND a.numero_documento_aprendiz  = b.numero_documento_aprendiz
     AND a.numero_documento_instructor_lider = c.numero_documento_instructor_lider  ORDER BY a.fecha_registro DESC"*/