import React, { useState, FC, useEffect, useContext } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import BACKEND_URL from "../../../backendUrl";
import { Route, useNavigate } from "react-router-dom";
import {
  loginButton,
  loginBox,
  loginAuthBoxTitle,
  loginHeaderTitleText,
  loginHeaderContentText,
  loginPaper,
  textButton,
} from "../../../sxStyles";
import { setSession } from "../../../auth";
import { TheContext } from "../../../TheContext";

const LoginPage: FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");
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

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email: email, password: password }),
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
            <Box sx={{ padding: 10 }}>
              <Typography
                variant="h1" //not responsive font
                sx={loginHeaderTitleText}
              >
                Efilibrary
              </Typography>
              <Typography sx={loginHeaderContentText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            <Box sx={{ padding: 10 }}>
              <Typography variant="h4" sx={loginAuthBoxTitle}>
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
                  type="password"
                  margin="normal"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                {errorMessage && (
                  <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={loginButton}
                >
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
              <Box>
                <Button
                  variant="text"
                  onClick={() => {
                    window.location.replace(
                      `${process.env.REACT_APP_BACKEND_URL}/auth/oidc/login?issuer=google`
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
  );
};

export default LoginPage;
