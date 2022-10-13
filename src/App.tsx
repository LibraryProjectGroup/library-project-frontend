import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Button,
  Fab,
  CssBaseline,
  bottomNavigationActionClasses,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Book from "./interfaces/book.interface";
import ContextData from "./interfaces/ContextData.interface";
import AddBook from "./components/AddBook";
import ListBooks from "./components/ListBooks";
import EditBook from "./components/EditBook";
import LoginPage from "./Auth/LoginPage";
import CreateAccount from "./components/CreateAccount";
import UserPage from "./components/UserPage";
import TheContextProvider from "./TheContext";
import { fetchAllBooks } from "./fetchFunctions";

function App() {
  const [exampleBook, setExampleBook] = useState<Book | undefined>(undefined);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [addBookFormVisible, setAddBookFormVisible] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [editBookFormVisible, setEditBookFormVisible] =
    useState<boolean>(false);
  const [userPageVisible, setUserPageVisible] = useState<boolean>(false);
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
      <Container>
        {logged && !userPageVisible && (
          <Fab
            aria-label="account"
            sx={{
              position: "relative",
              top: 50,
              marginBottom: 10,
              backgroundColor: "#FFD100",
              color: "black",
              "&:hover": {
                backgroundColor: "#FFB500",
              },
            }}
            onClick={() => {
              setUserPageVisible(true);
            }}
          >
            <AccountBoxIcon />
          </Fab>
        )}
        <CssBaseline />
        {logged && !userPageVisible && (
          <div>
            <ListBooks
              books={books}
              setBooks={setBooks}
              setBookToEdit={setBookToEdit}
              setEditBookFormVisible={setEditBookFormVisible}
            />
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
        {userPageVisible && (
          <UserPage
            setUserPageVisible={setUserPageVisible}
            books={books}
          ></UserPage>
        )}
        {logged && !userPageVisible && (
          <Fab
            aria-label="add"
            sx={{
              position: "relative",
              top: 50,
              marginBottom: 10,
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
        )}
        {!logged && <LoginPage logged={logged} setLogged={setLogged} />}
      </Container>
    </TheContextProvider>
  );
}

export default App;
