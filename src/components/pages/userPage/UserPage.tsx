import React, { useState, FC, useContext, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Fab,
  Tooltip,
  Box,
} from "@mui/material";
import { TheContext } from "../../../TheContext";
import { useNavigate } from "react-router-dom";
import {
  fetchCurrentBorrows,
  fetchReturnBorrowed,
  fetchAllBooks,
} from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  userPageReturnButton,
  userPageBackButton,
  userPageMyListsButton,
} from "../../../sxStyles";
import { endSession } from "../../../auth";
import Borrow from "../../../interfaces/borrow.interface";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const MyAccount: FC = (): JSX.Element => {
  const [books, setBooks] = useState<{ [key: number]: Book }>([]);

  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: "",
  });

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const unsortedBooks = await fetchAllBooks();
    let sortedBooks = [];
    for (const book of unsortedBooks) {
      sortedBooks[book.id] = book;
    }
    setBooks(sortedBooks);
  };

  const handleClosePopUpConfirmation = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setPopUpConfirmationOpen({
      ok: false,
      message: "",
    });
  };

  const action = (
    <React.Fragment>
      {/*! Undo functional for the future? */}
      {/* <Button
        color="secondary"
        size="small"
        onClick={handleClosePopUpConfirmation}
      >
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosePopUpConfirmation}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    fetchBooks();
    context?.fetchBorrows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBorrowedBooks = () => {
    let renderedBooks = [];
    const borrowsData = context?.borrows;
    if (borrowsData === undefined) return;
    for (const borrowed of borrowsData) {
      const book = books[borrowed.book];
      const currentDate = new Date();
      const datedDueDate = new Date(borrowed.dueDate);
      const convertToDay = 24 * 60 * 60 * 1000;
      const calculatedTime = Math.floor(
        (datedDueDate.getTime() - currentDate.getTime()) / convertToDay
      );

      if (!book) continue;
      renderedBooks.push(
        <Paper
          elevation={10}
          sx={{
            padding: "2rem",
            width: "60%",
            margin: "auto",
            marginBottom: 1,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                {book.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Author: {book.author}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Topic: {book.topic}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                isbn: {book.isbn}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Location: {book.location}
              </Typography>
            </Stack>
            <Stack>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  color: calculatedTime <= 5 ? "red" : "inherit",
                }}
              >
                {calculatedTime < 0
                  ? "Expired by: " + Math.abs(calculatedTime) + " day(s)"
                  : "Expiring in: " + calculatedTime + " day(s)"}
              </Typography>
            </Stack>
            <Stack marginY={5} justifyContent="space-between">
              <Button
                sx={userPageReturnButton}
                variant="contained"
                onClick={async () => {
                  if (window.confirm("Do you want to RETURN this book?")) {
                    let message = "Returning succeeded";
                    await fetchReturnBorrowed(borrowed.id)
                      .then((res) => {
                        if (!res.ok) {
                          message = "Returning failed";
                        }
                      })
                      .then(() =>
                        setPopUpConfirmationOpen({
                          ok: true,
                          message: message,
                        })
                      );
                    await context?.fetchBorrows();
                  }
                }}
              >
                Return
              </Button>
            </Stack>
          </Stack>
        </Paper>
      );
    }
    return renderedBooks;
  };

  return (
    <>
      {/* Pop up element */}
      <Snackbar
        open={popUpConfirmation.ok}
        autoHideDuration={4000}
        onClose={handleClosePopUpConfirmation}
        message={popUpConfirmation.message}
        action={action}
      />
      {/* Pop up element */}
      <Box sx={{ marginTop: 5, marginBottom: 5, position: "relative" }}>
        <Tooltip title="Back">
          <Fab
            aria-label="back"
            sx={userPageBackButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </Fab>
        </Tooltip>

        {renderBorrowedBooks()}
      </Box>
    </>
  );
};

export default MyAccount;
