import { HashRouter, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import './App.css';
import MenuBar from './components/Navigation/MenuBar/MenuBar';
import Home from './components/views/Home/Home';
import Login from './components/views/Login/Login';
import Register from './components/views/Register/Register';

function App() {
  return (
    <HashRouter>
      <Grid padded columns={2} stackable stretched>
        <Grid.Column width={3} style={{ padding: '9rem' }}>
          <MenuBar />
        </Grid.Column>
        <Grid.Column width={12}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </Grid.Column>
      </Grid>
    </HashRouter>
  );
}

export default App;
