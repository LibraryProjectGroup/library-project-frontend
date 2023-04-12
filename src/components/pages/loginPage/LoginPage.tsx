import React, { useState, FC, useEffect, useContext, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import BACKEND_URL from "../../../backendUrl";
import { Route, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    const secret = params.get("secret");
    if (!user || !secret) {
      return;
    }
    setSession(secret);
    navigate("/list-books");
    // update user data when you logIn and logOut
    context?.setIsLogin(true);
  }, [context, navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
                  Welcome to EfiLibrary - the digital extension of our physical
                  book collection. Borrow books, make reservations, create lists
                  of favorites and immerse yourself in the world of knowledge.
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
                      ),
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
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="text"
                    onClick={() => {
                      window.location.replace(
                        `${process.env.REACT_APP_BACKEND_URL}/auth/oidc/login?issuer=1`
                      );
                    }}
                    sx={textButton}
                  >
                    Authenticate with Google
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
