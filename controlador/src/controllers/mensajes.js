
const pool = require("../db.js");

const get_mensajes =async (req, res,next) => {
  try {
    // Realiza la consulta a la base de datos
    const { rows } = await pool.query('SELECT * from mensajes  ORDER BY id_mensaje DESC;');
    res.json({ success: true, data: rows });

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}
const create_mensaje = async (req, res) => {
  const { nombre, asunto, email, mensaje } = req.body;
  console.log(req.body)
  try {
      const insertQuery = "SELECT fun_ins_men($1, $2, $3, $4)";
      const insertValues = [nombre, asunto, email, mensaje];
      
      await pool.query(insertQuery, insertValues);

      res.status(200).json({ success: true, message: "Mensaje enviado exitosamente" });
  } catch (error) {
      console.error("Error al enviar el mensaje", error);
      res.status(500).json({ success: false, error: "Error en el servidor" });
  }
};
module.exports = {get_mensajes,create_mensaje};