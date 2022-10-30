import { useEffect, useState } from "react";
import { Fab, CssBaseline } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Book from "./interfaces/book.interface";
import AddBook from "./components/views/ListBooksPage/AddBookForm";
import ListBooks from "./components/views/ListBooksPage/ListBooks";
import EditBook from "./components/views/ListBooksPage/EditBookForm";
import LoginPage from "./components/views/LoginPage/LoginPage";
import UserPage from "./components/views/UserPage/UserPage";
import TheContextProvider from "./TheContext";
import { fetchAllBooks } from "./fetchFunctions";

function App() {
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

  return (
    /* Container component messes up with the margins and/or paddings, pushing
      all components to the right and leaving a big empty space on the left. For
      now it can be fixed by replacing with div*/
    <TheContextProvider>
      <div>
        {logged && !userPageVisible && (
          <Fab
            aria-label="account"
            sx={{
              position: "relative",
              top: 50,
              marginBottom: 10,
              marginLeft: 5,
              backgroundColor: "#FFD100",
              color: "black",
              "&:hover": {
                backgroundColor: "#FFB500"
              }
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
              marginLeft: 5,
              backgroundColor: "#FFD100",
              color: "black",
              "&:hover": {
                backgroundColor: "#FFB500"
              }
            }}
            onClick={() => {
              setAddBookFormVisible(true);
            }}
          >
            <AddIcon />
          </Fab>
        )}
        {!logged && <LoginPage logged={logged} setLogged={setLogged} />}
      </div>
    </TheContextProvider>
  );
}

export default App;
