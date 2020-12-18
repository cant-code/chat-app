import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import pink from '@material-ui/core/colors/pink';
import cyan from '@material-ui/core/colors/cyan';
import history from './utils/history';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#1b262c'
    },
    primary: cyan,
    secondary: pink,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router history={history}>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
