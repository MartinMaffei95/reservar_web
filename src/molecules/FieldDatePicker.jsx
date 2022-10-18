import { useState, useEffect } from 'react';
import { Stack, TextField } from '@mui/material/';
import {
  DesktopDatePicker,
  MobileDatePicker,
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
  CalendarPicker,
} from '@mui/x-date-pickers';
//MOMENT JS
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import useSwitchBookings from '../Hooks/useSwitchBookings';
import {
  calendarDayStyle_afternon,
  calendarDayStyle_allDay,
  calendarDayStyle_morning,
  calendarDayStyle_night,
} from '../muiStyles';
import { useSelector } from 'react-redux';

const renderizeDays = (bookings) => (day, selectedDays, pickersDayProps) => {
  let selectedMuiClass = { background: 'red' };
  let selectedDay_morning = {};
  let selectedDay_afternon = {};
  let selectedDay_night = {};
  let selectedDay_allDay = {};

  // Pseudo-code here! You will have to use the proper functions from the
  // date-fns library to evaluate if 'day' is in your dateArray.
  if (
    bookings?.nightBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_night = calendarDayStyle_night;
  }

  if (
    bookings?.afternonBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_afternon = calendarDayStyle_afternon;
  }
  if (
    bookings?.morningBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_morning = calendarDayStyle_morning;
  }

  if (
    bookings?.allDayBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_allDay = calendarDayStyle_allDay;
  }
  return (
    <PickersDay
      sx={[
        selectedDay_morning,
        selectedDay_afternon,
        selectedDay_night,
        selectedDay_allDay,
      ]}
      {...pickersDayProps}
    />
  );
};

const FieldDatePicker = ({
  isPhone,
  action,
  onlyCalendar = false,
  disabled,
}) => {
  const bookings = useSelector((state) => state.buildingsReducer.bookings);
  const standByBookings = useSelector(
    (state) => state.buildingsReducer.bookings
  );

  const [dateState, setDateState] = useState(action?.values?.date || moment());
  const [renderBookings, setRenderBookings] = useState({});
  const {
    morningBookings,
    afternonBookings,
    nightBookings,
    allDayBookings,
    loadingBookings,
  } = useSwitchBookings(bookings);

  const handleDate = (newValue) => {
    if (action) {
      action?.setFieldValue('date', newValue);
    }
    setDateState(newValue);
  };

  useEffect(() => {
    setRenderBookings({
      morningBookings,
      afternonBookings,
      nightBookings,
      allDayBookings,
    });
  }, [bookings]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {onlyCalendar ? (
          <CalendarPicker
            disablePast
            disabled={disabled}
            inputFormat="MM/DD/YYYY"
            date={dateState}
            onChange={handleDate}
            renderDay={renderizeDays(renderBookings)}
          />
        ) : !isPhone ? (
          <DesktopDatePicker
            disablePast
            disabled={disabled}
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            name="date"
            value={dateState}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
            renderDay={renderizeDays(renderBookings)}
          />
        ) : (
          <MobileDatePicker
            disablePast
            disabled={disabled}
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            name="date"
            value={dateState}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
            renderDay={renderizeDays(renderBookings)}
          />
        )}
      </LocalizationProvider>
    </div>
  );
};

export default FieldDatePicker;
