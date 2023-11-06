import {
  Home,
  Login,
  HowToReg,
  Logout,
  FitnessCenter,
  BarChart,
} from '@mui/icons-material';

// eslint-disable-next-line import/prefer-default-export
export const mainListItems = [
  {
    id: 0,
    icon: <Login />,
    label: 'Login',
    route: '/login',
  },
  {
    id: 1,
    icon: <HowToReg />,
    label: 'Register',
    route: '/register',
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
    icon: <FitnessCenter />,
    label: 'Workouts',
    route: '/workouts',
  },
  {
    id: 2,
    icon: <BarChart />,
    label: 'Workout Analysis',
    route: '/analysis',
  },
  {
    id: 3,
    icon: <Logout />,
    label: 'Logout',
    route: '/login',
  },
];
