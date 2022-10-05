import { useEffect, useState } from 'react';
import Header from '../Components/Header';

import { useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';

//MUI importation
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material/';

//MOMENT JS
import moment from 'moment';

const BookingCard = ({ buildingName, spaces, date, time, redirect }) => (
  <Card variant="outlined" sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {date} | {time}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {buildingName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {spaces}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={redirect} size="small">
        Ver disponibilidad
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
      <Header />
      {bookings ? (
        bookings?.map((booking) => (
          <BookingCard
            key={booking?._id}
            buildingName={booking?.building?.name}
            spaces={booking?.space?.name}
            date={moment(booking?.date).format('MM DD YY')}
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
    </div>
  );
};

export default Bookings;
