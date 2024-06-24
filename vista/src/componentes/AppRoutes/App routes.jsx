
import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Tabla_adjudicados from "../adjudicados/tabla_adjudicados";
import Aprendices_cancelados from "../aprendicesCancelados/aprendices_cancelados";
import Aprendices_meritorios from "../aprendices_meritorios/Aprendices_meritorios";
import Suspendidos from "../aprendices_suspendidos/Aprendices_suspendidos";
import Asistencia_taller from "../asistencia_taller/asistencia_taller";
import Formulario_contacto from "../contactanos/formulario_contacto";
import Formulario_create_beneficio from "../formulario_create_beneficio/formulario_create_beneficio";
import Formulario_create_taller from "../formulario_create_taller/formulario_create_taller";
import Insert_aprendiz from "../formulario_insert_aprendiz/formulario_insert_aprendiz";
import Formulario_registro_asistencia_taller from "../formulario_registro_asistencia_taller/formulario_registro_asistencia_taller";
import Inicio from "../index/index";
import Login from "../login/Login";
import Mensajes from "../mensajes/mensajes";
import InactivityTimer from "../modalsesion/inactivity";
import LayoutWithoutNav from "../nav_index/LayoutWithoutNav";
import Nav_index from "../nav_index/nav_index";
import Novedades_presentadas from "../novedades_presentadas/novedades_presentadas";
import Equipo from "../parametros/equipo";
import Parametros from "../parametros/parametros";
import Registro_novedades_formato from "../registro_novedades_formato/registro_novedades_formato";
import Talleres from "../talleres/Talleres";
import Update_aprendiz from "../update_aprendiz/update_aprendiz";
import { AuthContext } from "./Authcontext";
import PrivateRoute from "./PrivateRouter";
import "./styles.css";
import Get_Formatos from "../formatos/formatos";
import Ver_pdf from "../pdf_formato/pdf_formato";
const Approutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === "/login") {
      logout(); // Llamar a la función de logout del contexto
      localStorage.removeItem("token"); // Eliminar el token de localStorage
      navigate("/login", { replace: true }); // Redirigir al usuario a /login
    }
  }, [location.pathname, logout, navigate]);

  return (
    <InactivityTimer>
      <Routes>
        <Route path="/" element={<Nav_index />}>
          <Route index element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Formulario_contacto />} />

          <Route
            path="/adjudicados"
            element={
              <PrivateRoute>
                <Tabla_adjudicados />
              </PrivateRoute>
            }
          />
          <Route
            path="/formatos"
            element={
              <PrivateRoute>
                <Get_Formatos />
              </PrivateRoute>
            }
          />
          <Route
            path="/ver_formato"
            element={
              <PrivateRoute>
                <Ver_pdf/>
              </PrivateRoute>
            }
          />
          <Route
            path="/equipo"
            element={
              <PrivateRoute>
                <Equipo/>
              </PrivateRoute>
            
            }
          />
            <Route
            path="/parametros"
            element={
              <PrivateRoute>
                <Parametros/>
              </PrivateRoute>
            
            }
          />
          
          <Route
            path="/cancelados"
            element={
              <PrivateRoute>
                <Aprendices_cancelados/>
              </PrivateRoute>
            }
          />
           <Route
            path="/mensajes"
            element={
              <PrivateRoute>
                <Mensajes/>
              </PrivateRoute>
            }
          />
          <Route
            path="/insertaprendiz"
            element={
              <PrivateRoute>
                <Insert_aprendiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/novedades"
            element={
              <PrivateRoute>
                <Novedades_presentadas />
              </PrivateRoute>
            }
          />
          <Route
            path="/creaciondetaller"
            element={
              <PrivateRoute>
                <Formulario_create_taller />
              </PrivateRoute>
            }
          />
          <Route
            path="/creacionbeneficio"
            element={
              <PrivateRoute>
                <Formulario_create_beneficio />
              </PrivateRoute>
            }
          />
          <Route
            path="/actualizaraprendiz/:id"
            element={
              <PrivateRoute>
                <Update_aprendiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/talleres"
            element={
              <PrivateRoute>
                <Talleres />
              </PrivateRoute>
            }
          />
          <Route
            path="/asistencia/:codigo_taller"
            element={
              <PrivateRoute>
                <Asistencia_taller />
              </PrivateRoute>
            }
          />
          <Route
            path="/registroasistencia/:codigo_taller"
            element={
              <PrivateRoute>
                <Formulario_registro_asistencia_taller />
              </PrivateRoute>
            }
          />
          <Route
            path="/suspendidos"
            element={
              <PrivateRoute>
                <Suspendidos />
              </PrivateRoute>
            }
          />
          <Route
            path="/meritorios"
            element={
              <PrivateRoute>
                <Aprendices_meritorios />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/" element={<LayoutWithoutNav />}>
          <Route
            path="/registronovedad"
            element={
              <PrivateRoute>
                <Registro_novedades_formato />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </InactivityTimer>
  );
};

export default Approutes;