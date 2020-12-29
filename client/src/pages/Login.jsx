import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "./Form.style";
import useSnackbar from "../hooks/SnackbarHook";

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { setMsg } = useSnackbar();
  const initialBodyState = {
    username: "",
    password: "",
  };

  const [body, setBody] = useState(initialBodyState);
  const [formErrors, setFormErrors] = useState(initialBodyState);
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    async function sendForm() {
      if (!formErrors.username.length && !formErrors.password.length) {
        const { username, password } = body;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        };
        const res = await fetch(`/api/users/login`, requestOptions);
        const data = await res.json();
        setValidation(false);
        if (res.status === 400 || res.status === 404) {
          let str = "Error: " + data.Error;
          setMsg(str, "error");
        } else {
          setMsg("Successfully Logged In", "success");
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          history.push("/");
        }
      }
    }
    if (validation) sendForm();
  }, [validation, body, formErrors, history, setMsg]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation();
  };

  const handleValidation = () => {
    setFormErrors(initialBodyState);
    const errors = { username: "", password: "" };
    if (body.username.length === 0) errors.username = "This field is required";
    if (body.password.length === 0) errors.password = "This field is required";
    setFormErrors(errors);
    setValidation(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value,
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
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
      </Card>
    </Container>
  );
}
