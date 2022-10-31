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
import { Routes, Route, BrowserRouter, Outlet, Link } from "react-router-dom";

function App() {
  const [exampleBook, setExampleBook] = useState<Book | undefined>(undefined);
  const [books, setBooks] = useState<Array<Book>>([]);
  const [addBookFormVisible, setAddBookFormVisible] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [editBookFormVisible, setEditBookFormVisible] =
    useState<boolean>(false);
  const [userPageVisible, setUserPageVisible] = useState<boolean>(false);
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined);
  const [registerFormVisible, setRegisterFormVisible] = useState(false);

  useEffect(() => {
    fetchAllBooks(setBooks);
  }, [logged]);

  useEffect(() => {
    if (bookToEdit) {
      setEditBookFormVisible(true);
    }
  }, [bookToEdit]);

  const Layout = () => {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </>
    );
  };

  return (
    /* Container component messes up with the margins and/or paddings, pushing
      all components to the right and leaving a big empty space on the left. For
      now it can be fixed by replacing with div*/
    <TheContextProvider>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/login"
                element={
                  <Login
                    setLogged={setLogged}
                    setRegisterFormVisible={setRegisterFormVisible}
                  />
                }
              />
              <Route
                path="/create-account"
                element={
                  <CreateAccount
                    setLogged={setLogged}
                    setRegisterFormVisible={setRegisterFormVisible}
                  />
                }
              />
              <Route
                path="/list-books"
                element={
                  <ListBooks
                    books={undefined}
                    setBooks={setBooks}
                    setBookToEdit={setBookToEdit}
                    setEditBookFormVisible={setEditBookFormVisible}
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </TheContextProvider>
  );
}

export default App;
