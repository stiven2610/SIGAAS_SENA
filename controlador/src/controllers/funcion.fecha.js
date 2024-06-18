function convertirFecha(fechaStr) {
    const partes = fechaStr.split("/");
    const año = partes[2];
    const mes = partes[0].padStart(2, "0");
    const dia = partes[1].padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }


  