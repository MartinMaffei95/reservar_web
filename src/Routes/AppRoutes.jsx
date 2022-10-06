import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Home from '../pages/Home';
import Buildings from '../pages/Buildings';
import CreateBuilding from '../pages/CreateBuilding';
import CreateBookings from '../pages/CreateBookings';
import Bookings from '../pages/Bookings';
import CommonArea from '../pages/CommonArea';
import BuildingPage from '../pages/BuildingPage';
import AddTenantPage from '../pages/AddTenantPage';
import BuildingRequests from '../pages/BuildingRequests';
import Login from '../pages/Login';

const AppRoutes = () => {
  const RequireAuth = ({ children }) => {
    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="/buildings">
          <Route
            path=""
            element={
              <RequireAuth>
                <Buildings />
              </RequireAuth>
            }
          />
          <Route
            path="create"
            element={
              <RequireAuth>
                <CreateBuilding />
              </RequireAuth>
            }
          />
          <Route
            path=":buildingId"
            element={
              <RequireAuth>
                <BuildingPage />
              </RequireAuth>
            }
          />
          <Route
            path=":buildingId/tenants"
            element={
              <RequireAuth>
                <AddTenantPage />
              </RequireAuth>
            }
          />
          <Route
            path=":buildingId/:spaceId"
            element={
              <RequireAuth>
                <CommonArea />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/bookings">
          <Route
            path=""
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            }
          />
          <Route
            path="create"
            element={
              <RequireAuth>
                <CreateBookings />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/user">
          <Route
            path="requests"
            element={
              <RequireAuth>
                <BuildingRequests />
              </RequireAuth>
            }
          />
        </Route>

        {/* ## Login page ## */}
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
