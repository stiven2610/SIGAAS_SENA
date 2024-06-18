const pool = require("../db.js");

const Reactivar_aprendiz = async (req, res) => {
    const { numero_documento_aprendiz } = req.params; // Aquí se corrige
    console.log(numero_documento_aprendiz);
    
    try {
        const { rows } = await pool.query('SELECT fun_rea_apr($1)  ', [numero_documento_aprendiz]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'El aprendiz no existe ' });
        }
        res.json({ success: true, data: rows }); 
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ success: false, message: 'Error en la consulta' });
    }
}

module.exports ={
    Reactivar_aprendiz
}
