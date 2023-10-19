import { HashRouter, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import MenuBar from './components/Navigation/MenuBar/MenuBar';
import Home from './components/views/Home/Home';
import Login from './components/views/Login/Login';
import Register from './components/views/Register/Register';

function App() {
  return (
    <HashRouter>
      <Grid divided="vertically" padded="vertically" columns={2}>
        <Grid.Row>
          <Grid.Column>
            <MenuBar />
          </Grid.Column>
          <Grid.Column>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </HashRouter>
  );
}

export default App;
