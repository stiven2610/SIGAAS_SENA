const pool = require("../db.js");
const registrar_formato = async (req, res) => {
    const {   numero_documento_aprendiz ,
       numero_documento_instructor_lider ,
       codigo_ficha ,
       id_obligacion_mensual ,
       area_actividad ,
       item_uno ,
       item_dos ,
       item_tres ,
       item_cuatro,
       observacion_uno ,
       observacion_dos ,
       observacion_tres ,
       observacion_cuatro   } = req.body;
       console.log(req.body)
    try {
      const insertQuery = "SELECT * FROM fun_reg_for_seg($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";
      const insertValues = [  numero_documento_aprendiz ,
        numero_documento_instructor_lider ,
        codigo_ficha ,
        id_obligacion_mensual ,
        area_actividad ,
        item_uno ,
        item_dos ,
        item_tres ,
        item_cuatro,
        observacion_uno ,
        observacion_dos ,
        observacion_tres ,
        observacion_cuatro  ];
        
      const result = await pool.query(insertQuery, insertValues);
      const insercion_exitosa = result.rows[0];
  
      if (insercion_exitosa)
        {
          res.status(200).json({ message: "Formato registrado exitosamente" });
        }else {
          res.status(400)
        }
    } catch (error) {
      console.error("Error al registrar el formato:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }}

    module.exports={registrar_formato};