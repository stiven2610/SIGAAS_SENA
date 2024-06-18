const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'posgrest15',
    host: 'localhost',
    port: 5432,
    database: 'apoyo',
});

const obtener_asistencias = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT b.codigo_taller, a.email_aprendiz, a.nombre_completo_aprendiz, b.nombre_taller, b.fecha_taller 
            FROM aprendiz AS a, taller_mensual AS b 
            WHERE b.fecha_taller = (SELECT MAX(fecha_taller) FROM taller_mensual) 
            AND a.asistencia_ultimo_taller != true
        `);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    }
};

const enviar_alerta_asistencia = async () => {
    try {
        const asistencias = await obtener_asistencias();
        if (asistencias && asistencias.length > 0) {
            asistencias.forEach(asistencia => {
                const correo = 1; // Ajusta según necesidades
                const { email_aprendiz, nombre_completo_aprendiz, nombre_taller, fecha_taller } = asistencia;
                enviar_alerta(correo, email_aprendiz, nombre_completo_aprendiz, nombre_taller, fecha_taller);
            });
        } else {
            console.error("No se pudieron obtener las asistencias.");
        }
    } catch (error) {
        console.error("Error al obtener las asistencias:", error);
    }
};

async function enviar_alerta(correo, destinatario, nombre, nombre_taller, fecha_taller) {
    const bienestar = 'stivenrozo1@gmail.com';

    try {
        if (correo === 1 || correo === 2) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: bienestar,
                    pass: 'play ktsl zgjk dwyg',
                }
            });

            let opciones_correo;
            switch (correo) {
                case 1:
                    opciones_correo = {
                        from: `<${bienestar}>`,
                        to: destinatario,
                        subject: `Notificación de inasistencia al último taller realizado de apoyo de sostenimiento regular.`,
                        html: `
                            <p>Estimado aprendiz: ${nombre},</p>
                            <p>El presente correo es para notificarle que no se le registró asistencia al último taller "${nombre_taller}" realizado en la fecha ${fecha_taller} por bienestar al aprendiz. 
                            Por lo tanto, no se le podrá desembolsar el pago del mes correspondiente hasta que no defina por qué no pudo asistir o por qué no
                            se le registró la asistencia.</p>
                            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
                            <p>Para más información, por favor diríjase a la oficina de Bienestar al Aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
                    };
                    break;
                case 2:
                    opciones_correo = {
                        from: `<${bienestar}>`,
                        to: destinatario,
                        subject: `Invitación a participar del taller mensual de apoyo de sostenimiento regular`,
                        html: `
                            <p>Estimado aprendiz: ${nombre},</p>
                            <p>Cordial saludo, estimados aprendices beneficiarios de Apoyos de Sostenimiento Regular.</p>
                            <p>El presente correo es para invitarlo de manera obligatoria a asistir al desarrollo del taller "${nombre_taller}" en la fecha ${fecha_taller} correspondiente,
                            según lo orientado en el lineamiento de la guía de apoyos socioeconómicos.</p>
                            <p>Atentamente, Oficina de Bienestar al Aprendiz C.S.E.T</p>
                            <p>Para más información, por favor diríjase a la oficina de Bienestar al Aprendiz o contáctese por medio del correo electrónico: ${bienestar}</p>`
                    };
                    break;
            }

            await transporter.sendMail(opciones_correo);
            console.log("Correo enviado correctamente");
        } else {
            console.log("No se envía correo porque el estado no lo requiere");
        }
    } catch (error) {
        console.log("Error al enviar el correo electrónico:", error);
        throw error;
    }
}

cron.schedule("* * * * *", () => {
    console.log("Enviando correos electrónicos alerta asistencia...");
    enviar_alerta_asistencia()
});
