import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  ButtonGroup,
  Box,
  Divider,
  Icon,
} from '@mui/material/';
import {
  bookingData,
  buildingCard,
  cardContent,
  inviteRequestCard,
} from '../muiStyles';
import { MdCheck, MdClose, MdMeetingRoom } from 'react-icons/md';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { aceptBooking, denyBooking } from '../Redux/actions/buildingsActions';
import translate from '../functions/translate';
import { TbCalendarEvent } from 'react-icons/tb';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

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

  const aceptRequest = () => {
    const body = { booking_id: booking_id };
    try {
      dispatch(aceptBooking(space_id, body, building_id));
    } catch (e) {
      alert('nativ');
    }
  };
  const denyRequest = () => {
    const body = { booking_id: booking_id };
    try {
      dispatch(denyBooking(space_id, body, building_id));
    } catch (e) {}
  };

  return (
    <Card sx={inviteRequestCard}>
      <CardContent>
        <Box sx={bookingData}>
          <Icon>
            <HiOutlineOfficeBuilding />
          </Icon>
          <Typography>{buildingName}</Typography>
        </Box>
        <Box sx={bookingData}>
          <Icon>
            <MdMeetingRoom />
          </Icon>
          <Typography>{spaceName}</Typography>
        </Box>
        <Box sx={bookingData}>
          <Icon>
            <TbCalendarEvent />
          </Icon>
          <Typography sx={{ marginRight: '.5em' }}>
            {moment(date).format('MM/DD/YY')}
          </Typography>

          <Typography>{translate(time)}</Typography>
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
