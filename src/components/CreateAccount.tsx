import React, { useState, useEffect, ReactElement } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import BACKEND_URL from "../backendUrl";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    firstPassword: '',
    secondPassword: ''
  });
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8)

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const { value, name } = event.target;
    setPassword({
      ...password,
      [name]: value
    })
  }
  const [errorMessage, setErrorMesssage] = useState("");

  useEffect(() => {
    setValidLength(password.firstPassword.length >= requiredLength ? true : false);
    setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
    setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
    setHasNumber(/\d/.test(password.firstPassword));
    setMatch(!!password.firstPassword && password.firstPassword === password.secondPassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword));

  }, [password, requiredLength]);

  const handleCreateAccount = async () => {
    /* login function here */
    console.log(username, password);
    try {
      const response = await fetch(
        `${BACKEND_URL}/auth/login?username=${username}&password=${password}&confirmpassword=${password}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": BACKEND_URL,
          },
        }
      );
      let data = await response.json();
      if (response.ok) {
        /*if login successfull, navigate to homepage */
        document.cookie = `librarySession=${data.secret};expires=${new Date(
          new Date().getTime() + 604800000
        ).toUTCString()};domain=localhost;path=/;SameSite=strict`;
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
        maxWidth: window.innerWidth,
        minHeight: window.innerHeight,
        backgroundColor: "#f0f0ec",
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
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "bold",
                  paddingBottom: 5,
                }}
              >
                Efilibrary
              </Typography>
              <Typography
                sx={{ fontFamily: "Merriweather", fontWeight: "light" }}
              >
                Important!
                To create a valid password you will need at least 8 charecters,
                and you will need to use uppercase, lowercase, and a number.
                The use of special characters is forbidden.
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
              height: 500,
            }}
          >
            <Box sx={{ padding: 10 }}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Create Account
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "Column",
                  marginBottom: 5,
                  marginTop: 4,
                }}
              >
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
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: 15,
                    width: "40%",
                    backgroundColor: "#FFD100",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#FFB500",
                    },
                    padding: 2,
                  }}
                >
                  SIGN UP
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
