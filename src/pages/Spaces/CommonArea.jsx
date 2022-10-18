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
import { helpText } from '../../tootipsTexts';

const CommonArea = () => {
  let { spaceId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`bookings/?spaceId=${spaceId}`);
  const dispatch = useDispatch();
  dispatch(getBookingsOfSpace(spaceId));

  // MY BOOKINGS -use this for set object "bookings" and send to calendarPicker

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
