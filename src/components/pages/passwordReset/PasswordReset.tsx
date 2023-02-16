import React, { useState, FC, useEffect, useContext } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  loginButton,
  loginBox,
  AuthBoxTitle,
  loginPaper,
} from "../../../sxStyles";
import { fetchPasswordReset } from "../../../fetchFunctions";

const REQUIRED_PASSWORD_LENGTH = 8;

const PasswordReset: FC = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [invalid, setInvalid] = useState(false);

  const navigate = useNavigate();
  const { secret } = useParams();

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (secret)
      fetchPasswordReset(secret)
        .then((data) => data.json())
        .then((res) => {
          setInvalid(!res.ok);
        });
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
  }, [secret]);

  const handleChangePassword = async () => {
    try {
      if (password != confirmPassword)
        return setErrorMessage("Passwords do not match");

      if (password.length < REQUIRED_PASSWORD_LENGTH)
        return setErrorMessage(
          `Passwords has to be atleast ${REQUIRED_PASSWORD_LENGTH} characters long`
        );
      if (
        !/[A-ZÅÄÖ]/.test(password) ||
        !/[a-zåäö]/.test(password) ||
        !/\d/.test(password) ||
        !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)
      )
        return setErrorMessage(
          "Password has to have atleast one uppercase character, lowercase character, number, and special character"
        );

      if (secret)
        fetchPasswordReset(secret, password)
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              navigate("/");
            } else {
              setErrorMessage("Something went wrong");
            }
          });
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
        backgroundColor: "#f0f0ec",
      }}
    >
      <Paper elevation={10} sx={loginPaper}>
        <Box sx={{ padding: 10 }}>
          <Typography variant="h4" sx={AuthBoxTitle}>
            {invalid
              ? "This link is invalid or expired"
              : "Choose new password"}
          </Typography>
          {!invalid && (
            <>
              <Box sx={loginBox}>
                <TextField
                  label="New password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />

                <TextField
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
                {errorMessage && (
                  <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  sx={loginButton}
                >
                  Accept
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default PasswordReset;
