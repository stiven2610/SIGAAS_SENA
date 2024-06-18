const pool = require("../db.js");
const { enviarCorreo } = require("./correos.js");
const createListener = require("pg-listen");
const cron = require("node-cron");
// Crea un listener de pg-listen
const listener = createListener({
  connectionString: "postgres://postgres:posgrest15@localhost:5432/apoyo",
});

// Manejador de notificaciones
listener.notifications.on("estado", async (payload) => {
  try {
    // Procesa la notificación recibida
    console.log("Notificación recibida:", payload);
    const { estado, nombre, email, motivo_suspension } = payload;
    enviarCorreo(estado, nombre, email, motivo_suspension);
  } catch (error) {
    console.error("Error al manejar la notificación:", error);
  }
});

// Función para obtener correos electrónicos de la base de datos
const get_emails_db = async () => {
  try {
    const result = await pool.query("SELECT email_aprendiz FROM aprendiz");
    return result.rows.map((row) => row.email_aprendiz);
  } catch (error) {
    console.error(
      "Error al obtener correos electrónicos de la base de datos:",
      error
    );
    throw error;
  }
};
// Función para enviar correos electrónicos
const send_recordatorio = async (emails) => {
  const estado = 11;
  const nombre = "";
  const motivo_suspension = "";
  for (const email of emails) {
    enviarCorreo(estado, nombre, email, motivo_suspension); // Ajusta el envío del correo según tus necesidades
    console.log("Correo enviado a:", email);
  }
};

// Función principal para obtener correos y enviarlos
const get_send_correos = async () => {
  try {
    const emails = await get_emails_db();
    if (emails.length > 0) {
      await send_recordatorio(emails);
    } else {
      console.log("No hay correos electrónicos para enviar.");
    }
  } catch (error) {
    console.error("Error en get_send_correos:", error);
  }
};
cron.schedule("0 9 20-25 * *", () => {
  console.log("Enviando correos electrónicos...");
  get_send_correos();
});

// Función para conectar y comenzar a escuchar notificaciones
async function conectarYEscuchar() {
  const client = await pool.connect(); // Obtener una instancia de conexión del pool
  try {
    await listener.connect(); // Conectar el listener
    await listener.listenTo("estado"); // Comenzar a escuchar notificaciones
    console.log("Escuchando notificaciones de estado...");
  } catch (error) {
    console.error("Error al conectar y escuchar:", error);
  } finally {
    client.release();
  }
}

module.exports = {
  conectarYEscuchar,
};
