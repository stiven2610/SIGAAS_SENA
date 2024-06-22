import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

const BackIcon = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en la historia del navegador
  };

  return (
    <button className="btn_volver" onClick={handleGoBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <span className="ms-2">Volver</span>
    </button>
  );
}

export default BackIcon;
