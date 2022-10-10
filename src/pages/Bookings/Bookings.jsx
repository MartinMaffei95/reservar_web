import { useEffect, useState } from 'react';
import Header from '../../Components/Header';

import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

//MUI importation
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material/';
import { TbCalendarStats } from 'react-icons/tb';
//MOMENT JS
import moment from 'moment';
import { buildingCard } from '../../muiStyles';

const BookingCard = ({ buildingName, spaces, date, time, redirect }) => (
  <Card variant="outlined" sx={buildingCard}>
    <CardContent>
      <Typography>
        {date} | {time}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        {buildingName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {spaces}
      </Typography>
    </CardContent>
    <CardActions>
      <Button startIcon={<TbCalendarStats />} onClick={redirect} size="small">
        Ver todas
      </Button>
    </CardActions>
  </Card>
);

const Bookings = () => {
  const [bookings, setBookings] = useState();
  const { data, loading, error } = useFetch('bookings/me');
  const navigate = useNavigate();
  useEffect(() => {
    setBookings(data.booking);
    console.log(data.booking);
  }, [loading]);

  return (
    <div>
      <Header title={'Mis reservas'} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {bookings ? (
          bookings?.map((booking) => (
            <BookingCard
              key={booking?._id}
              buildingName={booking?.building?.name}
              spaces={booking?.space?.name}
              date={moment(booking?.date).format('MM/DD/YY')}
              time={booking?.time}
              redirect={() => {
                navigate(
                  `/buildings/${booking?.building?._id}/${booking?.space?._id}`
                );
              }}
            />
          ))
        ) : (
          <div>Nada por aqui! :S</div>
        )}
      </Grid>
    </div>
  );
};

export default Bookings;
