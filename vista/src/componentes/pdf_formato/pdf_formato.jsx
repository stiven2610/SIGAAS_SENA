import { Document, Page } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

const Ver_pdf = () => {
  const { id_formato_registrado } = useParams();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/get_formato_pdf/${id_formato_registrado}`)
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
  }, [id_formato_registrado]);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  console.log(datos);

  const renderTable = (idObligacion, title, rows) => {
    return (
      <div className="tabla_evaluacion">
        <p>{title}</p>
        <table className="evaluation-table">
          <thead>
            <tr>
              <th>EVALUACIÓN DEL APRENDIZ</th>
              <th>SI</th>
              <th>NO</th>
              <th>OBSERVACIONES</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.text}</td>
                {datos[0].id_obligacion_mensual == idObligacion ? (
                  <>
                    <td>{datos[0][row.item] ? 'x' : ''}</td>
                    <td>{datos[0][row.item] ? '' : 'x'}</td>
                    <td>{datos[0][row.observacion]}</td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="firma_section">
          <div className="firma_label  ">
            <label htmlFor="">
              Nombre: {datos[0].id_obligacion_mensual == idObligacion ? datos[0].nombre_instructor_lider : "________________________"}
            </label>
          </div>
          <div className="firma_label">
            <label htmlFor="">
              Firma: {datos[0].id_obligacion_mensual == idObligacion ? datos[0].firma : "________________________"}
            </label>
          </div>
        </div>
      </div>
    );
  };

  const rows1 = [
    { text: "El aprendiz cumple con las actividades correspondientes de su formación", item: "item_uno", observacion: "observacion_uno" },
    { text: "El aprendiz presenta a tiempo sus evidencias de su aprendizaje", item: "item_dos", observacion: "observacion_dos" },
    { text: "El aprendiz ha asistido a comité académico", item: "item_tres", observacion: "observacion_tres" },
    { text: "El aprendiz ha tenido llamados de atención", item: "item_cuatro", observacion: "observacion_cuatro" }
  ];

  const rows2 = [
    { text: "El aprendiz cumple con las competencias actitudinales, como disciplina, responsabilidad, puntualidad y honestidad en el desarrollo de su actividad como gestor monitor.", item: "item_uno", observacion: "observacion_uno" },
    { text: "El aprendiz cumple con el desempeño técnico requerido en el desarrollo de la actividad como gestor monitor.", item: "item_dos", observacion: "observacion_dos" },
    { text: "El aprendiz ha presentado llamados de atención en el desarrollo de su actividad como gestor monitor.", item: "item_tres", observacion: "observacion_tres" }
  ];

  const rows3 = [
    { text: "El aprendiz cumple con las competencias actitudinales y comportamentales correspondientes a la Etapa Productiva (Proyecto Productivo).", item: "item_uno", observacion: "observacion_uno" },
    { text: "El aprendiz cumple con el desempeño técnico requerido en el desarrollo del Proyecto Productivo.", item: "item_dos", observacion: "observacion_dos" },
    { text: "El aprendiz ha presentado llamados de atención en el desarrollo de la Etapa Productiva (Proyecto Productivo).", item: "item_tres", observacion: "observacion_tres" }
  ];

  return (
    <Document>
      <Page size="A4" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <div className="encabezado d-flex">
          <div className="image">
            <img src="/images/logo SENA.png" alt="logo sena" />
          </div>
          <div className="nombre_formato">
            <p className="text-center">
              SERVICIO NACIONAL DE APRENDIZAJE SENA SISTEMA INTEGRADO DE GESTIÓN Y AUTOCONTROL Proceso: Gestión De Formación Profesional Integral Procedimiento: Bienestar Integral Al Aprendiz
            </p>
            <p>SEGUIMIENTO APOYO SOSTENIMIENTO REGULAR</p>
          </div>
          <div className="informacion_formato ">
            <div className="container_informacion">
              <p>Version: 1</p>
            </div>
            <div>
              <p className="informacion_formato">Fecha de actualización: 17/03/2023</p>
            </div>
            <div>
              <p className="informacion_formato">Documento de Apoyo: Centro de Servicios Empresariales y Turísticos-Regional Santander</p>
            </div>
          </div>
        </div>
        <div className="datos">
          <div className="nombre_aprendiz">
            <div className="datos_label">
              <label htmlFor="">Nombre del aprendiz: {datos[0].nombre_completo_aprendiz}</label>
            </div>
            <div className="datos_label">
              <label htmlFor="">Programa de formación: {datos[0].nombre_programa}</label>
            </div>
            <div className="datos_label_ficha">
              <div className="datos_label">
                <label htmlFor="">No. Ficha:  {datos[0].codigo_ficha}</label>
              </div>
              <div className="datos_label">
                <label htmlFor="">Fecha: {new Date(datos[0].fecha_formato).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })}</label>
              </div>
            </div>
            <div className="datos_label">
              <label htmlFor="">Area donde desarrolla la actividad: {datos[0].area_actividad}</label>
            </div>
          </div>
        </div>

        {renderTable(1, "1. Espacio destinado para diligenciar el instructor (a)", rows1)}
        {renderTable(2, "2. Espacio destinado para Servidor Público encargado del área:", rows2)}
        {renderTable(3, "3. Espacio destinado para aprendices que se encuentren en Etapa Productiva desarrollando su modalidad de: (Proyecto Productivo).", rows3)}
      </Page>
    </Document>
  );
};

export default Ver_pdf;
