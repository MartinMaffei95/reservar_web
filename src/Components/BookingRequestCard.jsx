import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  ButtonGroup,
  Box,
  Divider,
} from '@mui/material/';
import { buildingCard, cardContent, inviteRequestCard } from '../muiStyles';
import { MdCheck, MdClose } from 'react-icons/md';
import usePostFetch from '../Hooks/usePostFetch';
import moment from 'moment';
import { postAction } from '../services/axiosActions';
import { useSelector, useDispatch } from 'react-redux';
import { aceptBooking, denyBooking } from '../Redux/actions/buildingsActions';
const BookingRequest = ({
  buildingName,
  building_id,
  spaceName,
  space_id,
  booking_id,
  date,
  time,
}) => {
  const dispatch = useDispatch();

  console.log(booking_id);
  const aceptRequest = () => {
    const body = { booking_id: booking_id };
    dispatch(aceptBooking(space_id, body, building_id));
  };
  const denyRequest = () => {
    const body = { booking_id: booking_id };
    dispatch(denyBooking(space_id, body, building_id));
  };

  return (
    <Card sx={inviteRequestCard}>
      <CardContent>
        <Typography>{buildingName}</Typography>
        <Typography>{spaceName}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography>{moment(date).format('MM/DD/YY')} - </Typography>
          <Divider orientation="vertical" flexItem light />
          <Typography>{time}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            size="large"
            sx={{ color: 'success.main', fontSize: '1.5em' }}
            onClick={aceptRequest}
          >
            <MdCheck />
          </Button>
          <Button
            size="large"
            sx={{ color: 'error.main', fontSize: '1.5em' }}
            onClick={denyRequest}
          >
            <MdClose />
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
export default BookingRequest;
