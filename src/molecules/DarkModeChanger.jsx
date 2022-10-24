import React from 'react';
import {
  Box,
  Menu,
  Drawer,
  Divider,
  IconButton,
  Switch,
  Icon,
  Typography,
  ListItem,
} from '@mui/material';

//ICONS
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../Redux/actions/userActions';
const DarkModeChanger = () => {
  const darkOn = useSelector((state) => state?.userReducer?.darkOn);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeTheme(event.target.checked));
  };

  return (
    <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography> Dark Mode</Typography>
      <Box sx={{ display: 'flex', height: 'max-content' }}>
        <Icon sx={{ height: 'max-content' }}>
          <BsFillSunFill />
        </Icon>
        <Switch checked={darkOn} onChange={handleChange} />
        <Icon sx={{ height: 'max-content' }}>
          <BsFillMoonStarsFill />
        </Icon>
      </Box>
    </ListItem>
  );
};

export default DarkModeChanger;
