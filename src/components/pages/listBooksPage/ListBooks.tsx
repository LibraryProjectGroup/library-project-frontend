import React, { useState, FC, useEffect, useContext } from "react";
import { Paper, Typography, Button, Stack, Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import BACKEND_URL from "../../../backendUrl";
import AddBook from "./AddBookForm";
import EditBook from "./EditBookForm";
import {
  fetchAllBooks,
  fetchAllCurrentBorrows,
  fetchLoanBook
} from "../../../fetchFunctions";
import {
  listBooksDeleteButton,
  listBooksEditButton,
  listBooksLoanButton,
  addBookAddButton as addButton
} from "../../../sxStyles";
import { checkPrimeSync } from "crypto";
import { Navigate } from "react-router-dom";
import { authFetch } from "../../../auth";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { log } from "console";

const ListBooks: FC = (): JSX.Element => {
  const [currentBorrows, setCurrentBorrows] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [editBookFormVisible, setEditBookFormVisible] = useState(false);
  const [addBookFormVisible, setAddBookFormVisible] = useState(false);
  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: ""
  });

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const initBooks = async () => {
    const tmpBooks = await fetchAllBooks();
    setBooks(tmpBooks);
  };

  const fetchAndSetCurrentBorrows = async () => {
    const currentBorrowsTmp = await fetchAllCurrentBorrows();
    setCurrentBorrows(currentBorrowsTmp);
  };

  const bookInCurrentBorrows = (book: Book) => {
    let inCurrentBorrows = false;
    for (let i = 0; i < currentBorrows.length; i++) {
      if (currentBorrows[i].book === book.id) {
        inCurrentBorrows = true;
      }
    }
    return inCurrentBorrows;
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
      message: ""
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
    initBooks();
    fetchAndSetCurrentBorrows();
    console.log(context?.username);
    console.log(context?.admin);
    console.log(context?.userId);
  }, []);

  const renderBookData = (book: Book) => {
    return (
      <Paper elevation={10} sx={{ padding: "2rem" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold"
              }}
            >
              {book.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Merriweather",
                fontWeight: "light"
              }}
            >
              Author: {book.author}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Merriweather",
                fontWeight: "light"
              }}
            >
              Topic: {book.topic}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Merriweather",
                fontWeight: "light"
              }}
            >
              isbn: {book.isbn}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Merriweather",
                fontWeight: "light"
              }}
            >
              Location: {book.location}
            </Typography>
          </Stack>
          <Stack marginY={1} justifyContent="start" paddingLeft="2rem">
            <Button
              sx={listBooksDeleteButton}
              variant="contained"
              color="error"
              onClick={() => {
                authFetch(`/book?id=${book.id}`, {
                  method: "DELETE"
                }).then((response) => {
                  if (response.ok) {
                    initBooks();
                  } else {
                    console.log(response);
                  }
                });
              }}
            >
              Delete book
            </Button>
            <Button
              sx={listBooksEditButton}
              variant="contained"
              onClick={() => {
                setBookToEdit(book);
                setEditBookFormVisible(true);
              }}
            >
              Edit book
            </Button>
            <Button
              sx={listBooksLoanButton}
              variant="contained"
              disabled={bookInCurrentBorrows(book) ? true : false}
              onClick={() => {
                let message = "Loaning succeeded";
                fetchLoanBook(context?.username, book)
                  .then((res) => {
                    if (!res.ok) {
                      message = "Loaning failed";
                    }
                  })
                  .then(() =>
                    setPopUpConfirmationOpen({ ok: true, message: message })
                  );
                initBooks();
              }}
            >
              LOAN
            </Button>
          </Stack>
        </Stack>
      </Paper>
    );
  };

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
      {/* Pop up element */}
      <Snackbar
        open={popUpConfirmation.ok}
        autoHideDuration={4000}
        onClose={handleClosePopUpConfirmation}
        message={popUpConfirmation.message}
        action={action}
      />
      {/* Pop up element */}
      <Fab
        aria-label="account"
        sx={addButton}
        onClick={() => {
          navigate("/user");
        }}
      >
        <AccountBoxIcon />
      </Fab>
      {context?.admin && (
        <Fab
          aria-label="add"
          sx={addButton}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <AdminPanelSettingsIcon />
        </Fab>
      )}
      <Stack spacing={3} sx={{ margin: "auto", width: "60%" }}>
        {books?.map((book) => renderBookData(book))}
      </Stack>
      <Fab
        aria-label="add"
        sx={addButton}
        onClick={() => {
          setAddBookFormVisible(true);
        }}
      >
        <AddIcon />
      </Fab>
      {addBookFormVisible && (
        <AddBook
          addBookFormVisible={addBookFormVisible}
          setAddBookFormVisible={setAddBookFormVisible}
          setBooks={setBooks}
        />
      )}
      {editBookFormVisible && (
        <EditBook
          editBookFormVisible={editBookFormVisible}
          setEditBookFormVisible={setEditBookFormVisible}
          bookToEdit={bookToEdit}
          setBooks={setBooks}
        />
      )}
    </Box>
  );
};

export default ListBooks;
