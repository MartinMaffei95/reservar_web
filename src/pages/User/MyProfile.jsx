import {
  Paper,
  Grid,
  Typography,
  Tooltip,
  Icon,
  ButtonGroup,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiBell, FiBellOff } from 'react-icons/fi';

import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import useFetch from '../../Hooks/useFetch';
import {
  accordionSummaryStyle,
  profileInformationStyle,
} from '../../muiStyles';
import InformationPanel from '../../Components/InformationPanel';
import EditInformationPanel from '../../Components/EditInformationPanel';

const MyProfile = () => {
  const { data, loading } = useFetch(`users/${localStorage.getItem('userID')}`);
  const [profileInformation, setProfileInformation] = useState();
  const [config, setConfig] = useState();
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const accordeonStyle = {
    width: '90vw',
    marginBlock: '.5rem',
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const helpText = (
    <>
      <div>
        Esta informacion no es obligatoria y solo se mostrara a los demas
        usuarios si lo habilitas
      </div>
      <div>
        <AiOutlineEye /> Puedes habilitar para que vean tu informacion con el
        icono del ojo
      </div>
      <div>
        <FiBell /> Alertas vía mail: Puedes habilitarlas todas o personalizarlas
        y recibir solo la de los edificios que te interesan.
      </div>
      <div>
        <FiBell /> Si quieres que se te notificará cuando te inviten a un nuevo
        edificio
      </div>
    </>
  );

  useEffect(() => {
    setProfileInformation(data?.user);
    setConfig(data?.user?.profileConfig);
  }, [loading, data]);

  return (
    <>
      <Header title={'Mi informacion'} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {!editing ? (
          <Paper elevation={4} sx={profileInformationStyle}>
            <Typography>
              Tu nombre de usuario: {profileInformation?.username}
            </Typography>

            <InformationPanel profileData={profileInformation} />
            <Button
              onClick={() => {
                setEditing(true);
              }}
              variant="outlined"
              //   startIcon={<MdOutlineMeetingRoom />}
            >
              EDITAR
            </Button>
          </Paper>
        ) : (
          <Paper elevation={4} sx={profileInformationStyle}>
            <EditInformationPanel profileData={profileInformation} />
            <Button
              onClick={() => {
                setEditing(false);
              }}
              variant="outlined"
              //   startIcon={<MdOutlineMeetingRoom />}
            >
              cancelar
            </Button>
          </Paper>
        )}

        <Paper elevation={4} sx={profileInformationStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>Tus edificios: </Typography>
            <Typography>1</Typography>
          </Box>
          <Accordion sx={accordeonStyle} elevation={4}>
            <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
              <Typography> && NOMBRE DE EDIFICIO &&</Typography>
              <Button
                onClick={() => {}}
                variant="outlined"
                //   startIcon={<MdOutlineMeetingRoom />}
              >
                <FiBell />
              </Button>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Administradores</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Inquilinos</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Salas</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Reservas</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
    </>
  );
};

export default MyProfile;
