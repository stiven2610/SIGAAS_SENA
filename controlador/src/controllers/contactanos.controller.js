const enviarCorreo = require("./correos.js");

const Contactanos = async (req, res) => {
  const { nombre, asunto, email, mensaje } = req.body;
  try {
    await enviarCorreo(nombre, asunto, email, mensaje);
    console.log("Correo enviado exitosamente");
    return res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Ocurrió un error al enviar el correo:", error);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
};

module.exports = Contactanos;
