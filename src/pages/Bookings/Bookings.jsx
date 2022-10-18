import { useEffect, useState } from 'react';
import Header from '../../Components/Header';

import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

//MUI importation
import {
  Box,
  Paper,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Icon,
} from '@mui/material/';
//ICONS

import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { TbCalendarStats, TbCalendarEvent } from 'react-icons/tb';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdMeetingRoom } from 'react-icons/md';
//MOMENT JS
import moment from 'moment';
import {
  bookingCard,
  bookingCardContainer,
  bookingData,
  buildingCard,
  buildingCardContainer,
  resizeAsideStyle,
  titleStyle,
} from '../../muiStyles';
import useTranslate from '../../Hooks/useTranslate';
import translate from '../../functions/translate';
import { useResize } from '../../Hooks/useResize';

const BookingCard = ({
  buildingName,
  building_id,
  spaces,
  space_id,
  date,
  time,
  redirect,
  confirmed,
}) => (
  <Card variant="outlined" sx={bookingCard}>
    <CardContent>
      <Box sx={bookingData}>
        <Icon>
          <TbCalendarEvent />
        </Icon>
        <Typography>
          {date} | {translate(time)}
        </Typography>
      </Box>
      <Link className="nsLink" to={`/buildings/${building_id}`}>
        <Box sx={bookingData}>
          <Icon>
            <HiOutlineOfficeBuilding />
          </Icon>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {buildingName}
          </Typography>
        </Box>
      </Link>
      <Link className="nsLink" to={`/buildings/${building_id}/${space_id}`}>
        <Box sx={bookingData}>
          <Icon>
            <MdMeetingRoom />
          </Icon>
          <Typography color="text.secondary">{spaces}</Typography>
        </Box>
      </Link>

      <Box component="div" sx={bookingData}>
        <Icon sx={{ color: confirmed === true ? 'success.main' : 'info.main' }}>
          {confirmed === true ? (
            <AiOutlineCheckCircle />
          ) : (
            <AiOutlineClockCircle />
          )}
        </Icon>

        <Typography color={confirmed === true ? 'success.main' : 'info.main'}>
          {confirmed === true ? 'CONFIRMADA' : 'EN ESPERA'}
        </Typography>
      </Box>
    </CardContent>
    {/* <CardActions>
      <Button startIcon={<TbCalendarStats />} onClick={redirect} size="small">
        Ver todas
      </Button>
    </CardActions> */}
  </Card>
);

const Bookings = ({ isPage }) => {
  const [bookings, setBookings] = useState();
  const { data, loading, error } = useFetch('bookings/me');
  const navigate = useNavigate();
  const { isPhone } = useResize();

  useEffect(() => {
    setBookings(data?.booking);
  }, [loading]);

  return (
    <>
      {isPage && <Header title={'Mis reservas'} />}
      <Grid
        sx={
          !isPage && !isPhone
            ? {
                width: '25vw',
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'hidden',
              }
            : {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }
        }
      >
        <Box mt={2} mb={2}>
          <Button
            onClick={() => {
              navigate('/bookings/create');
            }}
            variant="outlined"
            //   startIcon={<HiOutlineOfficeBuilding />}
          >
            crear una reserva
          </Button>
        </Box>
        <Box
          sx={
            !isPage
              ? isPhone
                ? bookingCardContainer
                : resizeAsideStyle
              : bookingCardContainer
          }
        >
          {bookings && bookings.length > 0 ? (
            bookings?.map((booking) => (
              <>
                <BookingCard
                  key={booking?._id}
                  buildingName={booking?.building?.name}
                  building_id={booking?.building?._id}
                  space_id={booking?.space?._id}
                  spaces={booking?.space?.name}
                  date={moment(booking?.date).format('MM/DD/YY')}
                  time={booking?.time}
                  confirmed={booking?.reservationAccepted}
                  redirect={() => {
                    navigate(
                      `/buildings/${booking?.building?._id}/${booking?.space?._id}`
                    );
                  }}
                />
              </>
            ))
          ) : (
            <>
              <Paper elevation={0} sx={titleStyle}>
                <Typography>No tienes ninguna reserva</Typography>
              </Paper>
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Bookings;
