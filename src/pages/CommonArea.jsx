import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import FieldDatePicker from '../molecules/FieldDatePicker';
import useSwitchBookings from '../Hooks/useSwitchBookings';
import { AiFillQuestionCircle } from 'react-icons/ai';

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

const CommonArea = () => {
  let { spaceId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`bookings/?spaceId=${spaceId}`);

  const [bookings, setBookings] = useState();

  // MY BOOKINGS -use this for set object "bookings" and send to calendarPicker

  useEffect(() => {
    console.log(data?.bookings);
    setBookings(data?.bookings);
  }, [loading]);

  const helpText = (
    <>
      <div>
        Estos son las reservas activas para este mes. Cada circulo representa
        una reserva en la franja activa:
      </div>
      <div>Color1: Mañana (08 a 15)</div>
      <div>Color2: Tarde (15 a 19)</div>
      <div>Color3: Noche (21 a 06)</div>
    </>
  );

  const BookingsCreated = ({ date, time, bookedBy }) => (
    <Accordion elevation={4}>
      <AccordionSummary
        expandIcon={'▼'}
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          '& .MuiAccordionSummary-content': {
            justifyContent: 'space-between',
          },
          gap: '1rem',
        }}
      >
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

  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Typography>Reservas de este mes</Typography>
        <Tooltip arrow title={helpText}>
          <Icon>
            <AiFillQuestionCircle />
          </Icon>
        </Tooltip>
      </Box>

      <FieldDatePicker onlyCalendar bookings={bookings} />

      {bookings && (
        <Accordion elevation={4}>
          <AccordionSummary
            expandIcon={'▼'}
            sx={{
              display: 'flex',
              '& .MuiAccordionSummary-content': {
                justifyContent: 'space-between',
              },
              gap: '1rem',
            }}
          >
            <Typography>Reservas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bookings.map((res) => (
              <BookingsCreated
                date={res?.date}
                time={res?.time}
                bookedBy={res?.bookedBy?.username}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      <Box mt={2} mb={2}>
        <Button
          onClick={() => {
            navigate('/bookings/create');
          }}
          variant="outlined"
          //   startIcon={<HiOutlineOfficeBuilding />}
        >
          Reservar
        </Button>
      </Box>
    </div>
  );
};

export default CommonArea;
