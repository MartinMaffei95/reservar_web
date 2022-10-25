import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { initialFormStyle, titleBox } from '../muiStyles';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
//SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { postAction } from '../services/axiosActions';

import { loading, getMyProfileData } from '../Redux/actions/userActions';
const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const [showPass, setShowPass] = useState(false);
  const keyAction = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPass((currenValue) => !currenValue);
  };

  const onSubmit = async () => {
    dispatch(loading(true));

    try {
      const register = await postAction('auth/register', values);
      dispatch(loading(false));
      console.log(register);
      if (register?.data?.message === 'USER_CREATED') {
        localStorage.setItem('username', values?.username);
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
    } catch (e) {
      const { message } = e?.response?.data;
      console.log(message);

      dispatch(loading(false));
      switch (message) {
        case 'INVALID_PASSWORD':
          formik.setErrors({
            username: 'La contraseña no fue aceptada. Elige otra',
          });
          break;
        case 'TAKEN_USERNAME':
          formik.setErrors({
            username: 'Ya existe otro usuario con ese nombre',
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

  return (
    <Grid
      className={'form_screen'}
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
      <Box sx={titleBox}>
        <Typography variant="h1">TakeZoom</Typography>
        <Typography variant="h3">Creando momentos</Typography>
        <Typography variant="body1">
          Registrate, crea (o encuentra) tu edificio y reservá
        </Typography>
      </Box>
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
          type={showPass === false ? 'password' : 'text'}
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={keyAction}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPass === false ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          type={showPass === false ? 'password' : 'text'}
          value={values?.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={keyAction}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPass === false ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" disableElevation>
          Registrarme
        </Button>
        <Link className="form_link" to="/login">
          Ya tienes una cuenta? Ingresá aqui!
        </Link>
      </Box>
    </Grid>
  );
};

export default Register;
