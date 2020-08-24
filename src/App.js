import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import { getUserData, logout } from './redux/actions/userActions';
import store from './redux/store';
//redux
import { SET_AUTHENTICATED } from './redux/types';
import AuthRoute from './util/AuthRoute';
import themeFile from './util/theme';
import User from './pages/user';


const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  } else {
    store.dispatch(logout());
    window.location.href = "/login"
  }
}


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter >
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/signup" component={Signup} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/logout" />
              <Route exact path="/user/:handle" component={User} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
