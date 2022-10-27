import React, { useState, FC, useEffect, useContext } from "react";
import { Paper, Typography, Button, Stack, Box } from "@mui/material";
import { TheContext } from "../TheContext";
import Book from "../interfaces/book.interface";
import BACKEND_URL from "../backendUrl";
import { right } from "@popperjs/core";
import {
  fetchAllBooks,
  fetchAllCurrentBorrows,
  fetchLoanBook
} from "../fetchFunctions";
import {
  listBooksDeleteButton,
  listBooksEditButton,
  listBooksLoanButton
} from "../sxStyles";

interface IProps {
  books: Array<Book> | undefined;
  setBooks: Function;
  setBookToEdit: Function;
  setEditBookFormVisible: Function;
}

const ListBooks: FC<IProps> = ({
  books,
  setBooks,
  setBookToEdit,
  setEditBookFormVisible
}: IProps): JSX.Element => {
  const [currentBorrows, setCurrentBorrows] = useState<any[]>([]);
  const context = useContext(TheContext);

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

  useEffect(() => {
    fetchAndSetCurrentBorrows();
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
                fetch(`${BACKEND_URL}/book?id=${book.id}`, {
                  method: "DELETE"
                }).then((response) => {
                  if (response.ok) {
                    fetchAllBooks(setBooks);
                  } else {
                    // handle !response
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
                fetchLoanBook(context?.username, book);
                fetchAllBooks(setBooks);
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
      <Stack spacing={3} sx={{ margin: "auto", width: "60%" }}>
        {books?.map((book) => renderBookData(book))}
      </Stack>
    </Box>
  );
};

export default ListBooks;
