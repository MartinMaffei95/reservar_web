import React from 'react';
// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
const SiteGlobalStyle = ({ children }) => {
  const darkOn = useSelector((state) => state?.userReducer?.darkOn);
  const rootStyle = createTheme({
    typography: {
      fontFamily: `'Roboto Condensed','Noto Sans', sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      mode: darkOn && darkOn ? 'dark' : 'light',
      primary: blue,
    },
  });

  return (
    <ThemeProvider theme={rootStyle}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default SiteGlobalStyle;
