import React, { useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material/';
import useFetch from '../../Hooks/useFetch';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import {
  MdOutlinePersonAddAlt,
  MdOutlineMeetingRoom,
  MdOutlineNoMeetingRoom,
  MdOutlineRoomPreferences,
} from 'react-icons/md';
import { accordionSummaryStyle, titleStyle } from '../../muiStyles';
import useDeleteFetch from '../../Hooks/useDeleteFetch';
import BookingRequest from '../../Components/BookingRequestCard';

const BuildingPage = () => {
  let { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState();
  const { data, loading, error, fetchGetData } = useFetch(
    `buildings/${buildingId}`
  );

  const deleteHook = useDeleteFetch();
  const deleteAction = async (userId, bodyData) => {
    deleteHook.fetchDeleteData(`users/removeTenant/${userId}`, bodyData);
  };

  const isReserved = (bookings) => {
    for (let i = 0; i < bookings.length; i++) {
      if (moment(bookings[i]?.date).isSame(moment(), 'day')) {
        return true;
      }
    }
  };

  useEffect(() => {
    if (deleteHook.data.message === 'REMOVED_USER_FROM_BUILDING') {
      alert('Eliminado');
      fetchGetData(`buildings/${buildingId}`);
    }
  }, [deleteHook?.loading]);

  useEffect(() => {
    setBuilding(data?.building);
    console.log(data?.building);
  }, [loading, deleteHook?.loading]);

  const accordeonStyle = {
    width: '90vw',
    marginBlock: '.5rem',
  };

  const VerifiedModule = ({ children }) => {
    if (
      building?.admin?.find((admin) =>
        admin?.username?.includes(localStorage.getItem('username'))
      )
    ) {
      return <>{children}</>;
    }
    return;
  };
  return (
    <div>
      <Header backButton title={'Informacion del edificio'} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={4} sx={titleStyle}>
          <Typography>{building?.name}</Typography>
        </Paper>

        <Accordion sx={accordeonStyle} elevation={4}>
          <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
            <Typography>ADMINISTRADORES:</Typography>
            <VerifiedModule>
              <Button
                onClick={() => {
                  navigate(`admin`);
                }}
                variant="outlined"
                startIcon={<MdOutlinePersonAddAlt />}
              >
                add
              </Button>
            </VerifiedModule>
          </AccordionSummary>
          {building?.admin?.map((a) => (
            <AccordionDetails>
              <Typography>{a.username}</Typography>
            </AccordionDetails>
          ))}
        </Accordion>

        <Accordion sx={accordeonStyle} elevation={4}>
          <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
            <Typography>SALAS CREADAS:</Typography>
            <VerifiedModule>
              <Button
                onClick={() => {
                  navigate(`create`);
                }}
                variant="outlined"
                startIcon={<MdOutlineMeetingRoom />}
              >
                add
              </Button>
            </VerifiedModule>
          </AccordionSummary>
          {building?.spaces?.length > 0 ? (
            building?.spaces?.map((s) => (
              <AccordionDetails
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>
                  <Link to={`${s._id}`}>{s.name}</Link>
                </Typography>
                {isReserved(s?.bookings) ? 'RESERVADO' : 'LIBRE'}
              </AccordionDetails>
            ))
          ) : (
            <AccordionDetails>
              <Typography>Nada por aqui! :(</Typography>
            </AccordionDetails>
          )}
        </Accordion>

        <Accordion sx={accordeonStyle} elevation={4}>
          <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
            <Typography>INQUILINOS:</Typography>
            <VerifiedModule>
              <Button
                onClick={() => {
                  navigate(`tenants`);
                }}
                variant="outlined"
                startIcon={<MdOutlinePersonAddAlt />}
              >
                add
              </Button>
            </VerifiedModule>
          </AccordionSummary>
          {building?.tenants?.map((s) => (
            <AccordionDetails
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography>{s.username}</Typography>
              <VerifiedModule>
                <Button
                  onClick={() => {
                    deleteAction(s._id, { buildingId: buildingId });
                  }}
                  variant="outlined"
                  startIcon={<MdOutlinePersonAddAlt />}
                  sx={{
                    backgroundColor: 'error.main',
                    borderColor: 'error.main',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'error.main',
                      borderColor: 'error.main',
                      color: '#000',
                    },
                  }}
                >
                  eliminar
                </Button>
              </VerifiedModule>
            </AccordionDetails>
          ))}
        </Accordion>

        <VerifiedModule>
          <Accordion sx={accordeonStyle} elevation={4}>
            <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
              <Typography>RESERVAS SIN CONFIRMAR:</Typography>
            </AccordionSummary>
            <AccordionDetails
            // sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {building?.spaces?.map((s) =>
                s?.standByBookings?.map((req) => (
                  <BookingRequest
                    buildingName={req?.building?.name}
                    spaceName={req?.space?.name}
                    space_id={req?.space?._id}
                    date={req?.date}
                    time={req?.time}
                    booking_id={req?._id}
                  />
                ))
              )}
            </AccordionDetails>
          </Accordion>
        </VerifiedModule>
        <Button
          onClick={() => {
            deleteAction(localStorage.getItem('userID'), {
              buildingId: buildingId,
            });
          }}
          variant="outlined"
          startIcon={<MdOutlinePersonAddAlt />}
          sx={{
            backgroundColor: 'error.main',
            borderColor: 'error.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'error.main',
              borderColor: 'error.main',
              color: '#000',
            },
          }}
        >
          ABANDONAR
        </Button>
      </Grid>
    </div>
  );
};

export default BuildingPage;
