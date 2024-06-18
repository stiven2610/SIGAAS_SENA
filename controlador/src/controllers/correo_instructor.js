const nodemailer = require('nodemailer');
const bienestar = 'stivenrozo1@gmail.com';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: bienestar, // tu correo electrónico
        pass: 'play ktsl zgjk dwyg', // tu contraseña de aplicación
    }
});

// Función para enviar el correo electrónico
const send_credenciales_instructor = (nombre, contrasenha, email, documento) => {
  const mailOptions = {
    from: `Oficina de Bienestar <${bienestar}>`, // Remitente
    to: email, // Receptor
    subject: 'Credenciales de Acceso sistema SIGAAS (apoyo de sostenimiento)', // Asunto
    text: `Cordial saludo instructor ${nombre},

    Su usuario ha sido creado con éxito. A continuación se presentan sus credenciales de acceso:

    Usuario: ${documento}
    Contraseña: ${contrasenha}

    Por favor, mantenga esta información segura y no la comparta con nadie.

    Atentamente,
    Oficina de Bienestar al Aprendiz C.S.E.T.
    Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}`,
  };

  // Enviar el correo electrónico usando Promesas
  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Correo enviado:', info.response);
      return true; // Indica que el correo se envió con éxito
    })
    .catch(error => {
      console.log('Error al enviar el correo:', error);
      return false; // Indica que hubo un error al enviar el correo
    });
};

module.exports = send_credenciales_instructor;
