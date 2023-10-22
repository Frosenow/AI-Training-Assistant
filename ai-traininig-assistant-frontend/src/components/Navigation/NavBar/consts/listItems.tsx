import { Home, Login, HowToReg } from '@mui/icons-material';

// eslint-disable-next-line import/prefer-default-export
export const mainListItems = [
  {
    id: 0,
    icon: <Home />,
    label: 'Home',
    route: '/',
  },
  {
    id: 1,
    icon: <Login />,
    label: 'Login',
    route: 'login',
  },
  {
    id: 2,
    icon: <HowToReg />,
    label: 'Register',
    route: 'register',
  },
];
