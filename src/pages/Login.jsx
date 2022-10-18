import React from 'react';
import { Grid, Box, TextField, Button, Typography } from '@mui/material';
import usePostFetch from '../Hooks/usePostFetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initialFormStyle } from '../muiStyles';
import { postAction } from '../services/axiosActions';
import { useSelector, useDispatch } from 'react-redux';
import { loading, getMyProfileData } from '../Redux/actions/userActions';

import { successButtonStyle } from '../muiStyles';

//SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);

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
      const { message } = e?.response?.data;
      console.log(message);
      dispatch(loading(false));
      switch (message) {
        case 'IVALID_PASSWORD':
          Swal.fire({
            title: 'Contraseña incorrecta',
            icon: 'error',
            showCancelButton: true,
            cancelButtonText: 'Reintentar',
            focusConfirm: true,
            confirmButtonText: 'No tengo usuario',
            background: '#fff',
            customClass: {
              actions: 'test',
              cancelButton: 'btn primary',
              confirmButton: 'btn secondary',
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/register', { replace: true });
            }
          });
          break;
        case 'INVALID_USER':
          Swal.fire({
            title: 'El usuario no existe',
            icon: 'error',
            showCancelButton: true,
            cancelButtonText: 'Reintentar',
            focusConfirm: true,
            confirmButtonText: 'No tengo usuario',
            background: '#fff',
            customClass: {
              actions: 'test',
              cancelButton: 'btn primary',
              confirmButton: 'btn secondary',
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/register', { replace: true });
            }
          });
          break;

        default:
          break;
      }
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          // maxWidth: '90%',
          // minWidth: '80%',
          height: '100vh',
          width: '100vw',
          // marginBlock: 'auto',
        }}
      >
        <Typography>LOGIN</Typography>
        <Typography sx={{ paddingBottom: '3em' }}>Creando momentos</Typography>
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
        <Link to="/register">Crear un usuario</Link>
      </Grid>
    </>
  );
};

export default Login;
