import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import usePostFetch from '../Hooks/usePostFetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initialFormStyle } from '../muiStyles';
import { postAction } from '../services/axiosActions';
import { useSelector, useDispatch } from 'react-redux';
import { loading, getMyProfileData } from '../Redux/actions/userActions';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: localStorage.getItem('username') || '',
    password: '',
  };

  const keyAction = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit = async () => {
    dispatch(loading(true));
    try {
      const user = await postAction('auth/login', values);
      dispatch(loading(false));

      if (user.message === 'LOGIN_SUCCESS') {
        localStorage.setItem('token', user?.token);
        localStorage.setItem('username', user?.user?.username);
        localStorage.setItem('userID', user?.user?._id);
        if (user?.user?.buildings?.length > 0)
          return navigate('/bookings/create', { replace: true });
        else return navigate('/buildings/create', { replace: true });
      }
    } catch (e) {
      alert('error');
      dispatch(loading(false));
    }
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),

    password: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={initialFormStyle}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-required"
          label="Username"
          placeholder="Nombre de usuario"
          name={'username'}
          value={values?.username}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={keyAction}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name={'password'}
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={keyAction}
        />
        <Button type="submit" fullWidth variant="contained" disableElevation>
          Ingresar
        </Button>
      </Box>
    </>
  );
};

export default Login;
