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

//SWAL
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import {
  getBookingsOfSpace,
  makeSwal,
  makeToast,
} from '../../Redux/actions/buildingsActions';
import useTranslate from '../../Hooks/useTranslate';
import translate from '../../functions/translate';
import { useResize } from '../../Hooks/useResize';
import Bookings from './Bookings';

const CreateBookings = () => {
  const initialValues = {
    building_name: '',
    space_name: '',
    time: '',
    date: moment(),
  };
  const navigate = useNavigate();
  const postHook = usePostFetch();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    let bodyObject = {
      date: moment(values.date).format('MM DD YY'),
      time: values.time,
      building: values.building_name,
      space: values.space_name,
    };

    try {
      const newBooking = await createBooking('bookings', bodyObject);
      dispatch(
        makeToast(
          'success',

          buildings[buildingIndex]?.spaces[spaceIndex]?.needConfirmation
            ? 'Tu reserva fue creada. Un adminstrador deberá confirmarla'
            : 'Tu reserva fue creada.'
        )
      );
    } catch (e) {
      const { message } = e?.response?.data;
      console.log(message);
      switch (message) {
        case 'HAVE_ANOTHER_RESERVATION':
          dispatch(
            makeSwal(
              'errorInformation',
              'Tenemos otra reserva',
              'Ya tenemos una reserva en este horario pero puedes intentar otro',
              'Reintentar'
            )
          );

          break;
      }
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

  const { isPhone } = useResize();

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
      <Grid container direction="row" justifyContent="space-around">
        <Grid
          container
          direction="column"
          justifyContent="center"
          mt={5}
          mb={5}
          sx={
            isPhone
              ? {
                  maxWidth: '90%',
                  minWidth: '80%',
                  marginInline: 'auto',
                  gap: '1rem',
                }
              : {
                  maxWidth: '70vw',
                  minWidth: '60vw',
                  gap: '1rem',
                }
          }
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
                      setSpaceIndex(0);
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
                buildings[buildingIndex]?.spaces?.map((space, i) => (
                  <MenuItem
                    onClick={() => {
                      setSpaceIndex(i);
                      // console.log(space?._id);
                      dispatch(getBookingsOfSpace(space?._id));
                    }}
                    key={space?._id}
                    value={space?._id}
                  >
                    {space?.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FieldDatePicker
            isPhone
            action={formik}
            values={values?.date}
            fromProps
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
                buildings[buildingIndex]?.spaces[
                  spaceIndex
                ]?.defaultValuesTimeSlot.map((time) => (
                  <MenuItem key={time} value={time}>
                    {translate(time)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleSubmit}>
            Crear reserva
          </Button>
        </Grid>
        {!isPhone && <Bookings disableBtn />}
      </Grid>
    </div>
  );
};

export default CreateBookings;
