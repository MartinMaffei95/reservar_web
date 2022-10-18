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
import MyToolTip from '../../molecules/MyToolTip';

//REDUX
import { useSelector } from 'react-redux';
import Bookings from '../Bookings/Bookings';
import { useResize } from '../../Hooks/useResize';

const MyProfile = () => {
  const { data, loading } = useFetch(`users/${localStorage.getItem('userID')}`);
  const [profileInformation, setProfileInformation] = useState();
  const [config, setConfig] = useState();
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const { isPhone } = useResize();

  const myBuildings = useSelector(
    (state) => state?.userReducer?.myUserInformation?.buildings
  );
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

  useEffect(() => {
    setProfileInformation(data?.user);
    setConfig(data?.user?.profileConfig);
  }, [loading, data]);

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
      {/* <div>
        <FiBell /> Alertas vía mail: Puedes habilitarlas todas o personalizarlas
        y recibir solo la de los edificios que te interesan.
      </div>
      <div>
        <FiBell /> Si quieres que se te notificará cuando te inviten a un nuevo
        edificio
      </div> */}
    </>
  );
  return (
    <>
      <Header title={'Mi informacion'} />
      <Grid container direction="row" justifyContent="space-around">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={
            isPhone
              ? {
                  maxWidth: '90%',
                  minWidth: '80%',
                  marginInline: 'auto',
                  gap: '1rem',
                }
              : {
                  // backgroundColor: 'red',
                  maxWidth: '70vw',
                  minWidth: '60vw',
                  gap: '1rem',
                  '& .MuiBox-root': {
                    maxWidth: '100%',
                    minWidth: '90%',
                  },
                  '& .MuiPaper-root': {
                    maxWidth: '100%',
                    minWidth: '90%',
                  },
                }
          }
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              width: '90vw',
            }}
          >
            {!editing ? (
              <Paper elevation={4} sx={profileInformationStyle}>
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
              <Paper
                elevation={4}
                sx={
                  (profileInformationStyle,
                  { position: 'relative', marginTop: '1em' })
                }
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginBottom: '1em',
                  }}
                >
                  <Button
                    onClick={() => {
                      setEditing(false);
                    }}
                    variant="outlined"
                  >
                    cancelar
                  </Button>
                  <Button
                    component="button"
                    type="submit"
                    form={'form_editProfile'}
                    variant="contained"
                    disableElevation
                  >
                    Guardar
                  </Button>
                  <MyToolTip text={helpText} icon={<AiFillQuestionCircle />} />
                </Box>
                <EditInformationPanel profileData={profileInformation} />
              </Paper>
            )}
          </Box>
          <Paper elevation={4} sx={profileInformationStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography>Tus edificios: </Typography>
              <Typography>{myBuildings?.length}</Typography>
            </Box>
            {myBuildings?.map((b) => (
              <Accordion sx={accordeonStyle} elevation={4}>
                <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
                  <Typography> {b?.name}</Typography>
                  <Button
                    onClick={() => {}}
                    variant="outlined"
                    //   startIcon={<MdOutlineMeetingRoom />}
                  >
                    <FiBell />
                  </Button>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Administrador/es</Typography>
                    {b?.admin?.map((a) => (
                      <Typography>{a.name}</Typography>
                    ))}
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Inquilinos</Typography>
                    <Typography>{b?.tenants?.length}</Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Salas</Typography>
                    <Typography>{b?.spaces?.length}</Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
        {!isPhone && <Bookings />}
      </Grid>
    </>
  );
};

export default MyProfile;
