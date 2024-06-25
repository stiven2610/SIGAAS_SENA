import MessageIcon from "@mui/icons-material/Message";
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../AppRoutes/Authcontext";
import LongMenu from "../material/menu";
import "./styles.css";

const Nav_index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // Condicional para no renderizar la navegación en la ruta /ver_formato
  const renderNav = location.pathname !== "/ver_formato";

  return (
    <>
      {isAuthenticated ? (
        renderNav && (
          <div className="header-container">
            <div className="logo-container">
              <img
                src="..//images/logobienestar.png"
                alt="logo del Sena"
              />
              <h3 className="m-2">SIGAAS</h3>
            </div>
            <div className="titulo-inicio"></div>
            <div className="navbar-container align-items-center ">
              <Navbar expand="lg" className="justify-content-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mx-auto">
                    <Nav.Link
                      as={NavLink}
                      to="/adjudicados"
                      className={({ isActive }) =>
                        isActive ? "link-nav active" : "link-nav"
                      }
                    >
                      Adjudicados
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/novedades"
                      className={({ isActive }) =>
                        isActive ? "link-nav active" : "link-nav"
                      }
                    >
                      Novedades
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/formatos"
                      className={({ isActive }) =>
                        isActive ? "link-nav active" : "link-nav"
                      }
                    >
                      Formatos 
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/talleres"
                      className={({ isActive }) =>
                        isActive ? "link-nav active" : "link-nav"
                      }
                    >
                      Talleres
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/meritorios"
                      className={({ isActive }) =>
                        isActive ? "link-nav active" : "link-nav"
                      }
                    >
                      Aprendices meritorios
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/suspendidos"
                      className={({ isActive }) =>
                        isActive ? "link-nav active" : "link-nav"
                      }
                    >
                      Aprendices suspendidos
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
            <Nav.Link
              as={NavLink}
              to="/mensajes"
              className={({ isActive }) =>
                isActive ? "link-nav active" : "link-nav"
              }
            >
              <MessageIcon className="m-4" />
            </Nav.Link>
            <LongMenu />
          </div>
        )
      ) : (
        renderNav && (
          <div className="container-nav">
            <div className="logo-container">
              <img
                src="..//images/logobienestar.png"
                alt="logo del Sena"
              />
            </div>
            <div className="navbar-container">
              <div className="titulo-inicio">
                <h5>
                  Sistema de Gestión de Aprendices en Apoyo de sostenimiento
                </h5>
              </div>
              <div className="container-link">
                <Navbar expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                      <Nav.Link
                        as={NavLink}
                        exact
                        to="/"
                        className={({ isActive }) =>
                          isActive ? "link-nav active" : "link-nav"
                        }
                      >
                        Inicio
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/login"
                        className={({ isActive }) =>
                          isActive ? "link-nav active" : "link-nav"
                        }
                      >
                        Aplicación
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/contacto"
                        className={({ isActive }) =>
                          isActive ? "link-nav active" : "link-nav"
                        }
                      >
                        Contáctanos
                      </Nav.Link>
                      <Nav.Link
                        target="_blank"
                        href="https://www.sena.edu.co/es-co/transparencia/ProyectoNorma/res_1-0587_040620.pdf"
                        className="link-nav"
                      >
                        Normatividad
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>
            </div>
          </div>
        )
      )}
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
};

export default Nav_index;
