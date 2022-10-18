import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu, MdOutlineAccountCircle } from 'react-icons/md';
import {
  Typography,
  Menu,
  MenuItem,
  Toolbar,
  AppBar,
  IconButton,
  Badge,
} from '@mui/material';
import { MdMeetingRoom } from 'react-icons/md';
import DrawerMenu from './DrawerMenu';
import { useState } from 'react';
import BackButton from '../molecules/BackButton';
import { useSelector } from 'react-redux';
import NotificationIcon from './NotificationIcon';
const Header = ({ title, backButton, children }) => {
  // Recives in the children button to post a Post or Comment
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [state, setState] = React.useState();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MdMenu />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {backButton && <BackButton />}

            {title}
          </Typography>
          <div>
            {/* ICON FOR NOTIFICATION */}
            <NotificationIcon />
          </div>
        </Toolbar>
      </AppBar>
      <DrawerMenu state={state} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Header;
