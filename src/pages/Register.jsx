import React from 'react';
import { Grid, Box, TextField, Button, Typography } from '@mui/material';
import usePostFetch from '../Hooks/usePostFetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initialFormStyle } from '../muiStyles';

//SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Register = () => {
  const { data, loading, error, fetchPostData } = usePostFetch();
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const keyAction = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit = () => {
    fetchPostData('auth/register', values);
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
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
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
    if (data.message === 'USER_CREATED') {
      localStorage.setItem('username', data?.user?.username);
      MySwal.fire({
        title: 'Felicitaciones!',
        icon: 'success',
        text: 'Tu usuario fue creado',
        focusConfirm: true,
        confirmButtonText: 'Quiero ingresar!',
        background: '#fff',
        customClass: {
          actions: 'test',
          confirmButton: 'btn primary',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { replace: true });
        }
      });
      return navigate('/login', { replace: true });
    }
    //ToDo: create error messages
  }, [loading]);
  return (
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
      <Typography>REGISTER</Typography>
      <Typography sx={{ paddingBottom: '3em' }}>Creando momentos</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={initialFormStyle}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={errors?.username && touched?.username && true}
          helperText={errors?.username && touched?.username && errors?.username}
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
          error={errors?.password && touched?.password && true}
          helperText={errors?.password && touched?.password && errors?.password}
          id="outlined-required"
          label="Tu contraseña"
          placeholder="MiContraseñaSegura123"
          name={'password'}
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={keyAction}
        />

        <TextField
          error={
            errors?.passwordConfirmation &&
            touched?.passwordConfirmation &&
            true
          }
          helperText={
            errors?.passwordConfirmation &&
            touched?.passwordConfirmation &&
            errors?.passwordConfirmation
          }
          id="outlined-required"
          label="Repeti la contraseña"
          name={'passwordConfirmation'}
          value={values?.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={keyAction}
        />
        <Button type="submit" fullWidth variant="contained" disableElevation>
          Registrarme
        </Button>
      </Box>
      <Link to="/login">Ingresar</Link>
    </Grid>
  );
};

export default Register;
