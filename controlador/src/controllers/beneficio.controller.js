/*const pool = require("../db.js");
const xlsx = require("xlsx");
const moment = require("moment");
*/
const get_beneficios = async (req,res) => {
const  {
  codigo_beneficio,
  nombre_beneficio
} = req.body;

try {
  const {rows} = await pool.query( 'SELECT codigo_beneficio,nombre_beneficio FROM beneficio')
  res.json({succes: true,
  data: rows})
} catch (error) {
  console.log("Error en la consulta")
  res.status(500).json({succes: false , message: 'Error en la consulta'})
}

}

const create_beneficio = async (req, res) => {
  const { nombre_beneficio,fecha_inicio_beneficio,fecha_fin_beneficio,cupos_beneficio } = req.body;

  try {
    const insertQuery = "SELECT * FROM fun_ins_ben($1, $2, $3, $4)";
    const insertValues = [nombre_beneficio,fecha_inicio_beneficio,fecha_fin_beneficio,cupos_beneficio];
      
    const result = await pool.query(insertQuery, insertValues);
    const insercion_exitosa = result.rows[0];

    if (insercion_exitosa)
      {
        res.status(200).json({ message: "Beneficio creado exitosamente" });
      }else {
        res.status(400)
      }
  } catch (error) {
    console.error("Error al crear el beneficio:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
/*
const crearBeneficio = async (req, res, next) => {
  const {
    codigo_beneficio,
    cupos_beneficio,
    fecha_inicio_beneficio,
    fecha_fin_beneficio,
    archivo_excel,
  } = req.body;

  // Ruta del archivo de Excel
  const filePath = archivo_excel; // Reemplaza esto con la ruta de tu archivo

  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Comenzar la transacción

    // Verificar si el beneficio ya existe en la base de datos
    const validarBeneficio = await client.query(
      "SELECT * FROM beneficio WHERE codigo_beneficio = $1",
      [codigo_beneficio]
    );

    if (validarBeneficio.rows.length === 0) {
      const resultBeneficio = await client.query(
        "INSERT INTO beneficio (codigo_beneficio,fecha_inicio_beneficio, fecha_fin_beneficio,cupos_beneficio) VALUES ($1, $2, $3, $4) RETURNING *",
        [
          codigo_beneficio,
          fecha_inicio_beneficio,
          fecha_fin_beneficio,
          cupos_beneficio,
        ]
      );
      // Leer el archivo de Excel
      const workbook = xlsx.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, {
        raw: false,
      });
      // Función para convertir el formato de fecha de 'MM/DD/YY' a 'YYYY-MM-DD'
      function convertirFecha(fechaStr) {
        const partes = fechaStr.split("/");
        const año = partes[2];
        const mes = partes[0].padStart(2, "0");
        const dia = partes[1].padStart(2, "0");
        return `${año}-${mes}-${dia}`;
      }

      // Eliminar espacios en blanco al principio de las claves en el objeto JSON
      jsonData.forEach((row) => {
        for (const key in row) {
          if (Object.hasOwnProperty.call(row, key)) {
            const newKey = key.trim();
            row[newKey] = row[key];
            if (newKey !== key) {
              delete row[key];
            }
          }
        }
      });
      // Iterar sobre los datos extraídos y guardarlos en la base de datos
      for (const row of jsonData) {
        const {
          NUMERO_DOCUMENTO: numero_documento_aprendiz,
          CODIGO_FICHA: codigo_ficha,
          TIPO_DOCUMENTO: tipo_documento,
          NOMBRE_COMPLETO: nombre_completo_aprendiz,
          "FECHA ADJUDICACION": fecha_adjudicacion,
          "CORREO ELECTRONICO": email_aprendiz,
          "TELEFONO FIJO": numero_telefono_fijo,
          "TELEFONO MOVIL": numero_telefono_movil,
          "DIRECCION DE RESIDENCIA": direccion_residencia_aprendiz,
          "FECHA INICIO FICHA": fecha_inicio_ficha,
          "FECHA FIN FICHA": fecha_fin_ficha,
          "NOMBRE DEL PROGRAMA": nombre_programa,
        } = row;
        const fechaConvertida = convertirFecha(fecha_adjudicacion);
        const fechaConvertidaFin = convertirFecha(fecha_inicio_ficha);
        const fechaConvertidaInicio = convertirFecha(fecha_fin_ficha);
        // Insertar el beneficio en la tabla 'beneficio'
        // Realizar la consulta para verificar si la ficha ya existe
        const existeFichaQuery = "SELECT * FROM ficha WHERE codigo_ficha = $1";
        const existeFichaResult = await client.query(existeFichaQuery, [
          codigo_ficha,
        ]);

        // Realizar la inserción en la tabla 'ficha'
        const resultFicha = await client.query(
          "INSERT INTO ficha (codigo_ficha,fecha_inicio_ficha, fecha_fin_ficha, nombre_programa) VALUES ($1, $2, $3, $4) RETURNING *",
          [
            codigo_ficha,
            fechaConvertidaInicio,
            fechaConvertidaFin,
            nombre_programa,
          ]
        );

        const resultAprendiz = await client.query(
          "INSERT INTO aprendiz (numero_documento_aprendiz,codigo_ficha,codigo_beneficio, tipo_documento, nombre_completo_aprendiz, fecha_adjudicacion, numero_telefono_fijo, numero_telefono_movil, direccion_residencia_aprendiz,email_aprendiz) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10) RETURNING *",
          [
            numero_documento_aprendiz,
            codigo_ficha,
            codigo_beneficio,
            tipo_documento,
            nombre_completo_aprendiz,
            fechaConvertida,
            numero_telefono_fijo,
            numero_telefono_movil,
            direccion_residencia_aprendiz,
            email_aprendiz,
          ]
        );
        // Imprimir los datos del aprendiz recién insertado
        console.log("Datos del aprendiz insertado:");
        console.log(resultAprendiz.rows[0]); // Debes adaptar esto según la estructura de tu resultado
      }

      await client.query("COMMIT"); // Confirmar la transacción

      // Imprimir los datos obtenidos
      console.log("Datos extraídos del archivo Excel:");
      console.log(jsonData);

      // Enviar respuesta exitosa
      res
        .status(200)
        .json({ success: true, message: "Beneficio creado exitosamente" });
    } else {
      // Enviar respuesta de error si el beneficio ya existe
      res.status(400).json({
        success: false,
        message: "El beneficio ya existe...",
        field: "codigo_beneficio",
      });
    }
  } catch (error) {
    await client.query("ROLLBACK"); // Revertir la transacción en caso de error
    console.error("Error en la transacción:", error);
    res
      .status(500)
      .json({ success: false, message: "Error en la transacción" });
  } finally {
    client.release();
  }
};

module.exports = {
  crearBeneficio,
};
*/
const xlsx = require("xlsx");
const pool = require("../db");

// Ruta del archivo de Excel

const extraerDatosExcel = async (req) => {
  const {
    archivo_excel,
  } = req.body;
  
  const filePath = archivo_excel; // Reemplaza esto con la ruta de tu archivo

  try {
    // Leer el archivo de Excel
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, {
      raw: false,
    });

    // Imprimir los datos extraídos
    console.log("Datos extraídos del archivo Excel:");
    console.log(jsonData);

    return jsonData;
  } catch (error) {
    console.error("Error al extraer datos del archivo Excel:", error);
    throw error;
  }
};

module.exports = {
  extraerDatosExcel,
  get_beneficios,
  create_beneficio
};
