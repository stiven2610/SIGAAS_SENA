const pool = require("../db.js");

const get_estado_aprendiz = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * from estado_aprendiz");
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ success: false, message: "Error en la consulta" });
  }
};

const update_estado = async (req, res, next) => {
  const { numero_documento_aprendiz, id_estado_aprendiz } = req.body;
  console.log(req.body);
  try {
    const update_estado_aprendiz = await pool.query(
      "UPDATE aprendiz SET  id_estado_aprendiz = $1 WHERE numero_documento_aprendiz = $2 ",
      [id_estado_aprendiz, numero_documento_aprendiz]
    );
    if (update_estado_aprendiz.rowCount >= 1) {
      res.status(200).json({
        success: true,
        message: "¡Actualización de estado realizada con éxito!",
      });
    } else {
      res.status(401).json({
        success: false,
        error: "¡El estado no pudo ser actualizado, inténtelo nuevamente!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { get_estado_aprendiz, update_estado };
