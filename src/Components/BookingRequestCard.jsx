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

const BookingRequest = ({
  buildingName,
  spaceName,
  space_id,
  booking_id,
  date,
  time,
}) => {
  const { data, loading, error, fetchPostData } = usePostFetch();
  const aceptRequest = () => {
    fetchPostData(`spaces/${space_id}/acept`, { booking_id: booking_id });
  };
  const denyRequest = () => {
    fetchPostData(`spaces/${space_id}/deny`, { booking_id: booking_id });
  };

  return (
    <Card sx={inviteRequestCard}>
      <CardContent>
        <Typography>{buildingName}</Typography>
        <Typography>{spaceName}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography>{date}</Typography>
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
