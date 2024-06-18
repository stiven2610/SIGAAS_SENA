
const pool = require("../db.js");

const obtenerNovedades = async (req, res, next) => {
  try {
    // Realiza la consulta a la base de datos
    const { rows } = await pool.query('select a.id_novedad, a.numero_documento_aprendiz,f.nombre_documento,a.fecha_novedad,b.nombre_tipo_novedad,c.nombre_completo_aprendiz,e.codigo_ficha,e.nombre_programa,h.nombre_estado_aprendiz FROM novedad AS a , tipo_novedad AS b , aprendiz AS c ,tipo_documento AS f, ficha AS e, estado_aprendiz AS h WHERE a.id_tipo_novedad = b.id_tipo_novedad AND a.numero_documento_aprendiz = c.numero_documento_aprendiz AND  e.codigo_ficha = c.codigo_ficha AND c.id_estado_aprendiz = h.id_estado_aprendiz AND c.id_tipo_documento = f.id_tipo_documento ORDER BY a.id_novedad DESC;');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}
const insert_suspendido = async (req,res)=>{
  const {
    numero_documento_aprendiz,
    id_motivo_suspension,
    numero_resolucion,
    codigo_ficha
  } = req.body;
  console.log(req.body)
  try {
    const  result = await pool.query("SELECT * FROM fun_ins_apr_sus($1, $2,$3,$4)", [
      numero_documento_aprendiz,
      id_motivo_suspension,
      numero_resolucion,
      codigo_ficha
    ]);
    // Acceder a las variables booleanas por separado
    const { insercion_exitosa } = result.rows[0];

  // Hacer algo con las variables
  console.log('¿Se realizó la inserción?', insercion_exitosa);
  
  if (insercion_exitosa) {
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
    
  }
}
module.exports = { obtenerNovedades,insert_suspendido};