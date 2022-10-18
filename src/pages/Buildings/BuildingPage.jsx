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
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  MdOutlinePersonAddAlt,
  MdOutlinePersonRemove,
  MdOutlineMeetingRoom,
  MdOutlineNoMeetingRoom,
  MdOutlineRoomPreferences,
} from 'react-icons/md';
import {
  accordeonStyle,
  accordionSummaryStyle,
  titleStyle,
} from '../../muiStyles';
import { useSelector, useDispatch } from 'react-redux';
import { makeToast, removeTenant } from '../../Redux/actions/buildingsActions';
import { useBuildings } from '../../Hooks/useBuildings';
import { BookingsAccordion } from '../../Components/BookingsAccordion';

const BuildingPage = () => {
  let { buildingId } = useParams();
  const navigate = useNavigate();
  useBuildings(buildingId);
  const dispatch = useDispatch();
  const building = useSelector(
    (state) => state.buildingsReducer.buildingFetchedData
  );

  const isReserved = (bookings) => {
    for (let i = 0; i < bookings.length; i++) {
      if (moment(bookings[i]?.date).isSame(moment(), 'day')) {
        return true;
      }
    }
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
            <AccordionDetails key={a._id}>
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
                key={s._id}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>
                  <Link className="nsLink" to={`${s._id}`}>
                    {s.name}
                  </Link>
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
              key={s._id}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography>{s.username}</Typography>
              <VerifiedModule>
                <Button
                  onClick={() => {
                    dispatch(
                      removeTenant(
                        s._id,
                        { buildingId: buildingId },
                        buildingId
                      )
                    );
                  }}
                  variant="outlined"
                  startIcon={<MdOutlinePersonRemove />}
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
            <AccordionDetails>
              <BookingsAccordion />
            </AccordionDetails>
          </Accordion>
        </VerifiedModule>

        <Button
          onClick={() => {
            dispatch(
              removeTenant(
                localStorage.getItem('userID'),
                {
                  buildingId: buildingId,
                },
                buildingId
              )
            );
          }}
          variant="outlined"
          startIcon={<MdOutlinePersonAddAlt />}
          sx={{
            marginTop: '2em',
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
