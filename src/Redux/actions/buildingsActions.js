import {
  GET_MY_USER,
  LOADING,
  GET_MY_USER_SUCCESS,
  REQUEST_FAILURE,
  GET_ONE_BUILDING,
  GET_ONWAIT_BOOKINGS,
  GET_BOOKINGS,
  GET_ONE_SPACE,
} from './actions';
import axios from 'axios';
import { deleteAction, postAction } from '../../services/axiosActions';

import { toast } from 'react-toastify';
//SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getMyProfileData } from './userActions';

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
export const getOneSpace = (spaceData) => ({
  type: GET_ONE_SPACE,
  payload: spaceData,
});

export const getBookingsOnWait = (bookings) => ({
  type: GET_ONWAIT_BOOKINGS,
  payload: bookings,
});

export const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  payload: bookings,
});
// /spaces/63470289eb253d81c2e7544a

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
      dispatch(loading(false));
      dispatch(getBookingsOnWait(waitBookings));
      dispatch(getOneBuilding(res?.data?.building));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(requestFailure(err));
    });
};

export const getSpecificSpace = (space_id) => async (dispatch) => {
  dispatch(loading(true));

  axios(`${process.env.REACT_APP_URI}/spaces/${space_id}`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getOneSpace(res?.data?.space));
    })
    .catch((err) => {
      dispatch(loading(false));
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
      dispatch(loading(false));
      dispatch(getBookings({ onWaitBookings, confirmedBookings }));
    })
    .catch((err) => {
      dispatch(loading(false));
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
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
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
    dispatch(loading(false));
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
      dispatch(loading(false));
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
      dispatch(loading(false));
      console.log(e.response.data.message);
      dispatch(
        makeSwal(
          'errorInformation',
          'No se pudo cancelar',
          'Ocurrio un error en el servidor'
        )
      );
    }
  };

export const addAlertOnBuilding = (building_id) => async (dispatch) => {
  try {
    dispatch(loading(true));
    let response = await postAction(`buildings/${building_id}/alert`);
    dispatch(loading(false));
    dispatch(getMyProfileData());
  } catch (e) {
    dispatch(loading(false));
  }
};

export const removeAlertOnBuilding = (building_id) => async (dispatch) => {
  try {
    dispatch(loading(true));
    let response = await deleteAction(`buildings/${building_id}/alert`);
    dispatch(loading(false));
    dispatch(getMyProfileData());
  } catch (e) {
    dispatch(loading(false));
  }
};

export function makeSwal(status, title, text, btnText) {
  return function (dispatch) {
    switch (status) {
      case 'errorInformation':
        withReactContent(Swal).fire({
          title: title,
          text: text,
          icon: 'error',
          focusConfirm: true,
          confirmButtonText: btnText || 'Aceptar',
          background: '#fff',
          customClass: {
            actions: 'test',
            confirmButton: 'btn secondary',
          },
          buttonsStyling: false,
        });
        break;
      case 'success':
        withReactContent(Swal)
          .fire({
            title: title,
            icon: 'success',
            text: text,
            focusConfirm: true,
            confirmButtonText: btnText || 'Aceptar',
            background: '#fff',
            customClass: {
              actions: 'test',
              confirmButton: 'btn primary',
            },
            buttonsStyling: false,
          })
          .then((result) => {
            return result;
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
