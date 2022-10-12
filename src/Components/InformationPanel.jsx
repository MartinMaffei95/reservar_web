import {
  Paper,
  Grid,
  Typography,
  Tooltip,
  Icon,
  ButtonGroup,
  Button,
  Box,
  ClickAwayListener,
} from '@mui/material';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiBell, FiBellOff } from 'react-icons/fi';

import { useState, useEffect } from 'react';
import usePutFetch from '../Hooks/usePutFetch';
import MyToolTip from '../molecules/MyToolTip';

const InformationPanel = ({ profileData }) => {
  const [profile, setProfile] = useState();

  const helpText = (
    <>
      <div>
        Esta informacion no es obligatoria y solo se mostrara a los demas
        usuarios si lo habilitas
      </div>
      <div>
        <AiOutlineEye /> Puedes habilitar para que vean tu informacion con el
        icono del ojo
      </div>
      <div>
        <FiBell /> Alertas vía mail: Puedes habilitarlas todas o personalizarlas
        y recibir solo la de los edificios que te interesan.
      </div>
      <div>
        <FiBell /> Si quieres que se te notificará cuando te inviten a un nuevo
        edificio
      </div>
    </>
  );

  useEffect(() => {
    setProfile({
      profileConfig: profileData?.profileConfig,
      profileData: {
        name: profileData?.name || '',
        last_name: profileData?.last_name || '',
        email: profileData?.email || '',
      },
    });
  }, [profileData]);

  const InformationField = ({ label, value, isDisableText, icons }) => {
    return (
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box component="div" sx={{ display: 'flex' }}>
          <Typography>{label} </Typography>
          <Typography
            sx={isDisableText ? { color: 'gray' } : { color: '#000' }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography>
        Informacion adicional
        <MyToolTip text={helpText} icon={<AiFillQuestionCircle />} />
      </Typography>

      {profile?.profileData && (
        <InformationField
          label={'Nombre'}
          value={profile?.profileData?.name}
          isDisableText={!profile?.profileConfig?.name?.visualization}
          icons={[
            {
              icon: profile?.profileConfig?.name?.visualization ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              ),
            },
          ]}
        />
      )}

      {profile?.profileData && (
        <InformationField
          label={'Nombre'}
          value={profile?.profileData?.last_name}
          isDisableText={!profile?.profileConfig?.last_name?.visualization}
          icons={[
            {
              icon: profile?.profileConfig?.name?.visualization ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              ),
            },
          ]}
        />
      )}
      {profile?.profileData && (
        <InformationField
          label={'Direccion de mail'}
          value={profile?.profileData?.email}
          isDisableText={!profile?.profileConfig?.email?.visualization}
          icons={[
            {
              icon: profile?.profileConfig?.email?.visualization ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              ),
            },
            {
              icon: profile?.profileConfig?.email?.notification ? (
                <FiBell />
              ) : (
                <FiBellOff />
              ),
            },
          ]}
        />
      )}
    </Box>
  );
};

export default InformationPanel;
