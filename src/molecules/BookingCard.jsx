import { Link } from 'react-router-dom';

//MUI importation
import { Box, Card, Typography, CardContent, Icon } from '@mui/material/';
//ICONS

import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { TbCalendarEvent } from 'react-icons/tb';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdMeetingRoom } from 'react-icons/md';
//MOMENT JS
import { bookingCard, bookingData } from '../muiStyles';
import translate from '../functions/translate';
import { MdClose } from 'react-icons/md';

export const BookingCard = ({
  buildingName,
  building_id,
  spaces,
  space_id,
  date,
  time,
  redirect,
  status,
}) => {
  const BookingStatus = ({ status }) => {
    switch (status) {
      case 'ACEPTED':
        return (
          <Box component="div" sx={bookingData}>
            <Icon sx={{ color: 'success.main' }}>
              <AiOutlineCheckCircle />
            </Icon>
            <Typography color={'success.main'}>CONFIRMADA</Typography>
          </Box>
        );
      case 'DENY':
        return (
          <Box component="div" sx={bookingData}>
            <Icon sx={{ color: 'error.main' }}>
              <MdClose />
            </Icon>
            <Typography color={'error.main'}>CANCELADA</Typography>
          </Box>
        );
      case 'ON_WAIT':
        return (
          <Box component="div" sx={bookingData}>
            <Icon sx={{ color: 'info.main' }}>
              <AiOutlineClockCircle />
            </Icon>
            <Typography color={'info.main'}>EN ESPERA</Typography>
          </Box>
        );
    }
  };

  return (
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
          <Box sx={[bookingData, { color: 'text.primary' }]}>
            <Icon>
              <HiOutlineOfficeBuilding />
            </Icon>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {buildingName}
            </Typography>
          </Box>
        </Link>
        <Link className="nsLink" to={`/buildings/${building_id}/${space_id}`}>
          <Box sx={[bookingData, { color: 'text.primary' }]}>
            <Icon>
              <MdMeetingRoom />
            </Icon>
            <Typography color="text.secondary">{spaces}</Typography>
          </Box>
        </Link>

        <BookingStatus status={status} />
      </CardContent>
      {/* <CardActions>
      <Button startIcon={<TbCalendarStats />} onClick={redirect} size="small">
        Ver todas
      </Button>
    </CardActions> */}
    </Card>
  );
};
