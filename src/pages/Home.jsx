import React from 'react';
import Header from '../Components/Header';
import { useResize } from '../Hooks/useResize';
import AppRoutes from '../Routes/AppRoutes';
import Bookings from './Bookings/Bookings';

const Home = () => {
  const { isPhone } = useResize();
  return (
    <div>
      <Header />
      {!isPhone && <Bookings />}
    </div>
  );
};

export default Home;
