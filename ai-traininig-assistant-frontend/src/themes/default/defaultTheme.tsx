/* eslint-disable import/prefer-default-export */
import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

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
    MuiTableCell: {
      styleOverrides: {
        root: {
          // Add global styles for TableCell
          // padding: '10px', // Adjust the padding as needed
          // Add other global styles here
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          // Add global styles for TableHead
          // backgroundColor: 'lightblue',
          // fontWeight: 'bold',
          // Add other global styles here
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // Add global styles for TableRow
          // '&:hover': {
          //   backgroundColor: 'lightgray',
          // },
          // Add other global styles here
        },
      },
    },
    // Add other table components and styles as needed
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
      primary: '#000',
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
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});
