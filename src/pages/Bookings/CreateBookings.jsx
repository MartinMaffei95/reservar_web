import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

//FORMIK + YUP
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useFetch from '../../Hooks/useFetch';
import FieldDatePicker from '../../molecules/FieldDatePicker';

import moment from 'moment';
import usePostFetch from '../../Hooks/usePostFetch';
import { useNavigate } from 'react-router-dom';

import { createBooking } from '../../services/axiosActions';
const CreateBookings = () => {
  const initialValues = {
    building_name: '',
    space_name: '',
    time: '',
    date: moment(),
  };
  const navigate = useNavigate();
  const postHook = usePostFetch();

  const onSubmit = async () => {
    let bodyObject = {
      date: moment(values.date).format('MM DD YY'),
      time: values.time,
      building: values.building_name,
      space: values.space_name,
    };

    try {
      const newBooking = await createBooking('bookings', bodyObject);
      console.log(newBooking);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    building_name: Yup.string().required(errorMessages.required),
  });

  //################################
  // ########## FORMIK #############
  //################################
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

  const { data, loading, error } = useFetch('buildings');
  const [buildings, setBuildings] = useState([]);
  const [buildingIndex, setBuildingIndex] = useState(0);
  const [spaceIndex, setSpaceIndex] = useState(null);
  const [renderBookings, setRenderBookings] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setBuildings(data?.building);
  }, [loading]);

  useEffect(() => {
    if (postHook?.data?.message === 'BOOKING_CREATED') {
      alert('creada');
      return navigate('/bookings', { replace: true });
    }
  }, [postHook?.loading]);

  const sendBookings = () => {
    console.log(buildings[buildingIndex]?.spaces[spaceIndex]);
    setRenderBookings(buildings[buildingIndex]?.spaces[spaceIndex]?.bookings);
  };

  useEffect(() => {
    sendBookings();
    if (buildings[buildingIndex]?.spaces[spaceIndex]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [spaceIndex, buildingIndex]);

  return (
    <div>
      <Header backButton title={'Creando reserva'} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        mt={5}
        mb={5}
        sx={{
          maxWidth: '90%',
          minWidth: '80%',
          marginInline: 'auto',
          gap: '1rem',
        }}
      >
        <FormControl variant="filled">
          <InputLabel>Edificio:</InputLabel>
          <Select
            name={'building_name'}
            error={errors.building_name && touched.building_name}
            value={values.building_name}
            onChange={handleChange}
          >
            {buildings &&
              buildings.map((buil, i) => (
                <MenuItem
                  onClick={() => {
                    setFieldValue('space_name', '');
                    setBuildingIndex(i);
                  }}
                  key={buil?._id}
                  value={buil?._id}
                >
                  {buil?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel>Zona común:</InputLabel>
          <Select
            name={'space_name'}
            error={errors.space_name && touched.space_name}
            value={values.space_name}
            onChange={handleChange}
            disabled={buildings && !buildings[buildingIndex]?.spaces?.length}
          >
            {buildings &&
              buildings[buildingIndex]?.spaces?.map((buil, i) => (
                <MenuItem
                  onClick={() => {
                    setSpaceIndex(i);
                  }}
                  key={buil?._id}
                  value={buil?._id}
                >
                  {buil?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FieldDatePicker
          isPhone
          action={formik}
          values={values?.date}
          bookings={renderBookings}
          disabled={disabled}
        />

        <FormControl variant="filled">
          <InputLabel>Franja horaria:</InputLabel>
          <Select
            name={'time'}
            error={errors.time && touched.time}
            value={values.time}
            onChange={handleChange}
            disabled={buildings && !buildings[buildingIndex]?.spaces?.length}
          >
            {buildings &&
              ['MORNING', 'AFTERNOON', 'NIGHT'].map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit}>
          Crear reserva
        </Button>
      </Grid>
    </div>
  );
};

export default CreateBookings;
