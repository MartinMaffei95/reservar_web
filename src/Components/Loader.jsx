import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export default function Loader() {
  const userLoading = useSelector((state) => state?.userReducer?.loading);
  const buildingLoading = useSelector(
    (state) => state?.buildingsReducer?.loading
  );

  return (
    <>
      {userLoading === true && buildingLoading === true && (
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#000',
            opacity: 0.75,
            zIndex: '100000000000',
            pointerEvents: 'all',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
