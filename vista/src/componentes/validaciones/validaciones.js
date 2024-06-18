
// validations.js
export const validateField = (name, value) => {
  const hoy = new Date();
  const haceTresAnios = new Date(
    hoy.getFullYear() - 3,
    hoy.getMonth(),
    hoy.getDate()
  );

  let errorMessage = "";
  switch (name) {
    case "nombre_completo_aprendiz":
      if (value.trim() === "" || value.length < 10) {
        errorMessage = "El nombre es invalido";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "El nombre solo puede contener letras ";
      }
      break;
      case "nombre_instructor_lider":
      if (value.trim() === "" || value.length < 10) {
        errorMessage = "El nombre es invalido";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = "El nombre solo puede contener letras ";
      }
      break;
    case "id_tipo_documento":
      if (!value) {
        errorMessage = "El tipo de documento es requerido";
      }
      break;
    case "numero_documento_aprendiz":
      if (!/^[0-9]+$/.test(value) || value.length < 7) {
        errorMessage = "Número de documento invalido";
      }
      
      break;
      case "numero_documento_instructor_lider":
        if (!/^[0-9]+$/.test(value) || value.length < 7) {
          errorMessage = "Número de documento invalido";
        }
        numero_documento_instructor_lider
        break;
    case "numero_telefono_fijo":
      if (!/^\d{6}$/.test(value) || value.length < 6) {
        errorMessage = " Número de fijo no valido";
      }
      break;
    case "numero_telefono_movil":
      if (
        !/^(3(0[0-5]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]))\d{7}$/.test(
          value
        )
      ) {
        errorMessage = "El número de teléfono móvil no es válido";
      }
      break;
    case "direccion_residencia_aprendiz":
      if (value.length < 15) {
        errorMessage = "La dirección debe ser mas especifica";
      }
      break;
      case "nombre_taller":
          if (value.trim() === "" || value.trim().length < 10 || value.trim() !== value) {
            errorMessage = "El nombre es inválido";
          } 
          break;
        
        
    case "email_aprendiz":
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        errorMessage = "El correo electrónico no es válido";
      }
      break;
    case "email_instructor":
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        errorMessage = "El correo electrónico no es válido";
      }
      break;
    case "codigo_ficha":
      if (!/^[0-9]+$/.test(value) || value.length < 6) {
        errorMessage = "Número de ficha invalido";
      }
      break;
    case "id_modalidad_formacion":
      if (!value) {
        errorMessage = "Por favor seleccione una modalidad";
      }
      break;
    case "":
      var fecha_inicio = new Date(value);
      if (!value) {
        errorMessage =
          "Por favor seleccione una fecha de inicio de formación";
      } else {
        if (fecha_inicio > hoy || fecha_inicio < haceTresAnios) {
          errorMessage = "Por favor verifique la fecha";
        }
      }
      break;
    case " ":
      var fecha_productiva = new Date(value);
      if (!value) {
        errorMessage =
          "Por favor seleccione una fecha de inicio de formación";
      } else {
        if (fecha_productiva < hoy || fecha_productiva > haceTresAnios) {
          errorMessage = "Por favor verifique la fecha ";
        }
      }
      break;
    case "fecha_fin_":
      var fecha_fin = new Date(value);
      if (!value) {
        errorMessage =
          "Por favor seleccione una fecha de inicio de formación";
      } else {
        if (fecha_fin < hoy || fecha_fin > haceTresAnios) {
          errorMessage = "Por favor verifique la fecha ";
        }
      }
      break;
    case "nivel_formacion":
      if (!value) {
        errorMessage = "Por favor seleccione una opción";
      }
      break;
      case "id_estado_aprendiz":
          if (!value) {
            errorMessage = "Por favor seleccione una opción";
          }
          break;
    case "id_obligacion_mensual":
      if (!value) {
        errorMessage = "Por favor seleccione una opción";
      }
      break;
    case "numero_resolucion_adjudicacion":
      if (!/^[0-9]+$/.test(value) || value.length < 7) {
        errorMessage = "Número de resolucion invalido";
      }
      break;
    case "codigo_beneficio":
      if (!value) {
        errorMessage = "Por favor seleccione una opción";
      }
      break;
    default:
      break;
  }
  return errorMessage;
};
