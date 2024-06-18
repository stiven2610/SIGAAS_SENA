import  { useState } from 'react';
const Registro_Usuario = () => {
  const [userData, setUserData] = useState({
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    email: '',
    cargo: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de registro de usuario, como enviar los datos al servidor.
    console.log('Datos de registro de usuario:', userData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Registro de Usuario</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="numeroDocumento" className="form-label">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="numeroDocumento"
                    name="numeroDocumento"
                    value={userData.numeroDocumento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombres" className="form-label">
                    Nombres
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombres"
                    name="nombres"
                    value={userData.nombres}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    name="apellidos"
                    value={userData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cargo" className="form-label">
                    Cargo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cargo"
                    name="cargo"
                    value={userData.cargo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro_Usuario;
