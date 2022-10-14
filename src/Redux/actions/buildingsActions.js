import {
  GET_MY_USER,
  LOADING,
  GET_MY_USER_SUCCESS,
  REQUEST_FAILURE,
  GET_ONE_BUILDING,
  GET_ONWAIT_BOOKINGS,
  GET_BOOKINGS,
} from './actions';
import axios from 'axios';
import { deleteAction, postAction } from '../../services/axiosActions';

export const loading = (state) => ({
  type: LOADING,
  payload: state,
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const getOneBuilding = (userData) => ({
  type: GET_ONE_BUILDING,
  payload: userData,
});

export const getBookingsOnWait = (bookings) => ({
  type: GET_ONWAIT_BOOKINGS,
  payload: bookings,
});

export const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  payload: bookings,
});

export const getSpecificBuilding = (building_id) => async (dispatch) => {
  dispatch(loading(true));

  axios(`${process.env.REACT_APP_URI}/buildings/${building_id}`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      let waitBookings = [];
      res?.data?.building?.spaces?.map((s) =>
        s?.standByBookings.map((b) => waitBookings.push(b))
      );

      dispatch(getBookingsOnWait(waitBookings));
      dispatch(getOneBuilding(res?.data?.building));
    })
    .catch((err) => {
      dispatch(requestFailure(err));
    });
};

export const getBookingsOfSpace = (spaceId) => async (dispatch) => {
  dispatch(loading(true));

  axios(`${process.env.REACT_APP_URI}/bookings/?spaceId=${spaceId}`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      dispatch(getBookings(res?.data?.bookings));
    })
    .catch((err) => {
      dispatch(requestFailure(err));
    });
};

export const getOnHoldBookings = (building_id) => async (dispatch) => {
  dispatch(loading(true));

  axios(`${process.env.REACT_APP_URI}/buildings/${building_id}`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      let waitBookings = [];
      res?.data?.building?.spaces?.map((s) =>
        s?.standByBookings.map((b) => waitBookings.push(b))
      );

      dispatch(getBookingsOnWait(waitBookings));
    })
    .catch((err) => {
      dispatch(requestFailure(err));
    });
};

export const removeTenant =
  (userId, bodyData, buildingId) => async (dispatch) => {
    try {
      dispatch(loading(true));

      const deleteReq = await deleteAction(
        `users/removeTenant/${userId}`,
        bodyData
      );
      dispatch(loading(false));
      dispatch(getSpecificBuilding(buildingId));

      if (deleteReq.message === 'REMOVED_USER_FROM_BUILDING') {
        alert('Eliminado');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

export const aceptBooking =
  (space_id, body, building_id) => async (dispatch) => {
    try {
      dispatch(loading(true));
      let response = await postAction(`spaces/${space_id}/acept`, body);
      dispatch(loading(false));
      dispatch(getOnHoldBookings(building_id));
    } catch (e) {
      console.log(e.response.data.message);
      alert('rotura');
    }
  };

export const denyBooking =
  (space_id, body, building_id) => async (dispatch) => {
    try {
      dispatch(loading(true));

      let response = await postAction(`spaces/${space_id}/deny`, body);
      dispatch(loading(false));
      dispatch(getOnHoldBookings(building_id));
    } catch (e) {
      console.log(e.response.data.message);
      alert('rotura');
    }
  };
