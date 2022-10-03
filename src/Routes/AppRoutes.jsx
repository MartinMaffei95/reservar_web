import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Buildings from '../pages/Buildings';
import CreateBuilding from '../pages/CreateBuilding';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buildings">
          <Route path="" element={<Buildings />} />
          <Route path="create" element={<CreateBuilding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
