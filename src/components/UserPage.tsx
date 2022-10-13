import React, { useState, FC, useContext, useEffect } from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import { TheContext } from "../TheContext";
import { fetchCurrentBorrows } from "../fetchFunctions";
import Book from "../interfaces/book.interface";
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
      console.log(borrows[i].id);
      userBorrowsTmp.push(borrows[i].book);
    }
    setUserBorrowBookIds(userBorrowsTmp);
  };
  useEffect(() => {
    if (context?.username) {
      console.log("CONTEXT");
      console.log(context.username);
      fetchBorrows(context.username);
    }
  }, []);

  useEffect(() => {
    if (borrows.length > 0) {
      sortUserBorrowBookIds();
    }
  }, [borrows]);

  const renderBookData = (book: any) => {
    console.log("RENDER");
    console.log(userBorrowBookIds);
    console.log(book.id);
    console.log(userBorrowBookIds.includes(book.id));
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
    <Stack spacing={3} sx={{ marginTop: "1rem" }}>
      {userBorrowBookIds.length > 0 &&
        books?.map((book) => renderBookData(book))}
    </Stack>
  );
};

export default MyAccount;
