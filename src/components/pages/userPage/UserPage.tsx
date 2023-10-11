import React, { useState, FC, useContext, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Fab,
  Box,
  Container,
} from "@mui/material";
import { TheContext } from "../../../TheContext";
import { useNavigate } from "react-router-dom";
import { fetchReturnBorrowed, fetchAllBooks } from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { userPageReturnButton, userPageBackButton } from "../../../sxStyles";
import ReturnBook from "./ReturnBook";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToastContainers from "../../../ToastContainers";
import OfficeSpan from "../../OfficeSpan";

const MyAccount: FC = (): JSX.Element => {
  const [books, setBooks] = useState<{ [key: number]: Book }>([]);
  const [borrowedId, setBorrowedId] = useState<number>(0);

  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: "",
  });

  const [returnVisible, setReturnVisible] = useState(false);
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

  const returnPopup = async (BookId: React.SetStateAction<number>) => {
    setBorrowedId(BookId);
    setReturnVisible(true);
  };

  useEffect(() => {
    fetchBooks();
    context?.fetchBorrows();
  }, []);

  const renderBorrowedBooks = () => {
    let renderedBooks = [];
    const borrowsData = context?.borrows;
    if (borrowsData?.length === 0 || !borrowsData) {
      return <NoLoansMessage />;
    }
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
              <img alt="Book cover" width={120} height={160} src={book.image} />
            </Stack>
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
                Year: {book.year}
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
                ISBN: {book.isbn}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Office:{" "}
                <OfficeSpan
                  countryCode={book.homeOfficeCountry}
                  officeName={book.homeOfficeName}
                />
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
                  returnPopup(borrowed.id);
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
      <ReturnBook
        visible={returnVisible}
        setVisible={setReturnVisible}
        borrowedId={borrowedId}
        fetchReturnBorrowed={fetchReturnBorrowed}
      />
      <ToastContainers />
      {/* Pop up element */}
      <Box sx={{ marginTop: 5, marginBottom: 5, position: "relative" }}>
        <Container
          sx={{
            position: { sm: "none", md: "absolute" },
            display: "flex",
            flexDirection: { sm: "row", md: "column" },
            gap: { xs: "2rem", md: "unset" },
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Fab
            aria-label="back"
            sx={userPageBackButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </Fab>
        </Container>

        {renderBorrowedBooks()}
      </Box>
    </>
  );
};

const NoLoansMessage: FC = () => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Merriweather",
          fontWeight: "light",
          fontSize: 25,
        }}
      >
        You have no current loans
      </Typography>
    </div>
  );
};

export default MyAccount;
