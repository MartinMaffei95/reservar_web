import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

//MUI importation
import { Box, Paper, Button, Typography, Grid } from '@mui/material/';
//ICONS

//MOMENT JS
import moment from 'moment';
import {
  bookingCardContainer,
  resizeAsideStyle,
  titleStyle,
} from '../../muiStyles';
import { useResize } from '../../Hooks/useResize';
import { BookingCard } from '../../molecules/BookingCard';

const Bookings = ({ isPage, disableBtn }) => {
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
        {!disableBtn && (
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
        )}

        <Box
          mt={disableBtn && 2}
          mb={disableBtn && 2}
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
              <BookingCard
                key={booking?._id}
                buildingName={booking?.building?.name}
                building_id={booking?.building?._id}
                space_id={booking?.space?._id}
                spaces={booking?.space?.name}
                date={moment(booking?.date).format('MM/DD/YY')}
                time={booking?.time}
                status={booking?.status}
                redirect={() => {
                  navigate(
                    `/buildings/${booking?.building?._id}/${booking?.space?._id}`
                  );
                }}
              />
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
