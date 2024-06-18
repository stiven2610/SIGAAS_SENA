const pool = require("../db.js");

const getALlUsuarios = async (req, res, next) => {
  try {
    const usuarios = await pool.query("select * from usuario_admin");
    res.json(usuarios.rows);
  } catch (error) {
    next(error)
  }
};
async function getUsuario(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM usuario_admin where numero_documento_usuario =$1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "user not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error)
  }
}

async function deleteUsuario(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE  FROM usuario_admin where numero_documento_usuario =$1",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "user not found",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

async function updateUsuario(req, res, next) {
  try {

    const { id } = req.params;
    const { nombres_usuario,
      id_tipo_documento,
      numero_documento_usuario,
      apellidos_usuario,
      email_usuario,
      contrasenha_usuario, } = req.body;
    const result = await pool.query(
      "UPDATE usuario_admin SET  nombres_usuario =$1,id_tipo_documento = $2,numero_documento_usuario = $3,apellidos_usuario = $4,email_usuario = $5,contrasenha_usuario = $6 WHERE numero_documento_usuario =  $7 returning *", [nombres_usuario,
      id_tipo_documento,
      numero_documento_usuario,
      apellidos_usuario,
      email_usuario,
      contrasenha_usuario, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "user not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error)
  }

};


module.exports = {
  getALlUsuarios,
  getUsuario,
  deleteUsuario,
  updateUsuario,

};
