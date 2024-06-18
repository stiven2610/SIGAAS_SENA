const { mail } = require("../config.js");
const nodemailer = require('nodemailer');
const bienestar = 'stivenrozo1@gmail.com';
const cron = require('node-cron');

async function enviarCorreo(estado, nombre, destinatario,motivo_suspension) {
  try {
    // Verificar si el estado requiere el envío de correo
    if (estado == 1 || estado == 2 || estado == 4 || estado == 6 || estado == 8 || estado == 9 || estado == 11) {
      // Crear un transporte de nodemailer
     
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'stivenrozo1@gmail.com', // tu correo electrónico
      pass: 'play ktsl zgjk dwyg',   // tu contraseña de aplicación'
  }
});

      // Define las opciones del correo según el estado
      let mailOptions;
      switch (estado) {
        case 1:
          mailOptions = {
            from: `<${bienestar}>`,
            to: destinatario,
            subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
            html: `
            <p>Estimado aprendiz: ${nombre},</p>
            <p>El presente correo es para notificarle que está a punto de cumplir su etapa lectiva. Por favor, notifique lo antes posible qué modalidad ha escogido para su etapa productiva, teniendo en cuenta que si elige una modalidad diferente perderá el derecho a recibir el apoyo de sostenimiento económico.</p>
            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
            <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
          };
          break;
        case 2:
          mailOptions = {
            from: `<${bienestar}>`,
            to: destinatario,
            subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
            html: `
            <p>Estimado aprendiz: ${nombre},</p>
            <p>El presente correo es para notificarle que su estado en el apoyo de sostenimiento regular pasa a ser "Mes de gracia", mes en el cual usted deberá decidir y notificar su modalidad escogida para etapa práctica. Recuerde que si elige una modalidad diferente a proyecto productivo perderá el derecho a recibir el apoyo de sostenimiento regular.</p>
            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
            <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
          };
          break;
        case 4:
          mailOptions = {
            from: `<${bienestar}>`,
            to: destinatario,
            subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
            html: `
            <p>Estimado aprendiz: ${nombre},</p>
            <p>El presente correo es para notificarle que su estado en el apoyo de sostenimiento regular ha sido aplazado debido a que no definió modalidad de etapa productiva durante el mes de gracia. Por lo tanto, ya no tendrá derecho a recibir tal beneficio.</p>
            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
            <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
          };
          break;
          case 6:
          mailOptions = {
            from: `<${bienestar}>`,
            to: destinatario,
            subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
            html: `
            <p>Estimado aprendiz: ${nombre},</p>
            <p>El presente correo es para notificarle que su estado en el apoyo de sostenimiento regular ha sido cancelado debido a 
            que no definió modalidad de etapa productiva durante el mes de gracia o definio una diferente a proyecto productivo. Por lo tanto, ya no tendrá derecho a recibir tal beneficio.</p>
            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
            <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
          };
          break;
          case 7:
          mailOptions = {
            from: `<${bienestar}>`,
            to: destinatario,
            subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
            html: `
            <p>Estimado aprendiz: ${nombre},</p>
            <p>El presente correo es para notificarle que su estado en el apoyo de sostenimiento regular ha sido aplazado debido a que no definió modalidad de etapa productiva durante el mes de gracia. Por lo tanto, ya no tendrá derecho a recibir tal beneficio.</p>
            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
            <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
          };
          break;
          case 8:
          mailOptions = {
            from: `<${bienestar}>`,
            to: destinatario,
            subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
            html: `
            <p>Estimado aprendiz: ${nombre},</p>
            <p>El presente correo es para notificarle que su estado en el apoyo de sostenimiento regular ha sido suspendido  debido a "${motivo_suspension}". Por lo tanto, ya no tendrá derecho a recibir tal beneficio.</p>
            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
            <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
          };
          break;
          case 9:
            mailOptions = {
              from: `<${bienestar}>`,
              to: destinatario,
              subject: `NOTIFICACIÓN CAMBIO DE ESTADO EN BENEFICIO DE APOYO DE SOSTENIMIENTO`,
              html: `
              <p>Estimado aprendiz: ${nombre},</p>
              <p>El presente correo es para notificarle que se ha cancelado su derecho al apoyo debido a "${motivo_suspension}". Por lo tanto, ya no tendrá derecho a recibir tal beneficio.</p>
              <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
              <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
            };
            break;
            case 11:
              mailOptions = {
                from: `<${bienestar}>`,
                to: destinatario,
                subject: `RECORDATORIO ENTREGA DE FORMATO DE SEGUIMIENTO MENSUAL`,
                html: `
                <p>Estimado aprendiz</p>
                <p>El presente correo es para recordarle su deber como aprendiz de entregar el formato de seguimiento mensual el cúal lo debera hacer diligenciar por el instructor de turno en el aplicativo SIGAAS</p>
                <p>recuerde que para poder ingresar al aplicativo y diligenciar el formato el instructor debe estar conectado a la red del SENA<p>
                <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
                <p>Para más información, por favor diríjase a la oficina de Bienestar al aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
              };
              break;
      }

      // Enviar el correo
      await transporter.sendMail(mailOptions);
      console.log("Correo enviado correctamente");
    } else {
      console.log("No se envía correo porque el estado no lo requiere");
    }
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
    throw error;
  }
}

module.exports = {
  enviarCorreo,
};










