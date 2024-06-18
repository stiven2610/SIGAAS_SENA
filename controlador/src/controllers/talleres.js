const pool = require("../db.js");

const creacion_taller = async (req, res) => {
  const { nombre_taller, fecha_taller, contrasenha_taller } = req.body;

  try {
      const insertQuery = "INSERT INTO taller_mensual (codigo_taller, nombre_taller, fecha_taller) VALUES (DEFAULT, $1, $2)";
      const insertValues = [nombre_taller, fecha_taller];
      
      await pool.query(insertQuery, insertValues);

      res.status(200).json({ message: "Taller creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el taller:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const  get_talleres = async(req,res) => {
  try {
    const  {rows} = await pool.query('select codigo_taller,nombre_taller,fecha_taller from taller_mensual');
    res.json({succes: true, data:rows});
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({succes:false, message: 'Error en la consulta'});
  }
}

const registrar_asistencia = async(req,res ) => {
  try {
    
  } catch (error) {
    
  }
}
module.exports = {
  creacion_taller,
  get_talleres,
  registrar_asistencia
};
