/* eslint-disable import/prefer-default-export */
import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d0c1b',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#3d3c48',
      dark: '#090812',
      main: '#0d0c1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a7f4e7',
      dark: '#65a99d',
      main: '#91f2e1',
      contrastText: '#000',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
      disabled: '#dcdbde',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    divider: '#fff',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
