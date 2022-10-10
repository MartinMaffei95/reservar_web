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

const BookingCreated = ({ date, time, bookedBy }) => {
  return (
    <Accordion elevation={4}>
      <AccordionSummary expandIcon={'▼'} sx={accordionSummaryStyle}>
        <Typography>{moment(date).format('MM/DD')}</Typography>
        <Typography>{time}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{bookedBy}</Typography>
        <Typography>{moment(date).format('MM/DD')}</Typography>
        <Typography>{time}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default BookingCreated;
