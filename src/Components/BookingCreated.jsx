import React from 'react';

import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Tooltip,
  Icon,
  Accordion,
  AccordionSummary,
  ButtonGroup,
  AccordionDetails,
} from '@mui/material/';

import moment from 'moment';
import { accordionSummaryStyle } from '../muiStyles';
import translate from '../functions/translate';

const BookingCreated = ({ date, time, bookedBy }) => {
  return (
    <Accordion elevation={4}>
      <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
        <Typography>{moment(date).format('MM/DD')}</Typography>
        <Typography>{translate(time)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Reserva creada por: {bookedBy}</Typography>
        <Typography>Fecha: {moment(date).format('MM/DD')}</Typography>
        <Typography>Durante: {translate(time)}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default BookingCreated;
