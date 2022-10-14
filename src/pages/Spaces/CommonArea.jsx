import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import FieldDatePicker from '../../molecules/FieldDatePicker';
import useSwitchBookings from '../../Hooks/useSwitchBookings';
import { AiFillQuestionCircle } from 'react-icons/ai';

import { Box, Button, Typography, Tooltip, Icon } from '@mui/material/';

import moment from 'moment';
import { accordionSummaryStyle } from '../../muiStyles';
import { useDispatch, useSelector } from 'react-redux';
import ReservationsAccordeon from '../../Components/ReservationsAccordeon';
import { getBookingsOfSpace } from '../../Redux/actions/buildingsActions';

const CommonArea = () => {
  let { spaceId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`bookings/?spaceId=${spaceId}`);
  const dispatch = useDispatch();
  dispatch(getBookingsOfSpace(spaceId));

  // MY BOOKINGS -use this for set object "bookings" and send to calendarPicker

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

  return (
    <div>
      <Header backButton title={'Zona comun - &&NOMBRE+SALA&&'} />
      <Box sx={{ display: 'flex' }}>
        <Typography>Reservas de este mes</Typography>
        <Tooltip arrow title={helpText}>
          <Icon>
            <AiFillQuestionCircle />
          </Icon>
        </Tooltip>
      </Box>

      <FieldDatePicker onlyCalendar />
      <ReservationsAccordeon />
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
