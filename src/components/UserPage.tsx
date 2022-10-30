import React, { useState, FC, useContext, useEffect } from "react";
import { Paper, Typography, Button, Stack, Fab } from "@mui/material";
import { TheContext } from "../TheContext";
import { fetchCurrentBorrows, fetchReturnBorrowedBook } from "../fetchFunctions";
import Book from "../interfaces/book.interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { convertToObject } from "typescript";

interface IProps {
  setUserPageVisible: Function;
  books: Array<Book>;
}

const MyAccount: FC<IProps> = ({
  setUserPageVisible,
  books,
}: IProps): JSX.Element => {
  const [borrows, setBorrows] = useState<any>([]);
  const [userBorrowBookIds, setUserBorrowBookIds] = useState<any>([]);
  const context = useContext(TheContext);

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
      if(borrows[i].book === book.id){
        fetchReturnBorrowedBook(borrows[i].id);
        break;
      }
    }
  }

  const renderBookData = (book: any) => {
    if (userBorrowBookIds.includes(book.id)) {
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
                onClick={() => {handleReturnOfBook(book)}}
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
        sx={{
          position: "relative",
          top: 50,
          marginBottom: 10,
          marginLeft: 5,
          backgroundColor: "#FFD100",
          color: "black",
          "&:hover": {
            backgroundColor: "#FFB500",
          },
        }}
        onClick={() => {
          setUserPageVisible(false);
        }}
      >
        <ArrowBackIcon />
      </Fab>
      {userBorrowBookIds.length > 0 &&
        books?.map((book) => renderBookData(book))}
    </div>
  );
};

export default MyAccount;
