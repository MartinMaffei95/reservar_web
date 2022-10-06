import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import usePostFetch from '../Hooks/usePostFetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { data, loading, error, fetchPostData } = usePostFetch();
  let navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const keyAction = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit = () => {
    // console.log();
    fetchPostData('auth/login', values);
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

  useEffect(() => {
    console.log(data);
    if (data.message === 'LOGIN_SUCCESS') {
      localStorage.setItem('token', data?.token);
      localStorage.setItem('username', data?.user?.username);
      localStorage.setItem('userID', data?.user?._id);

      return navigate('/', { replace: true });
    }
  }, [loading]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          margin: '1em',
          width: '80vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '& .MuiTextField-root': { m: 1 },
        }}
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
