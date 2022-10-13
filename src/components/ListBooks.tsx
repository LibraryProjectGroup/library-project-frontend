import React, { useState, FC, useEffect, useContext } from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import { TheContext } from "../TheContext";
import Book from "../interfaces/book.interface";
import BACKEND_URL from "../backendUrl";
import { right } from "@popperjs/core";
import {
  fetchAllBooks,
  fetchAllCurrentBorrows,
  fetchLoanBook,
} from "../fetchFunctions";

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
  setEditBookFormVisible,
}: IProps): JSX.Element => {
  const [currentBorrows, setCurrentBorrows] = useState<any[]>([]);
  const context = useContext(TheContext);

  const fetchAndSetCurrentBorrows = async () => {
    const currentBorrowsTmp = await fetchAllCurrentBorrows();
    setCurrentBorrows(currentBorrowsTmp);
  };
  const bookInCurrentBorrows = (book: Book) => {
    console.log("current book: ");
    console.log(book);
    let inCurrentBorrows = false;
    for (let i = 0; i < currentBorrows.length; i++) {
      console.log("LOOP");
      if (currentBorrows[i].book == book.id) {
        inCurrentBorrows = true;
      }
    }
    console.log("in current borrows:");
    console.log(inCurrentBorrows);
    return inCurrentBorrows;
  };
  useEffect(() => {
    fetchAndSetCurrentBorrows();
  }, []);
  useEffect(() => {
    console.log("current borrows");
    console.log(currentBorrows);
    console.log("books:");
    console.log(books);
  }, [currentBorrows]);

  const renderBookData = (book: Book) => {
    return (
      <Paper elevation={10} sx={{ padding: "2rem" }}>
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
              color="error"
              onClick={() => {
                fetch(`${BACKEND_URL}/book?id=${book.id}`, {
                  method: "DELETE",
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
              onClick={() => {
                setBookToEdit(book);
                setEditBookFormVisible(true);
              }}
            >
              Edit book
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
    <Stack spacing={3} sx={{ marginTop: "1rem" }}>
      {books?.map((book) => renderBookData(book))}
    </Stack>
  );
};

export default ListBooks;
