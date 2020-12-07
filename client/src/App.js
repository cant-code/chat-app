import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';
import history from './utils/history';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#121212'
    },
    primary: cyan,
    secondary: deepPurple,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router history={history}>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
