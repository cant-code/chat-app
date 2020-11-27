import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Linking from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5em auto 5em auto",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const initialBodyState = {
    username: '',
    password: '',
  };

  const [body, setBody] = useState(initialBodyState);
  const [formErrors, setFormErrors] = useState(initialBodyState);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleValidation();
    if(!formErrors.username.length && !formErrors.password.length) {
      const { username, password } = body;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      };
      const res = await fetch(`/api/users/login`, requestOptions);
      const data = await res.json();
      if(res.status === 400) console.log(data);
      else console.log(data);
    }
  };

  const handleValidation = () => {
    setFormErrors(initialBodyState);
    const errors = {username: '', password: ''};
    if(body.username.length === 0)
      errors.username = "This field is required";
    if(body.password.length === 0)
      errors.password = "This field is required";
    setFormErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={body.username}
                onChange={handleChange}
                error={formErrors.username.length > 0 ? true : false}
                helperText={formErrors.username}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={body.password}
                onChange={handleChange}
                error={formErrors.password.length > 0 ? true : false}
                helperText={formErrors.password}
                InputProps={{endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Linking component={Link} to="/register" variant="body2">
                    Don't have an account? Sign Up
                  </Linking>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Container>
  );
}
