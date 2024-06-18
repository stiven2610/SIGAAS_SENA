
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.css";
import LongMenu from "../material/menu";
import Modal_update from "../modal_instructor/modal_update";

const Nav_instructor= () => {

  return (
    <>
   
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
                  <Nav.Link as={NavLink} to="/registronovedad" className={({ isActive }) => isActive ? "link-nav active" : "link-nav"}>
                    Registrar formulario
                  </Nav.Link>
                <Modal_update/>
                 
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <LongMenu />
        </div>
    
      <Outlet />
    </>
  );
};

export default Nav_instructor;