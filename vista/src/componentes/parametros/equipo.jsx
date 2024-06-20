import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Modal_update from "./modal.edit";

const Inicio = () => {
  const [equipo, setEquipo] = useState([]);
  const [persona, setPersona] = useState(null); // Cambiado a null para iniciar sin persona seleccionada
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    fetch("http://  localhost:4000/get_equipo")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setEquipo(data.data);
        } else {
          console.error("Los datos recibidos no son válidos.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const Edit_persona = (id_persona) => {
    const persona = equipo.find((item) => item.id_persona === id_persona);
    setPersona(persona);
    setShowModal(true); // Mostrar el modal al editar persona
    console.log("editar " + id_persona);
    console.log(persona);
  };

  const Delete_persona = (id_persona) => {
    const persona = equipo.find((item) => item.id_persona === id_persona);
    setPersona(persona);
    console.log("eliminar " + id_persona);
    console.log(persona);
  };

  return (
    <>
      <div className="container-inicio">
        <>
          <div className="row mt-3 text-center">
            <h3 className="titulos m-3">Equipo de Bienestar al Aprendiz</h3>
            {equipo.map((item) => (
              <div className="col-md-4 mb-4 aling-items." key={item.id_persona}>
                <div className="border rounded p-2 shadow  d-flex flex-column align-items-center  justify-content-center">
                  <div
                    style={{
                      width: "250px",
                      height: "250px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={"http://  localhost:4000/" + item.ruta_foto}
                      alt="Persona 1"
                      className="img-fluid"
                      style={{ width: "100%", height: "auto" }} // Establece el ancho al 100% para que la imagen se ajuste al contenedor
                    />
                  </div>
                  <h4>{item.nombre_integrante}</h4>
                  <p>{item.cargo}</p>
                  <p>{item.descripcion}</p>
                  <div>
                    <button onClick={() => Edit_persona(item.id_persona)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => Delete_persona(item.id_persona)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
      {showModal && persona && (
            <Modal_update open={showModal} onClose={handleCloseModal} persona={persona} />

      )}
      <Footer />
     
    </>
  );
};

export default Inicio;
