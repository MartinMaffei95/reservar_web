import React, { useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
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
import useFetch from '../Hooks/useFetch';
import { useEffect } from 'react';

import {
  MdOutlinePersonAddAlt,
  MdOutlineMeetingRoom,
  MdOutlineNoMeetingRoom,
  MdOutlineRoomPreferences,
} from 'react-icons/md';

const BuildingPage = () => {
  let { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState();
  const { data, loading, error } = useFetch(`buildings/${buildingId}`);

  useEffect(() => {
    setBuilding(data.building);
  }, [loading]);

  const accordeonStyle = {
    width: '90vw',
    marginBlock: '.5rem',
  };

  const titleStyle = {
    marginBlock: '1rem .5rem',
    width: '80vw',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
      <Header />
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
          <AccordionSummary
            expandIcon={'▼'}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-content': {
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              gap: '1rem',
            }}
          >
            <Typography>ADMINISTRADORES:</Typography>
            <Button
              // onClick={() => {
              //   navigate('/buildings/create');
              // }}
              variant="outlined"
              startIcon={<MdOutlinePersonAddAlt />}
            >
              add
            </Button>
          </AccordionSummary>
          {building?.admin?.map((a) => (
            <AccordionDetails>
              <Typography>{a.username}</Typography>
            </AccordionDetails>
          ))}
        </Accordion>

        <Accordion sx={accordeonStyle} elevation={4}>
          <AccordionSummary
            expandIcon={'▼'}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-content': {
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              gap: '1rem',
            }}
          >
            <Typography>SALAS CREADAS:</Typography>
            <Button
              // onClick={() => {
              //   navigate('/buildings/create');
              // }}
              variant="outlined"
              startIcon={<MdOutlineMeetingRoom />}
            >
              add
            </Button>
          </AccordionSummary>
          {building?.spaces?.length > 0 ? (
            building?.spaces?.map((s) => (
              <AccordionDetails>
                <Typography>{s.name}</Typography>
              </AccordionDetails>
            ))
          ) : (
            <AccordionDetails>
              <Typography>Nada por aqui! :(</Typography>
            </AccordionDetails>
          )}
        </Accordion>

        <Accordion sx={accordeonStyle} elevation={4}>
          <AccordionSummary
            expandIcon={'▼'}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-content': {
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              gap: '1rem',
            }}
          >
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
