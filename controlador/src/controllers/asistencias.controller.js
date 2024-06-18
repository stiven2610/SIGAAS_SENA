const pool = require("../db.js");

const asistencias = async (req, res, next) => {
  try {
    const codigo_taller = req.params.codigo_taller; // Obtener el codigo_taller de los parámetros de la solicitud
    console.log(codigo_taller);
    const { rows } = await pool.query('SELECT b.fecha_insert,a.numero_documento_aprendiz, b.nombre_completo_aprendiz , b.codigo_ficha FROM asistencia_taller AS a, aprendiz AS b WHERE a.numero_documento_aprendiz = b.numero_documento_aprendiz AND codigo_taller = $1',[codigo_taller]);
    res.json({ success: true, data: rows })
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
};

module.exports = { asistencias };
