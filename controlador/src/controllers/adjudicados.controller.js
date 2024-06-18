
const pool = require("../db");

const obtenerAdjudicados =async (req, res,next) => {
  try {
    const { rows } = await pool.query('SELECT f.nombre_programa, a.id_tipo_documento,f.fecha_inicio_ficha ,f.fecha_inicio_etapa_productiva,f.fecha_fin_lectiva,f.fecha_fin_ficha,a.id_estado_aprendiz,a.numero_documento_aprendiz, a.nombre_completo_aprendiz,a.codigo_ficha, g.nombre_modalidad, b.nombre_documento, c.nombre_estado_aprendiz, d.id_obligacion_mensual,d.nombre_obligacion_mensual, a.numero_resolucion_adjudicacion,  e.nombre_beneficio,  a.fecha_adjudicacion,  a.numero_telefono_fijo, a.numero_telefono_movil, a.direccion_residencia_aprendiz, a.email_aprendiz FROM  aprendiz AS a,  tipo_documento AS b,   estado_aprendiz AS c,  obligacion_mensual AS d,  beneficio AS e,  ficha AS f,  modalidad AS g WHERE   a.id_tipo_documento = b.id_tipo_documento   AND a.id_estado_aprendiz = c.id_estado_aprendiz   AND a.id_obligacion_mensual = d.id_obligacion_mensual   AND a.codigo_beneficio = e.codigo_beneficio    AND a.codigo_ficha = f.codigo_ficha  AND f.id_modalidad = g.id_modalidad AND a.id_estado_aprendiz != 6');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}

module.exports = {obtenerAdjudicados};