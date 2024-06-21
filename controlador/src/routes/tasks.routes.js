const express = require("express");
const router = express.Router();
const {
  getALlUsuarios,
  getUsuario,
  deleteUsuario,
  updateUsuario,
} = require("../controllers/users.controllers.js");
const {
  actualizardatos,
} = require("../controllers/actualizardatos.controller.js");
const { validarUsuario } = require("../controllers/login.controllers.js");
const {
  extraerDatosExcel,
  get_beneficios,
  create_beneficio
} = require("../controllers/beneficio.controller.js");
const {
  formularioRegistroAsistencia,
} = require("../controllers/asistencia.controller.js");
const { obtenerAdjudicados } = require("../controllers/adjudicados.controller.js");
const { creacion_taller, get_talleres } = require("../controllers/talleres.js");
const { asistencias } = require("../controllers/asistencias.controller.js");
const { insert_aprendiz } = require("../controllers/creacion.aprendiz.js");
const { obtenerCancelados } = require("../controllers/cancelados.controller.js");
const { obtenerNovedades, insert_suspendido } = require("../controllers/novedades.controller.js");
const {
  get_estado_aprendiz,
  update_estado,
} = require("../controllers/estado_aprendiz.controllers.js");
const {
  Get_documentos,
  Get_estados_aprendiz,
} = require("../controllers/selecciones.controllers.js");
const { get_motivos_suspension } = require("../controllers/motivos_suspension.controller.js");
const { get_suspendidos } = require("../controllers/suspendidos.controller.js");
const { Get_ficha } = require("../controllers/ficha.controllers.js");
const Contactanos = require("../controllers/contactanos.controller.js");
const { Get_information } = require("../controllers/information.js");
const { Get_objetivos } = require("../controllers/objetivos.js");
const { Get_equipo, create_persona, upload } = require("../controllers/equipo.js");
const { Reactivar_aprendiz } = require("../controllers/reactivar_aprendiz.js");
const { get_mensajes, create_mensaje } = require("../controllers/mensajes.js");
//rutas para CRUD de usuario...
router.get("/get_documentos", Get_documentos);
router.get("/get_ficha/:codigo_ficha",Get_ficha)
router.get("/get_estados", Get_estados_aprendiz);
router.get("/get_motivos_suspension" , get_motivos_suspension)
router.post("/insert_suspendido",insert_suspendido)
router.get("/get_suspendidos",get_suspendidos)
router.get("/usuarios", getALlUsuarios);
router.get("/usuario/:id", getUsuario);
router.delete("/usuario/:id", deleteUsuario);
router.put("/usuario/:id", updateUsuario);
router.put("/reactivaraprendiz/:numero_documento_aprendiz", Reactivar_aprendiz);
router.get("/get_mensajes",get_mensajes);
router.post("/create_mensaje",create_mensaje);
router.get("/get_information",Get_information)
router.get("/get_objetivos",Get_objetivos);
router.get("/get_equipo",Get_equipo);
router.post('/create_equipo', upload.single('ruta_foto'), create_persona);
//rutas para inicio de sesión...
router.post("/login", validarUsuario);
router.post("/contactanos", Contactanos)
//ruta para creacion de beneficio
router.get("/get_beneficios", get_beneficios);
router.post("/create_beneficio",create_beneficio)
router.post("/beneficio", extraerDatosExcel);
//ruta para registro de asistencia
router.post("/asistenciataller", formularioRegistroAsistencia);
router.get("/adjudicados", obtenerAdjudicados);
router.put("/actualizardatos", actualizardatos);
router.get("/asistencias/:codigo_taller", asistencias);
router.get("/novedades", obtenerNovedades);
router.get("/cancelados", obtenerCancelados);
router.post("/creaciontaller", creacion_taller);
router.get("/talleres", get_talleres);
router.post("/updateestado", update_estado);
router.get("/getestadoaprendiz", get_estado_aprendiz);
router.post("/insertaraprendiz", insert_aprendiz);
module.exports = router;