const pool = require("../db.js");

const Get_ficha = async (req, res) => {
    const { codigo_ficha } = req.params; // Aquí se corrige
    console.log(codigo_ficha);
    
    try {
        const { rows } = await pool.query('SELECT a.fecha_fin_lectiva,a.codigo_ficha,a.nombre_programa,a.fecha_inicio_ficha , a.id_modalidad, a.numero_documento_instructor_lider, a.fecha_inicio_etapa_productiva, a.fecha_fin_ficha,a.nivel_formacion,b.nombre_instructor_lider , b.email_instructor_lider  FROM ficha AS a , instructor_lider AS b WHERE a.codigo_ficha = $1 AND a.numero_documento_instructor_lider = b.numero_documento_instructor_lider', [codigo_ficha]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'La ficha no existe' });
        }
        res.json({ success: true, data: rows }); 
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ success: false, message: 'Error en la consulta' });
    }
}

module.exports ={
    Get_ficha
}
