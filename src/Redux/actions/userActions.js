import {
  GET_MY_USER,
  LOADING,
  GET_MY_USER_SUCCESS,
  REQUEST_FAILURE,
  GET_MY_NOTIFICATIONS,
} from './actions';
import axios from 'axios';

export const loading = (state) => ({
  type: LOADING,
  payload: state,
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const getMyUserSuccess = (data) => ({
  type: GET_MY_USER_SUCCESS,
  payload: data,
});

export const getMyUser = (userData) => ({
  type: GET_MY_USER,
  payload: userData,
});

export const getMyNotifications = (notifications) => ({
  type: GET_MY_NOTIFICATIONS,
  payload: notifications,
});

export const getMyProfileData = (building_id) => async (dispatch) => {
  dispatch(loading(true));

  await axios(
    `${process.env.REACT_APP_URI}/users/${localStorage.getItem('userID')}`,
    {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
    .then((res) => {
      dispatch(getMyUser(res?.data?.user));
      dispatch(getNotifications());
    })
    .catch((err) => {
      dispatch(requestFailure(err));
    });
};

export const getNotifications = () => async (dispatch) => {
  dispatch(loading(true));
  await axios(
    `${process.env.REACT_APP_URI}/users/${localStorage.getItem(
      'userID'
    )}/notifications`,
    {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
    .then((res) => {
      dispatch(getMyNotifications(res?.data?.notifications));
    })
    .catch((err) => {
      dispatch(requestFailure(err));
    });
};
