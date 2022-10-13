import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Fab, CssBaseline } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Book from "./interfaces/book.interface";
import ContextData from "./interfaces/ContextData.interface";
import AddBook from "./components/AddBook";
import ListBooks from "./components/ListBooks";
import EditBook from "./components/EditBook";
import LoginPage from "./Auth/LoginPage";
import CreateAccount from "./components/CreateAccount";
import TheContextProvider from "./TheContext";
import { fetchAllBooks } from "./fetchFunctions";

function App() {
  const [exampleBook, setExampleBook] = useState<Book | undefined>(undefined);
  const [books, setBooks] = useState<Array<Book> | undefined>(undefined);
  const [addBookFormVisible, setAddBookFormVisible] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [editBookFormVisible, setEditBookFormVisible] =
    useState<boolean>(false);
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined);

  useEffect(() => {
    fetchAllBooks(setBooks);
  }, [logged]);

  useEffect(() => {
    if (bookToEdit) {
      setEditBookFormVisible(true);
    }
  }, [bookToEdit]);

  function renderExampleBookData() {
    return (
      <div style={{ border: "solid saddlebrown 2px" }}>
        <p>Loaned to: {exampleBook?.owner}</p>
        <p>Title: {exampleBook?.title}</p>
        <p>Author: {exampleBook?.author}</p>
        <p>Topic: {exampleBook?.topic}</p>
        <p>ISBN: {exampleBook?.isbn}</p>
        <p>Location: {exampleBook?.location}</p>
      </div>
    );
  }

  return (
    /* Container component messes up with the margins and/or paddings, pushing
      all components to the right and leaving a big empty space on the left. For
      now it can be fixed by replacing with div*/
    <TheContextProvider>
      <div>
        <CssBaseline />
        {exampleBook && renderExampleBookData()}
        {logged && (
          <div>
            <ListBooks
              books={books}
              setBooks={setBooks}
              setBookToEdit={setBookToEdit}
              setEditBookFormVisible={setEditBookFormVisible}
            />
            <Fab
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: "2rem",
                left: "2rem",
                backgroundColor: "#FFD100",
                color: "black",
                "&:hover": {
                  backgroundColor: "#FFB500",
                },
              }}
              onClick={() => {
                setAddBookFormVisible(true);
              }}
            >
              <AddIcon />
            </Fab>
          </div>
        )}
        {editBookFormVisible && (
          <EditBook
            setEditBookFormVisible={setEditBookFormVisible}
            bookToEdit={bookToEdit}
            editBookFormVisible={editBookFormVisible}
            setBooks={setBooks}
          ></EditBook>
        )}
        {addBookFormVisible && (
          <AddBook
            addBookFormVisible={addBookFormVisible}
            setAddBookFormVisible={setAddBookFormVisible}
            setBooks={setBooks}
          ></AddBook>
        )}
        {!logged && <LoginPage logged={logged} setLogged={setLogged} />}
      </div>
    </TheContextProvider>
  );
}

export default App;
