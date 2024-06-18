const pool = require("../db.js");

const formularioRegistroAsistencia = async (req, res, next) => {
  const { codigo_taller, numero_documento_aprendiz } = req.body;

  try {
    const result = await pool.query(
      "CALL fun_reg_asis($1, $2, $3, $4,$5)",
      [numero_documento_aprendiz, codigo_taller, null, null, null]
    );
    const documento_existe = result.rows[0].documento_existe;
    const taller_existe = result.rows[0].taller_existe;
    const asistencia_existe = result.rows[0].asistencia_existe;
    if (!asistencia_existe && documento_existe && taller_existe) {
      res.status(200).json({
        success: true,
        message: "Asistencia registrada exitosamente.",
      })
    } else if (!documento_existe) {
      res.status(400).json({
        success: false,
        error: "El número de documento del aprendiz no existe.",
      })
    } else if (!taller_existe) {
      res.status(400).json({
        success: false,
        error: "El código del taller no existe.",
      })
    } else {
      res.status(400).json({
        success: false,
        error: "El Aprendiz ya tiene registrada su asistencia",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  formularioRegistroAsistencia,
};

