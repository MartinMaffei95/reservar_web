import { useState, Fragment, useId } from 'react';
import {
  Menu,
  MenuItem,
  Icon,
  IconButton,
  Badge,
  Typography,
  Box,
} from '@mui/material';
import { MdMeetingRoom } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  bookingData,
  notificationsMenuStyle,
  notificationStyle,
} from '../muiStyles';
import axios from 'axios';
import { getNotifications } from '../Redux/actions/userActions';
import moment from 'moment';
import translate from '../functions/translate';
import { BsCalendarCheck, BsCalendarX } from 'react-icons/bs';
import NotificationsScroll from './NotificationsScroll';
const NotificationIcon = () => {
  const componentId = useId();
  const notifications = useSelector(
    (state) => state?.userReducer?.allNotifications
  );
  const page = useSelector((state) => state?.userReducer?.pageData?.page);
  const hasNextPage = useSelector(
    (state) => state?.userReducer?.pageData?.hasNextPage
  );
  const dispatch = useDispatch();
  const [unviewedNotifications, setUnviewedNotifications] = useState(
    notifications?.filter((n) => n?.viewed === false) || []
  );
  const [renderNotifications, setRenderNotifications] = useState(notifications);
  const [actualPage, setActualPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  // const open = anchorEl || false;

  const viewNotifications = async () => {
    try {
      axios(
        `${process.env.REACT_APP_URI}/users/${localStorage.getItem(
          'userID'
        )}/view_notifications`,
        {
          method: 'PUT',
          headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: { notifications_id: unviewedNotifications },
        }
      ).then((res) => {
        dispatch(getNotifications());
      });
    } catch (e) {
      alert('errorrrrrrr');
    }
  };

  const handleClick = (event) => {
    setUnviewedNotifications(notifications?.filter((n) => n?.viewed === false));
    setOpen(true);
    setAnchorEl(event?.currentTarget);
    if (unviewedNotifications?.length > 0) {
      viewNotifications();
    }
  };
  const handleClose = () => {
    setUnviewedNotifications(notifications?.filter((n) => n?.viewed === false));
    if (unviewedNotifications?.length > 0) {
      viewNotifications();
    }
    setAnchorEl(null);
    setOpen(false);
  };

  const loadMoreNotifications = () => {
    dispatch(getNotifications(actualPage + 1, notifications));
    setActualPage((actualPage) => actualPage + 1);
  };

  const notificationMessage = (notification) => {
    switch (notification?.response) {
      case 'BOOKING_ACEPTED':
        return (
          <>
            <Icon sx={{ color: 'success.main' }}>
              <BsCalendarCheck />
            </Icon>
            <Typography>
              Tu reserva en {notification?.building?.name}/
              {notification?.space?.name} del dia
              {moment(notification?.booking?.date).format('MM/DD/YY')}-
              {translate(notification?.booking?.time)} fue aceptada
            </Typography>
          </>
        );
      case 'BOOKING_DENIED':
        return (
          <>
            <Icon sx={{ color: 'error.main' }}>
              <BsCalendarX />
            </Icon>
            <Typography>
              Tu reserva en {notification?.building?.name}/
              {notification?.space?.name} del dia
              {moment(notification?.booking?.date).format('MM/DD/YY')}-
              {translate(notification?.booking?.time)} no fue aceptada
            </Typography>
          </>
        );
      default:
        return notification?.message;
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="notifications">
        <Badge
          badgeContent={
            unviewedNotifications && unviewedNotifications?.length > 0
              ? unviewedNotifications?.length
              : 0
          }
          color="secondary"
        >
          <MdMeetingRoom color="#fff" />
        </Badge>
      </IconButton>
      {/* NOTIFICATIONS */}
      <Fragment>
        <Menu
          autoFocus={false}
          anchorEl={anchorEl}
          open={(open && open) || false}
          onClose={handleClose}
          // onClick={handleClose}
          PaperProps={{
            elevation: 4,
            sx: notificationsMenuStyle,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          id="testId"
        >
          <NotificationsScroll id={componentId} />
        </Menu>
      </Fragment>
    </>
  );
};

export default NotificationIcon;
