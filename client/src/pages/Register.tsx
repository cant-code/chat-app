import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import Linking from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "./Form.style";
import useSnackbar from "../hooks/SnackbarHook";

interface bodyType {
  email: string;
  username: string;
  password: string;
  password2: string;
}

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { setMsg } = useSnackbar();

  const initialBodyState: bodyType = {
    email: "",
    username: "",
    password: "",
    password2: "",
  };

  const [body, setBody] = useState<bodyType>(initialBodyState);
  const [formErrors, setFormErrors] = useState<bodyType>(initialBodyState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [validating, setValidate] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function sendForm() {
      if (
        !formErrors.email.length &&
        !formErrors.username.length &&
        !formErrors.password.length &&
        !formErrors.password2.length
      ) {
        const { email, username, password, password2 } = body;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username, password, password2 }),
        };
        const res = await fetch(`/api/users/register`, requestOptions);
        const data = await res.json();
        setValidate(false);
        if (res.status === 400) {
          let str = "Error: " + data.error;
          setMsg(str, "error");
        } else {
          setMsg("Successfully Registered", "success");
          history.push("/login");
        }
      }
    }
    if (validating) sendForm();
  }, [validating, body, formErrors, history, setMsg]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleValidation();
  };

  const handleValidation = () => {
    setFormErrors(initialBodyState);
    const email = /.+@.+\..+/;
    const pass = /^\S{6,}$/;
    const errors: bodyType = { email: "", username: "", password: "", password2: "" };
    if (!email.test(body.email)) errors.email = "Please enter a valid email";
    if (body.username.length === 0) errors.username = "This field is required";
    if (!pass.test(body.password))
      errors.password = "Password should contain atleast 6 characters";
    if (body.password !== body.password2)
      errors.password2 = "Password do not match";
    setFormErrors(errors);
    setValidate(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
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
              Register
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
                id="email"
                label="Email Address"
                name="email"
                value={body.email}
                onChange={handleChange}
                error={formErrors.email.length > 0 ? true : false}
                helperText={formErrors.email}
                autoFocus
              />
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
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
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
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                name="password2"
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                id="password2"
                value={body.password2}
                onChange={handleChange}
                error={formErrors.password2.length > 0 ? true : false}
                helperText={formErrors.password2}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowConfirm}
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
                Register
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Linking component={Link} to="/" variant="body2">
                    Already have an account? Sign in
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
