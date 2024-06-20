import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AppRoutes/Authcontext";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Footer from "../Footer/Footer";
import Boton from "../botones/Boton";
import CryptoJS from "crypto-js";
import "./styles.css";
import { MenuItem } from "@mui/material";

const Login = () => {
  const [errorCredenciales, setErrorCredenciales] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const limpiarCampos = () => {
    setErrorCredenciales("");
  };

  const [user, setUser] = useState({
    numero_documento_usuario: "",
    rol: "",
    contrasenha_usuario: "",
  });
console.log(user)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onlogin = async (e) => {
    e.preventDefault();

    const userWithEncryptedPassword = {
      ...user,
      contrasenha_usuario: CryptoJS.MD5(user.contrasenha_usuario).toString(),
    };

    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWithEncryptedPassword),
      });
console.log(userWithEncryptedPassword)
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("numero_documento_usuario", user.numero_documento_usuario);
          login();
          navigate(user.rol ? "/adjudicados" : "/registronovedad");
        } else {
          setErrorCredenciales("Credenciales incorrectas");
        }
      } else {
        setErrorCredenciales("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="container-foto">
          <img src="../../../public/bienestar1.jpg" className="login-image" alt="Login" />
        </div>
        <div className="form-login">
          <div id="form-container" className={`form_login ${errorCredenciales ? "error-credenciales" : ""}`}>
            <form onSubmit={onlogin} method="POST">
              <h5>Iniciar Sesión</h5>
              <div className="input">
                <TextField
                  id="outlined-password-input"
                  required
                  label="Número de documento"
                  onChange={handleChange}
                  onFocus={limpiarCampos}
                  name="numero_documento_usuario"
                  className="input"
                  maxLength="10"
                  autoComplete="current-password"
                />
              </div>
              <div className="input">
                <FormControl className="input">
                  <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    name="rol"
                    onChange={handleChange}
                    onFocus={limpiarCampos}
                    value={user.rol}
                  >
                    <MenuItem value="true">Instructor</MenuItem>
                    <MenuItem value="false">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="input">
                <TextField
                  id="outlined-password-input"
                  required
                  label="Contraseña"
                  className="input"
                  onChange={handleChange}
                  onFocus={limpiarCampos}
                  name="contrasenha_usuario"
                  type="password"
                  maxLength="10"
                  autoComplete="current-password"
                />
              </div>
              <Boton texto="Ingresar" textcolor="#ffffff" color="#098605" />
              {errorCredenciales && (
                <p style={{ color: "red" }}>{errorCredenciales}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
