import React, { useState, useEffect, useContext, FC } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import BACKEND_URL from "../../../../backendUrl";
import { useNavigate } from "react-router-dom";
import {
  loginButton,
  textButton,
  loginRegisterTitle,
  loginRegisterContent,
  AuthBoxTitle,
} from "../../../../sxStyles";
import { TheContext } from "../../../../TheContext";
import PasswordToggle from "../PasswordToggle";

const REQUIRED_PASSWORD_LENGTH = 8;

const CreateAccount: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwords, setPasswords] = useState({
    firstPassword: "",
    secondPassword: "",
  });
  const [validLength, setValidLength] = useState(false);
  const [match, setMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    first: false,
    second: false,
  });

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const handleClickShowPassword = (key: "first" | "second") => {
    setShowPassword((showPassword) => ({
      ...showPassword,
      [key]: !showPassword[key],
    }));
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const { value, name } = event.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  useEffect(() => {
    setValidLength(
      passwords.firstPassword.length >= REQUIRED_PASSWORD_LENGTH ? true : false
    );
    setMatch(
      !!passwords.firstPassword &&
        passwords.firstPassword === passwords.secondPassword
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
  }, [passwords]);

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!match) return setErrorMessage("Passwords don't match");
    if (!validLength)
      return setErrorMessage(
        `Passwords has to be atleast ${REQUIRED_PASSWORD_LENGTH} characters long`
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
          password: passwords.firstPassword,
        }),
      });
      let data = await response.json();
      if (data.ok) {
        console.log("Registration succesful");
        navigate("/login");
      } else {
        setErrorMessage(data.message ? data.message : "internal error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={(event) => handleCreateAccount(event)}>
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
              <Box sx={{ margin: "4rem 4rem 2rem 4rem" }}>
                <Typography
                  variant="h1" //not responsive font
                  sx={loginRegisterTitle}
                >
                  Efilibrary
                </Typography>
                <Typography sx={loginRegisterContent}>
                  Important! To create a valid password you will need at least 8
                  characters.
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
                    type={showPassword.first ? "text" : "password"}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <PasswordToggle
                          onMouseDown={handleMouseDownPassword}
                          onClick={() => handleClickShowPassword("first")}
                          passwordVisible={showPassword.first}
                        ></PasswordToggle>
                      ),
                    }}
                    onChange={inputChange}
                  />
                  <TextField
                    name="secondPassword"
                    label="Confirm Password"
                    variant="outlined"
                    type={showPassword.second ? "text" : "password"}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <PasswordToggle
                          onMouseDown={handleMouseDownPassword}
                          onClick={() => handleClickShowPassword("second")}
                          passwordVisible={showPassword.second}
                        />
                      ),
                    }}
                    onChange={inputChange}
                  />
                  <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button variant="contained" type="submit" sx={loginButton}>
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
    </form>
  );
};

export default CreateAccount;
