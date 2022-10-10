import React from 'react';
import { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import Header from '../../Components/Header';
import CardInviteRequest from '../../Components/CardInviteRequest';

import { Grid } from '@mui/material/';

const BuildingRequests = () => {
  const { data, loading, error } = useFetch(
    `users/${localStorage.getItem('userID')}`
  );
  const [requests, setRequests] = useState();

  useEffect(() => {
    setRequests(data?.user?.tenantRequests);
  }, [loading]);
  return (
    <>
      <Header backButton title={'Invitaciones a edificios'} />
      <div> SOLICITUDES PENDIENTES</div>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {requests &&
          requests.map((request) => (
            <CardInviteRequest name={request?.name} buildingId={request?._id} />
          ))}
      </Grid>
    </>
  );
};

export default BuildingRequests;
