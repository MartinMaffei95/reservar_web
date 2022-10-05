import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Buildings from '../pages/Buildings';
import CreateBuilding from '../pages/CreateBuilding';
import CreateBookings from '../pages/CreateBookings';
import Bookings from '../pages/Bookings';
import CommonArea from '../pages/CommonArea';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buildings">
          <Route path="" element={<Buildings />} />
          <Route path="create" element={<CreateBuilding />} />
          {/* <Route path=":buildingId" element={<CreateBuilding />} /> */}
          <Route path=":buildingId/:spaceId" element={<CommonArea />} />
        </Route>
        <Route path="/bookings">
          <Route path="" element={<Bookings />} />
          <Route path="create" element={<CreateBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
