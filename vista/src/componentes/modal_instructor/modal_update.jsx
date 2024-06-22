
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modal_update = ({ open, onClose, persona }) => {
  const [datos, setDatos] = useState({ nombre: '', apellido: '', cargo: '', descripcion: '', ruta_foto: null });
console.log(datos)
  useEffect(() => {
    if (persona) {
      setDatos(persona);
    }
  }, [persona]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'ruta_foto') {
      setDatos({ ...datos, [name]: files[0] });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const handleSave = () => {
    // Crear un FormData con los datos
    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('apellido', datos.apellido);
    formData.append('cargo', datos.cargo);
    formData.append('descripcion', datos.descripcion);
    if (datos.ruta_foto) {
      formData.append('ruta_foto', datos.ruta_foto);
    }

    // Ejemplo de cómo enviar los datos a un servidor (ajusta según tu necesidad)
    fetch('http://  localhost:4000/update_persona', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos guardados:', data);
        onClose();
      })
      .catch(error => {
        alert("NO se pudieron enviar los datos ")
        console.error('Error al guardar los datos:', error);
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Editar Persona
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="apellido"
            value={datos.apellido}
            onChange={handleChange}
            margin="normal"
          />
          <label htmlFor="ruta_foto">Fotografía</label>
          <input
            type="file"
            name="ruta_foto"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Cargo"
            name="cargo"
            value={datos.cargo}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancelar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Modal_update;