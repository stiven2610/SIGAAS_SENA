import { Grid, Paper, Typography } from "@mui/material";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import "./styles.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const Ver_pdf = ({item}) => {
  console.log(item)
  const { id_formato_registrado } = useParams();

  useEffect(() => {
    console.log("ID del formato registrado:", id_formato_registrado);
    // Aquí puedes hacer la lógica para obtener y mostrar el PDF usando el id_formato_registrado
    // Por ejemplo, podrías hacer una solicitud para obtener los datos del PDF
  }, [id_formato_registrado]);
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="encabezado d-flex">
          <div className="image">
            <img src="/images/logo SENA.png" alt=" logo sena" />
          </div>
          <div className="nombre_formato">
            <p className="text-center">
              SERVICIO NACIONAL DE APRENDIZAJE SENA SISTEMA INTEGRADO DE GESTIÓN
              Y AUTOCONTROL Proceso: Gestión De Formación Profesional Integral
              Procedimiento: Bienestar Integral Al Aprendiz
            </p>
            <p>SEGUIMIENTO APOYO SOSTENIMIENTO REGULAR</p>
          </div>
          <div className="informacion_formato ">
            <div className="container_informacion">
              <p>Version: 1</p>
            </div>
            <div>
              <p className="informacion_formato">
                Fecha de actualización: 17/03/2023
              </p>
            </div>
            <div>
              <p className="informacion_formato">
                Documento de Apoyo: Centro de Servicios Empresariales y
                Turísticos-Regional Santander
              </p>
            </div>
          </div>
        </div>
        <div className="datos">
          <div className="nombre_aprendiz">
            <div className="datos_label">
              <label htmlFor="">Nombre del aprendiz:</label>
            </div>
            <div className="datos_label">
              <label htmlFor="">Programa de formación:</label>
            </div>
            <div className="datos_label_ficha">
              <div className="datos_label">
                <label htmlFor="">No. Ficha: </label>
              </div>
              <div className="datos_label">
                <label htmlFor="">Fecha:</label>
              </div>
            </div>
            <div className="datos_label">
              <label htmlFor="">Area donde desarolla la actividad:</label>
              <label htmlFor=""></label>
            </div>
          </div>
        </div>
        <div className="tabla_evaluacion">
          <p>1.Espacio destinado para diligenciar el instructor (a)</p>

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
              <tr>
                <td>
                  El aprendiz cumple con las actividades correspondientes de su
                  formación
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  El aprendiz presenta a tiempo sus evidencias de su aprendizaje
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>El aprendiz ha asistido a comité académico</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>El aprendiz ha tenido llamados de atención</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="footer">
            <p className="p-2">
              Firma Instructor: ________________________________________________
            </p>
            <p className="p-2">
              Nombre Instructor: __________________________________________
            </p>
          </div>
        </div>
        <div className="tabla_evaluacion">
          <p>2 -Espacio destinado para Servidor Público encargado del área:</p>
          <p>
            NOTA: Si el aprendiz asiste a talleres programados por el área de
            Bienestar al Aprendiz. Favor no diligenciar este espacio
          </p>
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
              <tr>
                <td>
                  El aprendiz cumple con las competencias actitudinales, como
                  disciplina, responsabilidad, <br />
                  puntualidad y honestidad enel desarrollo de su actividad como
                  gestor monitor.
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  El aprendiz cumple con el desempeño técnico requerido en el
                  desarrollo de la actividad <br />
                  como gestor monitor.
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  El aprendiz ha presentado llamados de atención en el
                  desarrollo de su actividad como gestor monitor.
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="footer">
            <p className="p-2">
              Nombre del servidor público:
              ________________________________________________
            </p>
            <p className="p-2">
              Firma del servidor público:
              __________________________________________
            </p>
          </div>
        </div>
        <div className="tabla_evaluacion">
          <p>
            3 -Espacio destinado para aprendices que se encuentren en Etapa
            Productiva desarrollando su modalidad de: (Proyecto Productivo).
          </p>

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
              <tr>
                <td>
                  El aprendiz cumple con las competencias actitudinales, y
                  comportamentales correspondientes a la <br />
                  Etapa Productiva (Proyecto Productivo).
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  El aprendiz cumple con el desempeño técnico requerido en el
                  desarrollo del Proyecto Productivo.
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  El aprendiz ha presentado llamados de atención en el
                  desarrollo de la Etapa Productiva (Proyecto Productivo).
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="footer">
            <p className="p-2">
              Nombre del servidor público: <br /> unidad de emprendimiento
              ________________________________________________
            </p>
            <p className="p-2">
              Firma del servidor público: <br />unidad de emprendimiento
              __________________________________________
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};

export default Ver_pdf;
