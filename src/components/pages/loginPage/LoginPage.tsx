import React, { useState, useContext, FC, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { TheContext } from "../../../TheContext";
import BACKEND_URL from "../../../backendUrl";
import { useNavigate } from "react-router-dom";
import {
  loginButton,
  loginBox,
  loginAuthBoxTitle,
  loginHeaderTitleText,
  loginHeaderContentText,
  loginPaper
} from "../../../sxStyles";
import { setSession } from "../../../auth";

const LoginPage: FC = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");
  const navigate = useNavigate();

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const context = useContext(TheContext);
  const handleLogin = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": BACKEND_URL
        },
        body: JSON.stringify({ username: username, password: password })
      });
      let data = await response.json();
      if (response.ok) {
        console.log(data);
        /*if login successfull, navigate to homepage */
        context?.setUsername(username);
        context?.setAdmin(true);
        context?.setUserId(data.userId);
        setSession(data.secret);
        navigate("/list-books");
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
        backgroundColor: "#f0f0ec"
      }}
    >
      <Grid
        item
        container
        alignItems="center"
        sx={{ width: "95%", height: "90%" }}
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
            justifyContent: "center"
          }}
        >
          <Paper elevation={10} sx={loginPaper}>
            <Box sx={{ padding: 10 }}>
              <Typography variant="h4" sx={loginAuthBoxTitle}>
                Login
              </Typography>
              <Box sx={loginBox}>
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  onChange={(event) => {
                    setUsername(event.target.value);
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/create-account")}
          sx={loginButton}
        >
          Create account
        </Button>
      </Box>
    </Grid>
  );
};

export default LoginPage;
