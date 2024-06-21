const pool = require("../db.js");
const multer = require('multer');
const path = require('path');

// Controlador para obtener el equipo
const Get_equipo = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id_persona, nombre, apellido, cargo, descripcion, ruta_foto FROM equipo');
        res.json({ success: true, data: rows }); 
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ success: false, message: 'Error en la consulta' });
    }
};
// Configuración de multer para guardar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual para evitar colisiones
    }
});

const upload = multer({ storage: storage });


// Controlador para crear una persona
const create_persona = async (req, res) => {
    const { nombre, apellido, cargo, descripcion } = req.body;
    const ruta_foto = req.file ? req.file.path : null; // Obtener la ruta de la foto si existe
console.log(ruta_foto)
    try {
        const insertQuery = "SELECT fun_ins_equ($1, $2, $3, $4, $5)";
        const insertValues = [nombre, apellido, cargo,  ruta_foto,descripcion];
        
        await pool.query(insertQuery, insertValues);

        res.status(200).json({ success: true, message: "Persona creada exitosamente" });
    } catch (error) {
        console.error("Error al crear la persona:", error);
        res.status(500).json({ success: false, error: "Error en el servidor" });
    }
};

module.exports = {
    Get_equipo,
    create_persona,
    upload // Exportar multer para usarlo en las rutas
};
