const pool = require ("../db")

const Get_documentos = async (req,res) =>{
    try {
const {rows } = await pool.query('SELECT id_tipo_documento,nombre_documento from tipo_documento');
        res.json({succes: true , data: rows});
    } catch (error) {
     res.status(500).json({succes:false , message: 'Error en la consulta'}); 
    }
}
const Get_estados_aprendiz  =async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT id_estado_aprendiz, nombre_estado_aprendiz FROM estado_aprendiz');
        res.json({succes: true , data : rows})
    } catch (error) {
        res.status(500).json({succes: false , message:'Error en la consulta '})
    }
}
module.exports = {
    Get_documentos,
    Get_estados_aprendiz
}