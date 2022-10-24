import { useState, Fragment } from 'react';
import { MenuItem, Icon, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { notificationStyle, notificationStyle_last } from '../muiStyles';
import axios from 'axios';
import { getNotifications } from '../Redux/actions/userActions';
import moment from 'moment';
import translate from '../functions/translate';
import { BsCalendarCheck, BsCalendarX } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';

const NotificationsScroll = ({ id }) => {
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
  const [actualPage, setActualPage] = useState(1);
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

  const test = () => {
    console.log('auda');
  };
  return (
    <InfiniteScroll
      dataLength={notifications.length} //This is important field to render the next data
      next={loadMoreNotifications}
      // next={test}
      hasMore={hasNextPage}
      height={notifications?.length <= 0 ? undefined : '240px'}
      scrollableTarget={'testId'}
      loader={
        <MenuItem>
          <Box sx={notificationStyle}>CARGANDO</Box>
        </MenuItem>
      }
    >
      {notifications?.length <= 0 ? (
        <MenuItem>
          <Box sx={notificationStyle_last}>Nada por aqui!</Box>
        </MenuItem>
      ) : (
        <>
          {notifications.map((n) =>
            !n.viewed ? (
              <MenuItem key={n?._id}>
                <Box sx={notificationStyle}>{notificationMessage(n)}</Box>
              </MenuItem>
            ) : (
              <MenuItem
                sx={{ background: '#ebebeb', width: '100%' }}
                key={n?._id}
              >
                <Box sx={notificationStyle}>{notificationMessage(n)}</Box>
              </MenuItem>
            )
          )}
        </>
      )}
    </InfiniteScroll>
  );
};

export default NotificationsScroll;
