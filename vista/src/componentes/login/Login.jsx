
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AppRoutes/Authcontext";
import Footer from "../Footer/Footer";
import Boton from "../botones/Boton";
import CryptoJS from "crypto-js";
import "./styles.css";
const password = "261005";
const encryptedPassword = CryptoJS.MD5(password).toString();
console.log(encryptedPassword)
console.log(encryptedPassword);
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
    setUser({ ...user, [name]: name === "rol" ? value === "true" : value });
  };

  const onlogin = async (e) => {
    e.preventDefault();

    // Cifrar la contraseña con CryptoJS MD5
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

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Guardar datos en localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("numero_documento_usuario", user.numero_documento_usuario);
          login();
          navigate(data.rol ? "/registronovedad" : "/adjudicados");
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
      <div className="container-login d-flex flex-column">
        <div className="form-login">
          <div
            id="form-container"
            className={`form_login ${
              errorCredenciales ? "error-credenciales" : ""
            }`}
          >
            <form onSubmit={onlogin} method="POST">
              <h2 className="titulos">Iniciar Sesión</h2>
              <label htmlFor="numero_documento_usuario" className="subtitulos">
                Número documento usuario
              </label>
              <input
                name="numero_documento_usuario"
                onChange={handleChange}
                type="number"
                onFocus={limpiarCampos}
                className={"form-control mb-2"}
                id="numero_documento_usuario"
                placeholder="Ingrese su número de documento"
                maxLength="10"
                required
              />
              <label htmlFor="rol" className="subtitulos">
                Rol
              </label>
              <select
                name="rol"
                onChange={handleChange}
                onFocus={limpiarCampos}
                className={"form-control mb-2"}
                id="rol"
                required
              >
                <option value="">Seleccione su rol</option>
                <option value="true">Instructor</option>
                <option value="false">Admin</option>
              </select>
              <label htmlFor="Password" className="subtitulos">
                Contraseña
              </label>
              <input
                onChange={handleChange}
                onFocus={limpiarCampos}
                name="contrasenha_usuario"
                placeholder="Ingrese su contraseña"
                type="password"
                className={"form-control mb-2"}
                id="Password"
                maxLength="10"
                required
              />
              {errorCredenciales && (
                <p style={{ color: "red" }}>{errorCredenciales}</p>
              )}
              <Boton texto="Ingresar" textcolor="#fefefe" color="#39A900" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;