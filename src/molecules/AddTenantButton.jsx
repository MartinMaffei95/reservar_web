import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  InputBase,
  Paper,
  Divider,
  IconButton,
  Button,
} from '@mui/material/';
import {
  MdOutlinePersonAddAlt,
  MdOutlinePersonRemove,
  MdOutlinePerson,
} from 'react-icons/md';
const AddTenantButton = ({ addBtn, postAction, deleteAction }) => {
  //Hover state
  const [onHover, setOnHover] = useState(false);
  return (
    <>
      {addBtn ? (
        <Button
          onClick={postAction}
          variant="outlined"
          startIcon={<MdOutlinePersonAddAlt />}
        >
          add
        </Button>
      ) : (
        <Button
          onMouseEnter={() => {
            setOnHover(true);
          }}
          onMouseLeave={() => {
            setOnHover(false);
          }}
          onClick={deleteAction}
          variant="outlined"
          startIcon={onHover ? <MdOutlinePersonRemove /> : <MdOutlinePerson />}
          sx={{
            '&:hover': {
              backgroundColor: 'error.main',
              borderColor: 'error.main',
              color: '#fff',
            },
          }}
        >
          {onHover ? (
            <Typography>Cancelar</Typography>
          ) : (
            <Typography>Ya invitado</Typography>
          )}
        </Button>
      )}
    </>
  );
};

export default AddTenantButton;
