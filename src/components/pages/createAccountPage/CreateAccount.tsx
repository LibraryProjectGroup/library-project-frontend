import React, { useState, useEffect, useContext, FC } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import BACKEND_URL from "../../../backendUrl";
import { useNavigate } from "react-router-dom";
import {
  loginButton,
  textButton,
  loginRegisterTitle,
  loginRegisterContent,
  AuthBoxTitle,
} from "../../../sxStyles";
import { setSession } from "../../../auth";
import { TheContext } from "../../../TheContext";

const REQUIRED_PASSWORD_LENGTH = 8;

const CreateAccount: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const { value, name } = event.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  useEffect(() => {
    setValidLength(
      password.firstPassword.length >= REQUIRED_PASSWORD_LENGTH ? true : false
    );
    setUpperCase(
      password.firstPassword.toLowerCase() !== password.firstPassword
    );
    setLowerCase(
      password.firstPassword.toUpperCase() !== password.firstPassword
    );
    setHasNumber(/\d/.test(password.firstPassword));
    setMatch(
      !!password.firstPassword &&
        password.firstPassword === password.secondPassword
    );
    setSpecialChar(
      /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword)
    );
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
  }, [password]);

  const handleCreateAccount = async () => {
    if (!match) return setErrorMessage("Passwords don't match");
    if (!validLength)
      return setErrorMessage(
        `Passwords has to be atleast ${REQUIRED_PASSWORD_LENGTH} characters long`
      );
    if (!upperCase || !lowerCase || !hasNumber || !specialChar)
      return setErrorMessage(
        "Password has to have atleast one uppercase character, lowercase character, number, and special character"
      );

    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password.firstPassword,
        }),
      });
      let data = await response.json();
      if (data.ok) {
        setSession(data.secret);
        context?.setIsLogin(true);
        navigate("/list-books");
      } else {
        setErrorMessage(data.message ? data.message : "internal error");
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
        maxWidth: window.innerWidth,
        minHeight: window.innerHeight,
      }}
    >
      <Grid item container alignItems="center" sx={{ width: "95%" }}>
        <Grid item xs={12} md={7}>
          <Box>
            <Box sx={{ margin:'4rem 4rem 2rem 4rem' }}>
              <Typography
                variant="h1" //not responsive font
                sx={loginRegisterTitle}
              >
                Efilibrary
              </Typography>
              <Typography sx={loginRegisterContent}>
                Important! To create a valid password you will need at least 8
                characters with at least one uppercase, lowercase, number and
                special character.
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
          <Paper
            elevation={10}
            sx={{
              width: 500,
              height: 650,
            }}
          >
            <Box sx={{ padding: 10 }}>
              <Typography variant="h4" sx={AuthBoxTitle}>
                Create Account
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "Column",
                  marginBottom: 3,
                  marginTop: 4,
                }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />

                <TextField
                  name="firstPassword"
                  label="Password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  onChange={inputChange}
                />
                <TextField
                  name="secondPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  onChange={inputChange}
                />
                <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleCreateAccount}
                  sx={loginButton}
                >
                  SIGN UP
                </Button>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={textButton}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
