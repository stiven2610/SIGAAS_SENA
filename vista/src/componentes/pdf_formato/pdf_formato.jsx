import { Grid, Paper, Typography } from "@mui/material";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import "./styles.css";
const Ver_pdf = () => {
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
      </Page>
    </Document>
  );
};

export default Ver_pdf;
