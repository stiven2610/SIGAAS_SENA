
const pool = require("../db.js");

const get_suspendidos =async (req, res,next) => {
  try {
    // Realiza la consulta a la base de datos
    const { rows } = await pool.query('SELECT a.numero_documento_aprendiz,g.nombre_motivo_suspension, a.fecha_inicio_suspension, a.fecha_fin_suspension, b.nombre_completo_aprendiz, c.nombre_documento, d.nombre_programa, d.codigo_ficha FROM aprendiz_suspendido a, aprendiz b, tipo_documento c, ficha d, motivo_suspension AS g  WHERE a.numero_documento_aprendiz = b.numero_documento_aprendiz AND b.id_tipo_documento = c.id_tipo_documento AND b.codigo_ficha = d.codigo_ficha AND a.id_motivo_suspension = g.id_motivo_suspension;');
    res.json({ success: true, data: rows });

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}

module.exports = {get_suspendidos};