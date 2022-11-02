import { useState, FC, useContext, useEffect } from "react";
import { Paper, Typography, Button, Stack, Fab } from "@mui/material";
import { TheContext } from "../../../TheContext";
import { useNavigate } from "react-router-dom";
import {
  fetchCurrentBorrows,
  fetchReturnBorrowedBook,
  fetchAllBooks2
} from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { userPageReturnButton, userPageBackButton } from "../../../sxStyles";
import { endSession } from "../../../auth";

const MyAccount: FC = (): JSX.Element => {
  const [books, setBooks] = useState<any>([]);
  const [borrows, setBorrows] = useState<any>([]);
  const [userBorrowBookIds, setUserBorrowBookIds] = useState<any>([]);

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const initBooks = async () => {
    const tmpBooks = await fetchAllBooks2();
    setBooks(tmpBooks);
  };

  const fetchBorrows = async (username: string) => {
    const borrowsTmp = await fetchCurrentBorrows(username);
    setBorrows(borrowsTmp);
  };

  const sortUserBorrowBookIds = () => {
    let userBorrowsTmp: any = [];
    for (let i = 0; i < borrows.length; i++) {
      userBorrowsTmp.push(borrows[i].book);
    }
    setUserBorrowBookIds(userBorrowsTmp);
  };
  useEffect(() => {
    initBooks();
    if (context?.username) {
      fetchBorrows(context.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (borrows.length > 0) {
      sortUserBorrowBookIds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [borrows]);

  const handleReturnOfBook = (book: Book) => {
    for (let i = 0; i < borrows.length; i++) {
      if (borrows[i].book === book.id) {
        fetchReturnBorrowedBook(borrows[i].id);
        break;
      }
    }
  };

  const renderBookData = (book: any) => {
    if (userBorrowBookIds.includes(book.id)) {
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
            <Stack marginY={1} justifyContent="space-between">
              <Button
                sx={userPageReturnButton}
                variant="contained"
                onClick={() => {
                  handleReturnOfBook(book);
                }}
              >
                Return
              </Button>
            </Stack>
          </Stack>
        </Paper>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div style={{ position: "absolute", right: 30 }}>
        <p>
          User: <b>{context?.username}</b>
        </p>
        <p>Currently loaning</p>
      </div>
      <Fab
        aria-label="back"
        sx={userPageBackButton}
        onClick={() => {
          navigate("/list-books");
        }}
      >
        <ArrowBackIcon />
      </Fab>
      <Fab
        aria-label="back"
        sx={userPageBackButton}
        onClick={() => {
          endSession();
          navigate("/login");
        }}
      >
        <LogoutIcon />
      </Fab>
      {userBorrowBookIds.length > 0 &&
        books?.map((book: Book) => renderBookData(book))}
    </div>
  );
};

export default MyAccount;
