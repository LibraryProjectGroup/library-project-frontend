import React, { useState } from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";

const MyAccount = () => {
  const [userName, setUserName] = useState("testname");
  const [email, setEmail] = useState("test@email.com");

  return (
    <Paper elevation={10} sx={{ padding: "2rem" }}>
      User info:
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{ marginTop: "1rem" }}
      >
        <Stack>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            User name: {userName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Email: {email}
          </Typography>
        </Stack>
      </Stack>
      Borrowed Books:
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{ marginTop: "1rem" }}
      >
        <Stack>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Title: {}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Merriweather",
              fontWeight: "light",
            }}
          >
            Author: {}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Merriweather",
              fontWeight: "light",
            }}
          >
            Topic: {}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Merriweather",
              fontWeight: "light",
            }}
          >
            isbn: {}
          </Typography>
          <Stack marginY={1} justifyContent="space-between">
            <Button
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: 15,
                //width: "30%",
                backgroundColor: "#FFD100",
                color: "black",
                "&:hover": {
                  backgroundColor: "#FFB500",
                },
                //padding: 1,
              }}
              variant="contained"
            >
              Return
            </Button>
            <Button
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: 15,
                //width: "30%",
                backgroundColor: "#FFD100",
                color: "black",
                "&:hover": {
                  backgroundColor: "#FFB500",
                },
                //padding: 1,
              }}
              variant="contained"
            >
              Renew
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MyAccount;
