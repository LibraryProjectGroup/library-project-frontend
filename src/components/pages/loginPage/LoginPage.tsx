import React, { useState, FC, useEffect, useContext, useCallback } from "react";
import { Box, Typography, TextField, Button, Paper, Grid, IconButton, InputAdornment } from "@mui/material";
import BACKEND_URL from "../../../backendUrl";
import { useNavigate } from "react-router-dom";
import {
  loginButton,
  loginBox,
  AuthBoxTitle,
  loginPaper,
  textButton,
  loginRegisterTitle,
  loginRegisterContent,
} from "../../../sxStyles";
import { setSession } from "../../../auth";
import { TheContext } from "../../../TheContext";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const LoginPage: FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const context = useContext(TheContext);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = ( event: React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      if (data.ok) {
        setSession(data.secret);
        navigate("/list-books");
        // update user data when you logIn and logOut
        context?.setIsLogin(true);
      } else {
        setErrorMesssage(data.message ? data.message : "internal error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <Grid
        container
        flex-wrap="wrap"
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          maxWidth: dimensions.width,
          minHeight: dimensions.height,
        }}
      >
        <Grid
          item
          container
          alignItems="center"
          sx={{ width: "95%", paddingBottom: 10 }}
        >
          <Grid item xs={12} md={7}>
            <Box>
              <Box sx={{ margin: "4rem 4rem 2rem 4rem" }}>
                <Typography
                  variant="h1" //not responsive font
                  sx={loginRegisterTitle}
                >
                  EfiLibrary
                </Typography>
                <Typography sx={loginRegisterContent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper elevation={10} sx={loginPaper}>
              <Box sx={{ padding: "3rem" }}>
                <Typography variant="h4" sx={AuthBoxTitle}>
                  Login
                </Typography>
                <Box sx={loginBox}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />

                  <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  {errorMessage && (
                    <Typography sx={{ color: "red" }}>
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button variant="contained" type="submit" sx={loginButton}>
                    Log in
                  </Button>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="text"
                    onClick={() => navigate("/create-account")}
                    sx={textButton}
                  >
                    Create account
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
