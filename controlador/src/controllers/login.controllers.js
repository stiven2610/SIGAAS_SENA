const pool = require("../db.js");
const jwt = require('jsonwebtoken');
const secretKey = 'alphaRomeo_@bienecset';
const validarUsuario = async (req, res, next) => {
   
  const { numero_documento_usuario,rol, contrasenha_usuario } = req.body;
  const password = contrasenha_usuario;
  try {
    const result = await pool.query("SELECT * FROM fun_log($1, $2,$3)", [
      rol,
      numero_documento_usuario,
      password
    ]);
    
    const respuesta = result.rows[0].fun_log;
  console.log(respuesta)
    if (respuesta) {
      const token = jwt.sign({ numero_documento_usuario }, secretKey, { expiresIn: '1h' });
      res.status(200).json({
        success: true,
        message: "Sesión iniciada correctamente",
        rol : rol,
        token: token
      });}
     else {
      res.status(401).json({
        success: false,
        error: "Credenciales incorrectas",
      });
    }
  } catch (error) {
    console.error("Error en la validación de usuario:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};

module.exports = {
  validarUsuario,
};
