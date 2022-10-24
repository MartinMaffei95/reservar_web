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

  useEffect(() => {
    setProfile({
      profileConfig: profileData?.profileConfig,
      profileData: {
        username: profileData?.username || '',
        name: profileData?.name || '',
        last_name: profileData?.last_name || '',
        email: profileData?.email || '',
      },
    });
  }, [profileData]);

  const InformationField = ({ label, value, isDisableText, icons }) => {
    return (
      <Box component="div" sx={{ display: 'flex', marginBlock: '.25em' }}>
        {value && (
          <Box component="div" sx={{ display: 'flex', gap: '.5em' }}>
            <Typography>{label}: </Typography>

            <Typography
              sx={
                isDisableText
                  ? { color: 'text.disabled' }
                  : { color: '.text.primary' }
              }
            >
              {value}
            </Typography>
          </Box>
        )}
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
      {profile?.profileData && (
        <InformationField
          label={'Username'}
          value={profile?.profileData?.username}
          isDisableText={false}
        />
      )}

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
          label={'Apellido'}
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
          label={'Email'}
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
