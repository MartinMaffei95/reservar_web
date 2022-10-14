import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Home from '../pages/Home';
import Buildings from '../pages/Buildings/Buildings';
import CreateBuilding from '../pages/Buildings/CreateBuilding';
import CreateBookings from '../pages/Bookings/CreateBookings';
import Bookings from '../pages/Bookings/Bookings';
import CommonArea from '../pages/Spaces/CommonArea';
import BuildingPage from '../pages/Buildings/BuildingPage';
import AddTenantPage from '../pages/Buildings/AddTenantPage';
import BuildingRequests from '../pages/Buildings/BuildingRequests';
import Login from '../pages/Login';
import CreateSpace from '../pages/Spaces/CreateSpace';
import Register from '../pages/Register';
import AddAdminPage from '../pages/Buildings/AddAdmingPage';
import MyProfile from '../pages/User/MyProfile';
import Notifications from '../pages/User/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { getMyProfileData } from '../Redux/actions/userActions';
const AppRoutes = () => {
  const RequireAuth = ({ children }) => {
    const dispatch = useDispatch();
    dispatch(
      getMyProfileData(
        localStorage.getItem('userID'),
        localStorage.getItem('token')
      )
    );
    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME ROUTE */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {/* BUILDINGS ROUTES */}

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
            path="create" // Use this route to create a new building
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
            path=":buildingId/create" // Use this route to create a new space in buildings
            element={
              <RequireAuth>
                <CreateSpace />
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
            path=":buildingId/admin" // Use this route to create a new building
            element={
              <RequireAuth>
                <AddAdminPage />
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
          <Route
            path=":buildingId/notifications"
            element={
              <RequireAuth>
                <Notifications />
              </RequireAuth>
            }
          />
        </Route>

        {/* BOOKINGS ROUTES */}

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

        {/* USER ROUTES */}

        <Route path="/user">
          <Route
            path="profile"
            element={
              <RequireAuth>
                <MyProfile />
              </RequireAuth>
            }
          />
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
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
