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

const BuildingPage = () => {
  let { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState();
  const { data, loading, error } = useFetch(`buildings/${buildingId}`);

  const isReserved = (bookings) => {
    for (let i = 0; i < bookings.length; i++) {
      if (moment(bookings[i]?.date).isSame(moment(), 'day')) {
        return true;
      }
    }
  };

  useEffect(() => {
    setBuilding(data?.building);
  }, [loading]);

  const accordeonStyle = {
    width: '90vw',
    marginBlock: '.5rem',
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
            {data?.building?.admin?.map(
              (admin) =>
                admin?.username?.includes(localStorage.getItem('username')) && (
                  <Button
                    onClick={() => {
                      navigate(`admin`);
                    }}
                    variant="outlined"
                    startIcon={<MdOutlinePersonAddAlt />}
                  >
                    add
                  </Button>
                )
            )}
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
            <Button
              onClick={() => {
                navigate(`create`);
              }}
              variant="outlined"
              startIcon={<MdOutlineMeetingRoom />}
            >
              add
            </Button>
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
            <Button
              onClick={() => {
                navigate(`tenants`);
              }}
              variant="outlined"
              startIcon={<MdOutlinePersonAddAlt />}
            >
              add
            </Button>
          </AccordionSummary>
          {building?.tenants?.map((s) => (
            <AccordionDetails>
              <Typography>{s.username}</Typography>
            </AccordionDetails>
          ))}
        </Accordion>
      </Grid>
    </div>
  );
};

export default BuildingPage;
