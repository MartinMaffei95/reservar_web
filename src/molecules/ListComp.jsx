import React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdOutlineInbox, MdOutlineMail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ListComp = ({ text, iconElement, redirect, clickAction }) => {
  const navigate = useNavigate();

  return (
    <List
      onClick={() => {
        if (redirect) return navigate(redirect);
        if (clickAction) return clickAction();
      }}
    >
      <ListItem key={text} disablePadding>
        <ListItemButton>
          {/* ICON */}
          <ListItemIcon>{iconElement}</ListItemIcon>
          {/* TEXT */}
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default ListComp;
