import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
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


const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken)
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
      <BrowserRouter  >
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/signup" component={Signup} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/logout" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
