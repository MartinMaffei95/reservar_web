import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import {
  Typography,
  Menu,
  MenuItem,
  Toolbar,
  AppBar,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { backButtonStyle } from '../muiStyles';
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="back"
      onClick={() => {
        navigate(-1);
      }}
    >
      <MdKeyboardArrowLeft />
    </IconButton>
  );
};

export default BackButton;
