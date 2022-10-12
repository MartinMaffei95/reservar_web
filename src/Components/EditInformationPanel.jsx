import {
  Paper,
  Grid,
  Typography,
  Tooltip,
  Icon,
  ButtonGroup,
  Button,
  Box,
  ClickAwayListener,
  TextField,
} from '@mui/material';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiBell, FiBellOff } from 'react-icons/fi';

import { useState, useEffect } from 'react';
import usePutFetch from '../Hooks/usePutFetch';
import MyToolTip from '../molecules/MyToolTip';
import { MdPassword } from 'react-icons/md';

//FORMIK
import * as Yup from 'yup';
import { useFormik } from 'formik';

const EditInformationPanel = ({ profileData }) => {
  const [profile, setProfile] = useState(profileData);
  const putFetchHook = usePutFetch();

  //
  //  FORMIK
  //

  const keyAction = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit = () => {
    const updateUserBody = {
      username: values.username,
      name: values.name,
      last_name: values.last_name,
      email: values.email,
      profileConfig: {
        email: {
          alerts: values.emailAlerts,
          visualization: values.emailVisualization,
        },
        last_name: {
          visualization: values.last_nameVisualization,
        },
        name: {
          visualization: values.nameVisualization,
        },
      },
    };
    putFetchHook.fetchPutData(
      `users/${localStorage.getItem('userID')}`,
      updateUserBody
    );

    console.log(updateUserBody);
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    // username: Yup.string()
    //   .min(4, 'La cantidad minima de caracteres es 4')
    //   .required(errorMessages.required),
  });

  const initialValues = {
    username: '',
    email: '',
    name: '',
    last_name: '',
    //TOGGLE VALUES
    nameVisualization: false,
    last_nameVisualization: false,
    emailVisualization: false,
    emailAlerts: false,
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleChange, values, handleSubmit, errors, touched, handleBlur } =
    formik;

  useEffect(() => {
    formik.setValues({
      username: profileData?.username || '',
      email: profileData?.email || '',
      name: profileData?.name || '',
      last_name: profileData?.last_name || '',
      nameVisualization: profileData?.profileConfig?.name?.visualization,
      last_nameVisualization:
        profileData?.profileConfig?.last_name?.visualization,
      emailVisualization: profileData?.profileConfig?.email?.visualization,
      emailAlerts: profileData?.profileConfig?.email?.alerts,
    });
  }, [profileData]);

  // response from put action
  useEffect(() => {
    if (putFetchHook.data.message === 'PROFILE_MODIFIED') {
      localStorage.setItem('token', putFetchHook?.data?.token);
      localStorage.setItem('username', putFetchHook?.data?.user?.username);
      alert('actualizado vro');
    }
  }, [putFetchHook.loading]);

  const ToogleButton = ({ value, fieldName, iconTrue, iconFalse }) => {
    if (value) {
      return (
        <Button
          onClick={() => {
            formik.setFieldValue(`${fieldName}`, false);
          }}
        >
          {iconTrue}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            formik.setFieldValue(`${fieldName}`, true);
          }}
        >
          {iconFalse}
        </Button>
      );
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button type="submit" fullWidth variant="contained" disableElevation>
        Ingresar
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component="div" sx={{ display: 'flex' }}>
          <TextField
            id="outlined-required"
            label="Nombre de usuario"
            placeholder="Nombre de usuario"
            name={'username'}
            value={values?.username}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={keyAction}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component="div" sx={{ display: 'flex' }}>
          <TextField
            id="outlined-required"
            label="Nombre"
            placeholder="Nombre"
            name={'name'}
            value={values?.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={keyAction}
          />
        </Box>
        <ButtonGroup variant="text" aria-label="text button group">
          <ToogleButton
            value={values?.nameVisualization}
            fieldName={'nameVisualization'}
            iconTrue={<AiOutlineEye />}
            iconFalse={<AiOutlineEyeInvisible />}
          />
        </ButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component="div" sx={{ display: 'flex' }}>
          <TextField
            id="outlined-required"
            label="Apellido"
            placeholder="Apellido"
            name={'last_name'}
            value={values?.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={keyAction}
          />
        </Box>
        <ButtonGroup variant="text" aria-label="text button group">
          <ToogleButton
            value={values?.last_nameVisualization}
            fieldName={'last_nameVisualization'}
            iconTrue={<AiOutlineEye />}
            iconFalse={<AiOutlineEyeInvisible />}
          />
        </ButtonGroup>
      </Box>

      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box component="div" sx={{ display: 'flex' }}>
          <TextField
            id="outlined-required"
            label="Direccion de mail"
            placeholder="Direccion de mail"
            name={'email'}
            value={values?.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={keyAction}
          />
        </Box>
        <ButtonGroup variant="text" aria-label="text button group">
          <ToogleButton
            value={values?.emailAlerts}
            fieldName={'emailAlerts'}
            iconTrue={<FiBell />}
            iconFalse={<FiBellOff />}
          />
          <ToogleButton
            value={values?.emailVisualization}
            fieldName={'emailVisualization'}
            iconTrue={<AiOutlineEye />}
            iconFalse={<AiOutlineEyeInvisible />}
          />
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default EditInformationPanel;
