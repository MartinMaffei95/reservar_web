import { useState, Fragment } from 'react';
import { Menu, MenuItem, IconButton, Badge, Typography } from '@mui/material';
import { MdMeetingRoom } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { notificationsMenuStyle } from '../muiStyles';
import axios from 'axios';
import { getNotifications } from '../Redux/actions/userActions';
const NotificationIcon = () => {
  const notifications = useSelector((state) => state.userReducer.notifications);
  const dispatch = useDispatch();
  const [unviewedNotifications, setUnviewedNotifications] = useState(
    notifications.filter((n) => n.viewed === false)
  );
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
    setUnviewedNotifications(notifications.filter((n) => n.viewed === false));
    setOpen(true);
    setAnchorEl(event.currentTarget);
    if (unviewedNotifications.length > 0) {
      viewNotifications();
    }
  };
  const handleClose = () => {
    setUnviewedNotifications(notifications.filter((n) => n.viewed === false));
    if (unviewedNotifications.length > 0) {
      viewNotifications();
    }
    setAnchorEl(null);
    setOpen(false);
  };

  const notificationMessage = (notification) => {
    switch (notification.response) {
      case 'BOOKING_ACEPTED':
        return `Tu reserva en ${notification.building.name}/${notification.space.name} fue aceptada`;
      case 'BOOKING_DENIED':
        return `Tu reserva en ${notification.building.name}/${notification.space.name} no fue aceptada`;
      default:
        return notification.message;
    }
  };

  const responses = {};
  return (
    <>
      <IconButton onClick={handleClick} aria-label="notifications">
        <Badge
          badgeContent={
            unviewedNotifications && unviewedNotifications.length > 0
              ? unviewedNotifications.length
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
          onClick={handleClose}
          PaperProps={{
            elevation: 4,
            sx: notificationsMenuStyle,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {notifications.map((n) =>
            n.viewed ? (
              <MenuItem key={n?._id}>
                <Typography>{notificationMessage(n)}</Typography>
              </MenuItem>
            ) : (
              <MenuItem sx={{ background: '#ccccff' }} key={n?._id}>
                <Typography>{notificationMessage(n)}</Typography>
              </MenuItem>
            )
          )}
          <MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>Ver todas...</Typography>
          </MenuItem>
        </Menu>
      </Fragment>
    </>
  );
};

export default NotificationIcon;