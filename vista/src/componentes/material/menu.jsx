
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { AuthContext } from '../AppRoutes/Authcontext';
const options = [
  'Cancelados',
  'Parametros',
  'Cerrar sesión',
'Nuevo beneficio'
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Solo necesitas obtener la función logout del contexto

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    handleClose(); 
    if (option === 'Cerrar sesión') {
      logout();
    }else if (option === 'Cancelados' ){
navigate("/cancelados")
    }else if (option === 'Parametros' ){
        navigate("/equipo")
            }else if (option === 'Información' ){
                navigate("/informacion")
                    }else if (option === 'Nuevo beneficio' ){
                      navigate("/creacionbeneficio")
                          }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={() => handleMenuItemClick(option)} // Pasar la opción seleccionada al manejador
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}