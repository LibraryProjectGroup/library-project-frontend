import React, { useState, useContext, FC, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { TheContext } from "../TheContext";
import CreateAccount from "../components/CreateAccount";
import BACKEND_URL from "../backendUrl";

interface IProps {
  logged: boolean;
  setLogged: Function;
  registerFormVisible: boolean;
  setRegisterFormVisible: Function;
}

const LoginPage: FC<IProps> = ({ logged, setLogged, registerFormVisible, setRegisterFormVisible }: IProps): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");

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


  const context = useContext(TheContext);
  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/auth/login?username=${username}&password=${password}`,
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
        setLogged(true);
        context?.setUsername(username);
      } else {
        setErrorMesssage(data.message ? data.message : "internal error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!registerFormVisible && !logged) {
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
                  Login
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
                    label="Password"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={handleLogin}
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
            onClick={() => setRegisterFormVisible(true)}
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: 15,
              width: "100%",
              backgroundColor: "#FFD100",
              color: "black",
              "&:hover": {
                backgroundColor: "#FFB500",
              },
              padding: 2,
            }}
          >
            Create account
          </Button>
        </Box>
      </Grid>
    );
  } else if (registerFormVisible && !logged) {
    return (
      <div>
        {!logged && registerFormVisible && (
          <CreateAccount
            setLogged={setLogged}
            setRegisterFormVisible={setRegisterFormVisible}
          />
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default LoginPage;
