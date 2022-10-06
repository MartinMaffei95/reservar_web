import React from 'react';
import { useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';
import Header from '../Components/Header';
import { MdCheck } from 'react-icons/md';
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
      <Header />
      <div> SOLICITUDES PENDIENTES</div>
      {requests &&
        requests.map((user) => (
          <p>
            {user?.name} <MdCheck />
          </p>
        ))}
    </>
  );
};

export default BuildingRequests;
