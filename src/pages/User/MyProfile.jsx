import { useState } from 'react';
import { useResize } from '../../Hooks/useResize';

//Components

import {
  Paper,
  Grid,
  Typography,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Header from '../../Components/Header';
import InformationPanel from '../../Components/InformationPanel';
import EditInformationPanel from '../../Components/EditInformationPanel';
import MyToolTip from '../../molecules/MyToolTip';
import Bookings from '../Bookings/Bookings';

// styles and icons
import {
  accordionSummaryStyle,
  profileInformationStyle,
} from '../../muiStyles';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { FiBell, FiBellOff } from 'react-icons/fi';
import { configuration_helpText } from '../../tootipsTexts';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  addAlertOnBuilding,
  removeAlertOnBuilding,
} from '../../Redux/actions/buildingsActions';

const MyProfile = () => {
  const [editing, setEditing] = useState(false);
  const { isPhone } = useResize();
  // redux state
  const myUser = useSelector((state) => state?.userReducer?.myUserInformation);
  const dispatch = useDispatch();

  const accordeonStyle = {
    width: '90vw',
    marginBlock: '.5rem',
  };

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
                <InformationPanel profileData={myUser} />
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
                  <MyToolTip
                    text={configuration_helpText}
                    icon={<AiFillQuestionCircle />}
                  />
                </Box>
                <EditInformationPanel
                  closeEdit={() => {
                    setEditing(false);
                  }}
                  profileData={myUser}
                />
              </Paper>
            )}
          </Box>
          <Paper elevation={4} sx={profileInformationStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography>Tus edificios: </Typography>
              <Typography>{myUser?.buildings?.length}</Typography>
            </Box>
            {myUser?.buildings?.map((b) => (
              <Accordion key={b?._id} sx={accordeonStyle} elevation={4}>
                <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
                  <Typography> {b?.name}</Typography>
                  {b.tenantsToAlert.includes(localStorage.getItem('userID')) ? (
                    <Button
                      onClick={() => {
                        dispatch(removeAlertOnBuilding(b?._id));
                      }}
                      variant="outlined"
                      //   startIcon={<MdOutlineMeetingRoom />}
                    >
                      <FiBell />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        dispatch(addAlertOnBuilding(b?._id));
                      }}
                      variant="outlined"
                      //   startIcon={<MdOutlineMeetingRoom />}
                    >
                      <FiBellOff />
                    </Button>
                  )}
                </AccordionSummary>
                <AccordionDetails
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Administrador/es</Typography>
                    {b?.admin?.map((a) => (
                      <Typography key={a._id}>{a.name}</Typography>
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
