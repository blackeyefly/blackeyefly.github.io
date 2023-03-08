import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';

const theme = createTheme({
  palette: {
    background: {
      default: "lightblue"
    }
  }
});

const Layout: FC = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Outlet />
    </ThemeProvider>
  </>
);

export default Layout;
