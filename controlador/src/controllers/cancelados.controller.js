
const pool = require("../db.js");

const obtenerCancelados =async (req, res,next) => {
  try {
    // Realiza la consulta a la base de datos
    const { rows } = await pool.query('SELECT a.numero_documento_aprendiz, a.fecha_cancelacion, a.numero_resolucion, b.nombre_completo_aprendiz, c.nombre_documento AS nombre_tipo_documento,f.nombre_motivo_suspension AS nombre_motivo_suspension FROM aprendiz_cancelado AS a INNER JOIN aprendiz AS b ON a.numero_documento_aprendiz = b.numero_documento_aprendiz INNER JOIN tipo_documento AS c ON b.id_tipo_documento = c.id_tipo_documento  INNER JOIN motivo_suspension AS f ON f.id_motivo_suspension = a.id_motivo_suspension;');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}

module.exports = {obtenerCancelados};