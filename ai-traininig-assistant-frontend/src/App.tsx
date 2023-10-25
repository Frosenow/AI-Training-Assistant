import { HashRouter, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import './App.css';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from './themes/default/defaultTheme';

import { AuthProvider } from './context/auth';
import NavBar from './components/Navigation/NavBar/NavBar';
import Home from './components/views/Home/Home';
import Login from './components/views/Login/Login';
import Register from './components/views/Register/Register';

// eslint-disable-next-line import/order
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <HashRouter>
          <Grid container>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </Grid>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
