import {
  GET_MY_USER,
  LOADING,
  GET_MY_USER_SUCCESS,
  REQUEST_FAILURE,
  GET_MY_NOTIFICATIONS,
} from './actions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeSwal } from './buildingsActions';
import { putAction } from '../../services/axiosActions';

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

export const getMyProfileData = () => async (dispatch) => {
  dispatch(loading(true));
  // const navigate = useNavigate;
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
      dispatch(getNotifications(1));
    })
    .catch((err) => {
      dispatch(requestFailure(err));
      // navigate('/login', { replace: true });
    });
};

export const getNotifications =
  (page, actualNotifications) => async (dispatch) => {
    if (!actualNotifications) {
      actualNotifications = [];
    }
    dispatch(loading(true));
    await axios(
      `${process.env.REACT_APP_URI}/users/${localStorage.getItem(
        'userID'
      )}/notifications/?page=${page || 1}`,
      {
        method: 'GET',
        headers: {
          contentType: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => {
        dispatch(
          getMyNotifications({
            notifications: actualNotifications.concat(
              res?.data?.notifications?.docs
            ),
            pageData: {
              page: page,
              hasNextPage: res?.data?.notifications?.hasNextPage,
            },
          })
        );
        dispatch(loading(false));
      })
      .catch((err) => {
        dispatch(requestFailure(err));
        dispatch(loading(false));
      });
  };

export const updateMyProfile = (updatedProfile) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const response = await putAction(
      `users/${localStorage.getItem('userID')}`,
      updatedProfile
    ).then(() => {
      dispatch(loading(false));
      dispatch(getMyProfileData());
    });
  } catch (e) {
    dispatch(loading(false));
    console.log(e.response.data.message);
    dispatch(
      makeSwal(
        'errorInformation',
        'No se pudo actualizar',
        'No pudimos actiañozar tu información'
      )
    );
  }
};
