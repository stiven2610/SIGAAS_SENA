const pool = require("../db");
const CryptoJS = require('crypto-js');
const send_credenciales_instructor = require('./correo_instructor'); // Ajusta la ruta según tu estructura de archivos
const contra_random = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let aleatoria = '';
  for (let i = 0; i < 8; i++) {
    aleatoria += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return aleatoria;
};


const  contra_aleatoria = contra_random();
console.log(contra_aleatoria)
const password = CryptoJS.MD5(contra_aleatoria).toString();
console.log(password)
const insert_aprendiz = async (req, res, next) => {
  const {
    numero_documento_aprendiz,
    codigo_ficha,
    id_tipo_documento,
    id_obligacion_mensual,
    numero_resolucion_adjudicacion,
    codigo_beneficio,
    nombre_completo_aprendiz,
    fecha_adjudicacion,
    numero_telefono_fijo,
    numero_telefono_movil,
    direccion_residencia_aprendiz,
    email_aprendiz,
    id_modalidad_formacion,
    fecha_inicio_ficha,
    fecha_fin_lectiva,
    fecha_inicio_etapa_productiva,
    fecha_fin_ficha,
    nivel_formacion,
    nombre_programa,
    numero_documento_instructor_lider,
    nombre_instructor_lider,
    email_instructor
  } = req.body;
  console.log(req.body)
try {
  const result = await pool.query(
    "SELECT * FROM fun_ins_apr($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,$22,$23)",
    [
      numero_documento_aprendiz,
      codigo_ficha,
      id_tipo_documento,
      id_obligacion_mensual,
      numero_resolucion_adjudicacion,
      codigo_beneficio,
      nombre_completo_aprendiz,
      fecha_adjudicacion,
      numero_telefono_fijo,
      numero_telefono_movil,
      direccion_residencia_aprendiz,
      email_aprendiz,
      id_modalidad_formacion,
      fecha_inicio_ficha,
      fecha_fin_lectiva,
      fecha_inicio_etapa_productiva,
      fecha_fin_ficha,
      nivel_formacion,
      nombre_programa,
      numero_documento_instructor_lider,
      nombre_instructor_lider,
      email_instructor,
      password
    ]
  );

  // Acceder a las variables booleanas por separado
  const { ficha_existe,instructor_existe, aprendiz_existe, insercion_realizada } = result.rows[0];
  console.log(result.rows[0]);
  if (insercion_realizada) {
    if(!instructor_existe){
      send_credenciales_instructor(nombre_instructor_lider,contra_aleatoria,email_instructor,numero_documento_instructor_lider)
      
    }
    return res.status(200).json({
      success: true,
      message: "¡Inserción de datos realizada con éxito!"
    });
  } else {
    return res.status(400).json({
      success: false,
      error: "Error al insertar datos, inténtelo nuevamente."
    });
  }
} catch (error) {
  next(error);
}
}
module.exports = {
  insert_aprendiz
};
