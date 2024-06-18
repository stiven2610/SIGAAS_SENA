import React from 'react';
import "./styles.css";
// Definición del componente Boton
const Boton = ({ texto, icono, color, textcolor,tamaño }) => {
  return (
    <button className='boton' style={{ backgroundColor: color , color: textcolor ,width:tamaño}}>
      {icono && <span className="icon">{icono}</span>}
      {texto}
    </button>
  );
}

export default Boton;
