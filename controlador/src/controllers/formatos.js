const pool = require("../db.js");

const get_formatos =async (req, res,next) => {
  try {
    // Realiza la consulta a la base de datos
    const { rows } = await pool.query('SELECT a.id_formato_registrado, a.numero_documento_aprendiz, a.fecha_formato, a.numero_documento_instructor_lider, a.codigo_ficha, a.area_actividad, b.id_apartado, b.item_uno, b.item_dos, b.item_tres, b.item_cuatro, c.nombre_completo_aprendiz, c.id_obligacion_mensual, d.nombre_instructor_lider, d.email_instructor_lider, e.nombre_documento FROM formato_registrado AS a JOIN apartado_taller_mensual AS b ON a.id_formato_registrado = b.id_formato_registrado JOIN aprendiz AS c ON a.numero_documento_aprendiz = c.numero_documento_aprendiz JOIN instructor_lider AS d ON a.numero_documento_instructor_lider = d.numero_documento_instructor_lider JOIN tipo_documento AS e ON c.id_tipo_documento = e.id_tipo_documento ORDER BY a.fecha_formato DESC;');
    res.json({ success: true, data: rows });

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ success: false, message: 'Error en la consulta' });
  }
}

const Get_formato_pdf = async (req, res) => {
  const { id_formato_registrado } = req.params; // Aquí se corrige
  console.log(id_formato_registrado);
  
  try {
      const { rows } = await pool.query('SELECT DISTINCT f.nombre_programa,b.observacion_uno,b.observacion_dos,b.observacion_tres,b.observacion_cuatro, a.id_formato_registrado, a.numero_documento_aprendiz, a.fecha_formato, a.numero_documento_instructor_lider, a.codigo_ficha, a.area_actividad, b.id_apartado, b.item_uno, b.item_dos, b.item_tres, b.item_cuatro, c.nombre_completo_aprendiz, c.id_obligacion_mensual, d.nombre_instructor_lider, d.email_instructor_lider, e.nombre_documento FROM formato_registrado AS a LEFT JOIN apartado_taller_mensual AS b ON a.id_formato_registrado = b.id_formato_registrado JOIN aprendiz AS c ON a.numero_documento_aprendiz = c.numero_documento_aprendiz JOIN instructor_lider AS d ON a.numero_documento_instructor_lider = d.numero_documento_instructor_lider JOIN ficha AS f ON a.codigo_ficha = f.codigo_ficha JOIN tipo_documento AS e ON c.id_tipo_documento = e.id_tipo_documento WHERE a.id_formato_registrado = $1;',[id_formato_registrado]);
      if (rows.length === 0) {
          return res.status(404).json({ success: false, message: 'El formato no existe' });
      }
      res.json({ success: true, data: rows }); 
  } catch (error) {
      console.error("Error en la consulta:", error);
      res.status(500).json({ success: false, message: 'Error en la consulta' })
  }

}
module.exports = {get_formatos,Get_formato_pdf};
/*SELECT a.numero_documento_aprendiz, a.numero_documento_instructor_lider,  a.codigo_ficha,  a.area_actividad, b.item_uno,b.item_dos,b.item_tres,b.item_cuatro,b.observacion_uno,b.observacion_dos,b.observacion_tres,b.observacion_cuatro,c.nombre_instructor_lider,    d.nombre_completo_aprendiz,a.fecha_formato FROM formato_registrado AS a JOIN apartado_taller_mensual AS b ON a.numero_documento_aprendiz = b.numero_documento_aprendiz JOIN   instructor_lider AS c ON a.numero_documento_instructor_lider = c.numero_documento_instructor_lider JOIN  aprendiz AS d ON a.numero_documento_aprendiz = d.numero_documento_aprendiz ORDER BY a.fecha_formato DESC LIMIT 1*/