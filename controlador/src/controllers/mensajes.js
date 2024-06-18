
const pool = require("../db.js");

const get_mensajes =async (req, res,next) => {
  try {
    // Realiza la consulta a la base de datos
    const { rows } = await pool.query('SELECT * from mensajes;');
    res.json({ success: true, data: rows });

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}

module.exports = {get_mensajes};