import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import useFetch from '../../Hooks/useFetch';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

const Notifications = () => {
  let { buildingId } = useParams();
  const [notifications, setNotifications] = useState([]);
  const { data, loading, error } = useFetch(
    `users/${localStorage.getItem('userID')}`
  );

  useEffect(() => {
    setNotifications(data?.user?.notifications);
  }, [loading]);

  return (
    <>
      <Header backButton tittle={'Notificaciones'} />
      <button
        onClick={() => {
          console.log(notifications);
        }}
      >
        test
      </button>
      {notifications && notifications?.map((req) => <p>{req?.message}</p>)}
    </>
  );
};

export default Notifications;
