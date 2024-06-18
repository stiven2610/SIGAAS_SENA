import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./styles.css"
const BackIcon = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/adjudicados"); // Navega hacia atrás en la historia
  };

  return (
    <button className="btn_volver" onClick={handleGoBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <span className="ms-2">Volver</span>
    </button>
  );
}

export default BackIcon;
