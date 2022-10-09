import React, { useState, FC, useEffect, useContext } from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import Book from "../interfaces/book.interface";
import BACKEND_URL from "../backendUrl";
import { fetchAllBooks } from "../fetchFunctions";
import { TheContext } from "../TheContext";

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
  useEffect(() => {
    fetchAllBooks(setBooks);
  }, []);

  const context = useContext(TheContext);

  const renderBookData = (book: Book) => {
    return (
      <Paper elevation={3} sx={{ padding: "1rem" }}>
        <Typography>Title: {book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>Topic: {book.topic}</Typography>
        <Typography>isbn: {book.isbn}</Typography>
        <Typography>Location: {book.location}</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              fetch(`${BACKEND_URL}/book?id=${book.id}`, {
                method: "DELETE",
                credentials: "include",
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
            variant="contained"
            onClick={() => {
              setBookToEdit(book);
              setEditBookFormVisible(true);
            }}
          >
            Edit book
          </Button>
        </Stack>
      </Paper>
    );
  };

  return (
    <Stack spacing={3} sx={{ marginTop: "1rem" }}>
      <p>username:{context?.username}</p>
      {books?.map((book) => renderBookData(book))}
    </Stack>
  );
};

export default ListBooks;
