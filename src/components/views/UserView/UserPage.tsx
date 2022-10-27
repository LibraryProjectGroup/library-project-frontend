import React, { useState, FC, useContext, useEffect } from "react";
import { Paper, Typography, Button, Stack, Fab } from "@mui/material";
import { TheContext } from "../../../TheContext";
import { fetchCurrentBorrows } from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { convertToObject } from "typescript";
import { userPageReturnButton, userPageBackButton } from "../../../sxStyles";

interface IProps {
  setUserPageVisible: Function;
  books: Array<Book>;
}

const MyAccount: FC<IProps> = ({
  setUserPageVisible,
  books
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
                onClick={() => {}}
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
