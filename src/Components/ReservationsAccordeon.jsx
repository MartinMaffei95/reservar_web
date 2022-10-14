import React from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Icon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material/';
import { accordionSummaryStyle } from '../muiStyles';
import BookingCreated from '../Components/BookingCreated';
import { useSelector } from 'react-redux';

const ReservationsAccordeon = () => {
  const bookings = useSelector((state) => state.buildingsReducer.bookings);
  return (
    <Accordion elevation={4}>
      <AccordionSummary
        expandIcon={'▼'}
        sx={(accordionSummaryStyle, { flexDirection: 'row' })}
      >
        <Typography>Reservas</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {bookings &&
          bookings.map((res) => (
            <BookingCreated
              date={res?.date}
              time={res?.time}
              bookedBy={res?.bookedBy?.username}
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ReservationsAccordeon;
