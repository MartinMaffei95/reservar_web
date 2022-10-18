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

import { toast } from 'react-toastify';
//SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
  let onWaitBookings = [];
  let confirmedBookings = [];
  axios(`${process.env.REACT_APP_URI}/bookings/?spaceId=${spaceId}`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      res?.data?.bookings?.map((booking) => {
        if (booking?.reservationAccepted === true) {
          if (!confirmedBookings?.includes(booking)) {
            confirmedBookings?.push(booking);
          }
        } else if (booking?.reservationAccepted === false) {
          if (!onWaitBookings?.includes(booking)) {
            onWaitBookings?.push(booking);
          }
        }
      });
      dispatch(getBookings({ onWaitBookings, confirmedBookings }));
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

export const removeTenant = (userId, body, building_id) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const response = await deleteAction(`users/removeTenant/${userId}`, body);
    dispatch(loading(false));
    dispatch(getSpecificBuilding(building_id));
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
      dispatch(makeToast('success', 'Se confirmó la reserva'));
    } catch (e) {
      console.log(e.response.data.message);
      dispatch(
        makeSwal(
          'errorInformation',
          'No se pudo confirmar',
          'Existe una reserva hecha en ese dia y horario'
        )
      );
    }
  };

export const denyBooking =
  (space_id, body, building_id) => async (dispatch) => {
    try {
      dispatch(loading(true));

      let response = await postAction(`spaces/${space_id}/deny`, body);
      dispatch(loading(false));
      dispatch(getOnHoldBookings(building_id));
      dispatch(makeToast('warning', 'La reserva NO fue aceptada'));
    } catch (e) {
      console.log(e.response.data.message);
      alert('rotura');
    }
  };

export function makeSwal(status, title, text) {
  return function (dispatch) {
    switch (status) {
      case 'errorInformation':
        withReactContent(Swal).fire({
          title: title,
          text: text,
          icon: 'error',
          focusConfirm: true,
          confirmButtonText: 'Aceptar',
          background: '#fff',
          customClass: {
            actions: 'test',
            confirmButton: 'btn secondary',
          },
          buttonsStyling: false,
        });
        break;

      default:
        break;
    }
  };
}

export function makeToast(status, msg) {
  return function (dispatch) {
    switch (status) {
      case 'success':
        toast.success(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;
      case 'error':
        toast.error(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;
      case 'warning':
        toast.warning(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;
      case 'information':
        toast.information(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;

      default:
        break;
    }
  };
}
