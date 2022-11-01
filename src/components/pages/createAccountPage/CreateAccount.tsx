import React, { useState, useEffect, FC, useContext } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import BACKEND_URL from "../../../backendUrl";
import { TheContext } from "../../../TheContext";
import {
  createAccountReturnButton,
  createAccountSignButton,
  createAccountBoxTitleText,
  createAccountHeaderTitleText,
  createAccountHeaderContentText
} from "../../../sxStyles";

interface IProps {
  setLogged: Function;
  setRegisterFormVisible: Function;
}

const CreateAccount: FC<IProps> = ({ setLogged, setRegisterFormVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: ""
  });
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8);

  const context = useContext(TheContext);

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const { value, name } = event.target;
    setPassword({
      ...password,
      [name]: value
    });
  };
  const [errorMessage, setErrorMesssage] = useState("");

  useEffect(() => {
    setValidLength(
      password.firstPassword.length >= requiredLength ? true : false
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
  }, [password, requiredLength]);

  const handleCreateAccount = async () => {
    if (match) {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": BACKEND_URL
          },
          body: JSON.stringify({
            username: username,
            password: password.firstPassword
          })
        });
        let data = await response.json();
        if (response.ok) {
          document.cookie = `librarySession=${data.secret};expires=${new Date(
            new Date().getTime() + 604800000
          ).toUTCString()};domain=localhost;path=/;SameSite=strict`;
          setLogged(true);
          context?.setUsername(username);
        } else {
          setErrorMesssage(data.message ? data.message : "internal error");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Invalid password");
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
                sx={createAccountHeaderTitleText}
              >
                Efilibrary
              </Typography>
              <Typography sx={createAccountHeaderContentText}>
                Important! To create a valid password you will need at least 8
                characters, and you will need to use uppercase, lowercase, and a
                number. The use of special characters is forbidden.
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
          <Paper
            elevation={10}
            sx={{
              width: 500,
              height: 500
            }}
          >
            <Box sx={{ padding: 10 }}>
              <Typography variant="h4" sx={createAccountBoxTitleText}>
                Create Account
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "Column",
                  marginBottom: 3,
                  marginTop: 4
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
                  sx={createAccountSignButton}
                >
                  SIGN UP
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setRegisterFormVisible(false)}
          sx={createAccountReturnButton}
        >
          Return
        </Button>
      </Box>
    </Grid>
  );
};

export default CreateAccount;
