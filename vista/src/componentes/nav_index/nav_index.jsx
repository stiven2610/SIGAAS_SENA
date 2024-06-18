
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AppRoutes/Authcontext";
import Boton from "../botones/Boton";
import "./styles.css";
import LongMenu from "../material/menu";
import MessageIcon from '@mui/icons-material/Message';
const Nav_index = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <div className="header-container">
          <div className="logo-container">
            <img
              src="../../../public/images/logobienestar.png"
              alt="logo del Sena"
            />
          </div>
          <div className="navbar-container align-items-center ">
            <Navbar expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="">
                  <Nav.Link as={NavLink} to="/creacionbeneficio" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Creación de beneficio
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/adjudicados" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Adjudicados
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/novedades" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Novedades
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/talleres" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Talleres
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/meritorios" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Aprendices meritorios
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/suspendidos" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Aprendices suspendidos
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <Nav.Link as={NavLink} to="/mensajes" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
          <MessageIcon/>
                  </Nav.Link>
          <LongMenu />
        
        </div>
      ) : (
        <div className="header-container ">
          <div className="logo-container">
            <img
              src="../../../public/images/logobienestar.png"
              alt="logo del Sena"
            />
          </div>

          <div className="sigaas-container">
            <h2 className="sigaas">SIGAAS</h2>

            <div className="navbar align-items-center ">
              <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="">
                    <Nav.Link as={NavLink} exact to="/" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                      Inicio
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/login" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                      Aplicación
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/contacto" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                      Contáctanos
                    </Nav.Link>
                    <Nav.Link target="_blank" href="https://www.sena.edu.co/es-co/transparencia/ProyectoNorma/res_1-0587_040620.pdf" className="link-nav">
                      Normatividad
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
          <div className="logo-container">
            <img src="../../../public/images/logo SENA.png" alt="" />
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Nav_index;