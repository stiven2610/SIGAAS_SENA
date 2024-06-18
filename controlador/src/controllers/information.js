const pool = require("../db.js");

const Get_information = async (req, res) => {
  
    
    try {
        const { rows } = await pool.query('SELECT  titulo, contenido from informacion ' );
        
        
        res.json({ success: true, data: rows }); 
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ success: false, message: 'Error en la consulta' });
    }
}

module.exports ={
    Get_information 
}