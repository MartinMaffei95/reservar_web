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

export const postAction = (endpoint, body) => {
  const request = axios({
    method: 'POST',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: body,
  });
  return request.then((res) => res.data);
};

export const deleteAction = (endpoint, body) => {
  const request = axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: body,
  });
  return request.then((res) => res.data);
};

export const putAction = (endpoint, body) => {
  const request = axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_URI}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: body,
  });
  return request.then((res) => res.data);
};
