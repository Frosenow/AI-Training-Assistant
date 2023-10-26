import { Home, Login, HowToReg, Logout } from '@mui/icons-material';

// eslint-disable-next-line import/prefer-default-export
export const mainListItems = [
  {
    id: 0,
    icon: <Login />,
    label: 'Login',
    route: 'login',
  },
  {
    id: 1,
    icon: <HowToReg />,
    label: 'Register',
    route: 'register',
  },
];

export const loggedUserItems = [
  {
    id: 0,
    icon: <Home />,
    label: 'Home',
    route: '/',
  },
  {
    id: 1,
    icon: <Logout />,
    label: 'Logout',
    route: 'login',
  },
];
