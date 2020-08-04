import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import AuthRoute from './util/AuthRoute';
import themeFile from './util/theme';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = true;
  } else {
    authenticated = false;
    // window.location.href = '/login';
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter  >
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/signup" component={Signup} authenticated={authenticated} />
              <AuthRoute path="/login" component={Login} authenticated={authenticated} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
