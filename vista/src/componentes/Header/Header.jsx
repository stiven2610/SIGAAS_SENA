import "./styles.css";

const Header = () => {
  const linkStyle = { color: "white" };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#39A900" }}>
      <div className="container">
        <h1 className="navbar-brand">Bienestar</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
            
            </li>
            <li className="nav-item">
             
            </li>
            <li className="nav-item">
          
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={linkStyle}
              >
                Filtros aprendiz
              </a>
              <ul className="dropdown-menu">
                <li>
                
                </li>
                <li>
                
                </li>
                <li>
                
                </li>
                <li>
                 
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={linkStyle}
              >
                Usuario
              </a>
              <ul className="dropdown-menu">
                <li>
              
                </li>
                <li  style={{colorg:"#0000"}}>
                  <a className="dropdown-item" href="/">
                    Salir
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
