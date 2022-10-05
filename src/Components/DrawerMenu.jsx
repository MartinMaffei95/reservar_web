import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import ListComp from '../molecules/ListComp';
import { BiUserCircle } from 'react-icons/bi';
import { BsBuilding, BsCalendarCheck, BsDoorClosed } from 'react-icons/bs';
import { MdOutlineAddToPhotos } from 'react-icons/md';

export default function DrawerMenu({ toggleDrawer, state }) {
  return (
    <div>
      <React.Fragment key={'left'}>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: '60vw' }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListComp
              text="CREAR RESERVA"
              iconElement={<MdOutlineAddToPhotos />}
              redirect={'/bookings/create'}
            ></ListComp>
            <Divider />
            <ListComp text="Mi usuario" iconElement={<BiUserCircle />} />
            <ListComp
              text="Mis reservas"
              iconElement={<BsCalendarCheck />}
              redirect={'/bookings/'}
            />
            <ListComp
              text="Mis edificios"
              iconElement={<BsBuilding />}
              redirect={'/buildings/'}
            />
            <Divider />
            <ListComp text="CERRAR SESION" iconElement={<BsDoorClosed />} />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
