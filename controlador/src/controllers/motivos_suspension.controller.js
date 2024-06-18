const pool =  require ("../db.js");


const get_motivos_suspension = async (req,res) =>{
try {
  const {rows}  = await pool.query("SELECT * FROM motivo_suspension")
  res.json({succes: true ,data: rows});
} catch (error) {
    res.status(500).json({succes: false , message: " Error en la consulta"})
}}




module.exports = {
    get_motivos_suspension
}