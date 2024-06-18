const pool = require("../db.js");

const Get_objetivos = async (req, res) => {
  
    
    try {
        const { rows } = await pool.query('SELECT  titulo_objetivos, contenido_objetivos from objetivos' );
        
        
        res.json({ success: true, data: rows }); 
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ success: false, message: 'Error en la consulta' });
    }
}

module.exports ={
    Get_objetivos}