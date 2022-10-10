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
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';
import { RiUser2Line } from 'react-icons/ri';
const AddAdminButton = ({ addBtn, postAction, deleteAction }) => {
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
          sumar admin
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
          startIcon={
            onHover ? (
              <MdOutlinePersonRemove />
            ) : (
              <MdOutlineAdminPanelSettings />
            )
          }
          sx={{
            borderColor: 'success.main',
            color: 'success.main',
            '&:hover': {
              backgroundColor: 'error.main',
              borderColor: 'error.main',
              color: '#fff',
            },
          }}
        >
          {onHover ? (
            <Typography>Remover</Typography>
          ) : (
            <Typography>Admin</Typography>
          )}
        </Button>
      )}
    </>
  );
};

export default AddAdminButton;
