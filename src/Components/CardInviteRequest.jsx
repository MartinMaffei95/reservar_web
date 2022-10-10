import React from 'react';
import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  ButtonGroup,
} from '@mui/material/';
import { buildingCard, cardContent, inviteRequestCard } from '../muiStyles';
import { MdCheck, MdClose } from 'react-icons/md';
import usePostFetch from '../Hooks/usePostFetch';

const CardInviteRequest = ({ name, icon, buildingId }) => {
  const { data, loading, error, fetchPostData } = usePostFetch();

  const acceptRequest = () => {
    fetchPostData(`users/addTenant/${buildingId}`);
  };

  return (
    <Card sx={inviteRequestCard}>
      <CardContent>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            size="large"
            sx={{ color: 'success.main', fontSize: '1.5em' }}
            onClick={acceptRequest}
          >
            <MdCheck />
          </Button>
          <Button size="large" sx={{ color: 'error.main', fontSize: '1.5em' }}>
            <MdClose />
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default CardInviteRequest;
