import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css.css";

const Modal = ({ showModal, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(30); // Inicializamos el contador en 30 segundos
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      setSecondsLeft(30); // Reiniciar el contador cada vez que se muestre el modal
      const interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            navigate("/login");
            onClose();
            return 0;
          }
        });
      }, 1000);

      // Limpiar el intervalo cuando el modal se cierre
      return () => clearInterval(interval);
    }
  }, [showModal, navigate]);
const cerrarModal = ()=>{
  onClose();
  navigate("/login")
}
  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>¿Desea mantener la sesión abierta?</p>
        <p>Tiempo restante: {secondsLeft} segundos</p> {/* Mostrar el contador */}
        <button onClick={onClose}>Sí</button>
        <button onClick={cerrarModal}>No</button> {/* Redirigir al inicio de sesión */}
      </div>
    </div>
  );
};

export default Modal;
