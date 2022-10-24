import React from 'react';
import { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import Header from '../../Components/Header';
import CardInviteRequest from '../../Components/CardInviteRequest';

import { Grid, Paper, Typography } from '@mui/material/';
import { titleStyle } from '../../muiStyles';
import { Helmet } from 'react-helmet';

const BuildingRequests = () => {
  const { data, loading, error, fetchGetData } = useFetch(
    `users/${localStorage.getItem('userID')}`
  );
  const [requests, setRequests] = useState();

  useEffect(() => {
    setRequests(data?.user?.tenantRequests);
  }, [loading]);
  return (
    <>
      <Header backButton title={'Invitaciones a edificios'} />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={4} sx={titleStyle}>
          <Typography>INVITACIONES A EDIFICIOS</Typography>
        </Paper>
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <CardInviteRequest
              name={request?.name}
              buildingId={request?._id}
              requests={requests}
              setRequests={setRequests}
            />
          ))
        ) : (
          <Paper elevation={0} sx={titleStyle}>
            <Typography>No tienes ninguna invitación</Typography>
          </Paper>
        )}
      </Grid>
    </>
  );
};

export default BuildingRequests;
