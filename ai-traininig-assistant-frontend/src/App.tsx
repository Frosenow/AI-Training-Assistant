import { HashRouter, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import './App.css';
import { ThemeProvider, Grid } from '@mui/material';
import { defaultTheme } from './themes/default/defaultTheme';

import { AuthProvider } from './context/auth';
import NavBar from './components/Navigation/NavBar/NavBar';
import Home from './components/views/Home/Home';
import SignIn from './components/views/Login/SignIn';
import SignUp from './components/views/Register/SingUp';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <HashRouter>
          <Grid container sx={{ justifyContent: 'center' }}>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
            </Routes>
          </Grid>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
