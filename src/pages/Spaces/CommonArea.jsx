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
import {
  getBookingsOfSpace,
  getSpecificSpace,
} from '../../Redux/actions/buildingsActions';
import { helpText } from '../../tootipsTexts';
import { Helmet } from 'react-helmet';

const CommonArea = () => {
  let { buildingId, spaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const thisSpace = useSelector(
    (state) => state?.buildingsReducer?.bulidingFetched_Space
  );

  useEffect(() => {
    dispatch(getSpecificSpace(spaceId));
    dispatch(getBookingsOfSpace(spaceId));
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          {thisSpace?.name || 'Area común'} |{' '}
          {thisSpace?.fromBuilding?.name || 'TakeZoom'}
        </title>
      </Helmet>
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
