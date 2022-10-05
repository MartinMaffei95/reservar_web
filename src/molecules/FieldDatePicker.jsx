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

const renderizeDays = (bookings) => (day, selectedDays, pickersDayProps) => {
  let selectedMuiClass = { background: 'red' };
  let selectedDay_morning = {};
  let selectedDay_afternon = {};
  let selectedDay_night = {};
  // Pseudo-code here! You will have to use the proper functions from the
  // date-fns library to evaluate if 'day' is in your dateArray.
  if (
    bookings?.nightBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_night = {
      position: 'relative',
      '& >span': { overflow: 'visible' },
      '& >::before': {
        content: `''`,
        position: 'absolute',
        right: '0',
        top: '0',
        width: '1px',
        height: '1px',
        background: 'purple',
        border: 'solid 4px purple',
        borderRadius: '50%',
      },
    };
  }

  if (
    bookings?.afternonBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_afternon = {
      position: 'relative',
      '&::after': {
        content: `''`,
        position: 'absolute',
        left: 'calc(50% - 4px)',
        top: '0',
        width: '1px',
        height: '1px',
        background: 'orange',
        border: 'solid 4px orange',
        borderRadius: '50%',
      },
    };
  }
  if (
    bookings?.morningBookings?.find((date) => moment(date).isSame(day, 'day'))
  ) {
    selectedDay_morning = {
      position: 'relative',
      '&::before': {
        content: `''`,
        position: 'absolute',
        left: '0',
        top: '0',
        width: '1px',
        height: '1px',
        background: 'green',
        border: 'solid 4px green',
        borderRadius: '50%',
      },
    };
  }
  return (
    <PickersDay
      sx={[selectedDay_morning, selectedDay_afternon, selectedDay_night]}
      {...pickersDayProps}
    />
  );
};

const FieldDatePicker = ({
  isPhone,
  action,
  onlyCalendar = false,
  bookings,
  disabled,
}) => {
  const [dateState, setDateState] = useState(action?.values?.date || moment());
  const [renderBookings, setRenderBookings] = useState({});
  const { morningBookings, afternonBookings, nightBookings, loadingBookings } =
    useSwitchBookings(bookings);

  const handleDate = (newValue) => {
    if (action) {
      action?.setFieldValue('date', newValue);
    }
    setDateState(newValue);
  };

  useEffect(() => {
    setRenderBookings({ morningBookings, afternonBookings, nightBookings });
  }, [bookings]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {onlyCalendar ? (
          <CalendarPicker
            disabled={disabled}
            inputFormat="MM/DD/YYYY"
            date={dateState}
            onChange={handleDate}
            renderDay={renderizeDays(renderBookings)}
          />
        ) : !isPhone ? (
          <DesktopDatePicker
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
