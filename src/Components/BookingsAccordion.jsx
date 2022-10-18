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
import { accordeonStyle } from '../muiStyles';
import { useSelector, useDispatch } from 'react-redux';
import BookingRequest from './BookingRequestCard';

export const BookingsAccordion = () => {
  const reservationsOnHold = useSelector(
    (state) => state.buildingsReducer.buildingFetched_Bookings
  );

  return (
    <AccordionDetails>
      {reservationsOnHold.map((booking, i) => (
        <BookingRequest
          key={i}
          buildingName={booking?.building?.name}
          building_id={booking?.building?._id}
          spaceName={booking?.space?.name}
          space_id={booking?.space?._id}
          date={booking?.date}
          time={booking?.time}
          booking_id={booking?._id}
        />
      ))}
    </AccordionDetails>
  );
};
