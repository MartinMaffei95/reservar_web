import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import FieldDatePicker from '../../molecules/FieldDatePicker';
import { AiFillQuestionCircle } from 'react-icons/ai';

import { Box, Button, Typography, Tooltip, Icon } from '@mui/material/';

import { useDispatch, useSelector } from 'react-redux';
import ReservationsAccordeon from '../../Components/ReservationsAccordeon';
import {
  getBookingsOfSpace,
  getSpecificSpace,
} from '../../Redux/actions/buildingsActions';
import { helpText } from '../../tootipsTexts';
import { Helmet } from 'react-helmet';
import MyToolTip from '../../molecules/MyToolTip';

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
      <Header backButton title={`Zona comun - ${thisSpace?.name}`} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant={'h4'}>Reservas de este mes</Typography>
        <MyToolTip inline icon={<AiFillQuestionCircle />} text={helpText} />
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
