import axios from 'axios';
export const createBooking = (endpoint, newBooking) => {
  const request = axios({
    method: 'post',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: newBooking,
  });
  return request.then((res) => res.data);
};

export const getAction = (endpoint) => {
  const request = axios({
    method: 'get',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return request.then((res) => res.data);
};

export const postAction = (endpoint, newBooking) => {
  const request = axios({
    method: 'post',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: newBooking,
  });
  return request.then((res) => res.data);
};

export const deleteAction = (endpoint, newBooking) => {
  const request = axios({
    method: 'delete',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: newBooking,
  });
  return request.then((res) => res.data);
};
