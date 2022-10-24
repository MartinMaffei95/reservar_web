import * as React from 'react';
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
import { MdMenu, MdOutlineAccountCircle } from 'react-icons/md';
import ListComp from '../molecules/ListComp';
import { BsBuilding, BsCalendarCheck, BsDoorClosed } from 'react-icons/bs';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import useLogOut from '../Controllers/logout';
import { useResize } from '../Hooks/useResize';
import DarkModeChanger from '../molecules/DarkModeChanger';

export default function DrawerMenu({ toggleDrawer, state }) {
  const { handleLogout } = useLogOut();
  const { isPhone } = useResize();

  return (
    <div>
      <React.Fragment key={'left'}>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
          <Box
            sx={isPhone ? { width: '60vw' } : { width: '35vw' }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <span></span>

            <ListComp
              text={localStorage.getItem('username')}
              iconElement={
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MdOutlineAccountCircle />
                </IconButton>
              }
              redirect={'/user/profile'}
            />

            <Divider />

            <ListComp
              text="Reservar"
              iconElement={<MdOutlineAddToPhotos />}
              redirect={'/bookings/create'}
            ></ListComp>

            <ListComp
              text="Mis reservas"
              iconElement={<BsCalendarCheck />}
              redirect={'/bookings/'}
            />
            <ListComp
              text="Invitaciones"
              iconElement={<BsCalendarCheck />}
              redirect={'/user/requests'}
            />
            <ListComp
              text="Mis edificios"
              iconElement={<BsBuilding />}
              redirect={'/buildings/'}
            />
            <Divider />
            <DarkModeChanger />

            <ListComp
              clickAction={handleLogout}
              text="CERRAR SESION"
              iconElement={<BsDoorClosed />}
            />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
