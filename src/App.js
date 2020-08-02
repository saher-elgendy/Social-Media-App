import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import themeFile from './util/theme';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme = createMuiTheme(themeFile)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
