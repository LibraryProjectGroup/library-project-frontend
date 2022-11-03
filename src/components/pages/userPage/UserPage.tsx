import { useState, FC, useContext, useEffect } from "react";
import { Paper, Typography, Button, Stack, Fab } from "@mui/material";
import { TheContext } from "../../../TheContext";
import { useNavigate } from "react-router-dom";
import {
    fetchCurrentBorrows,
    fetchReturnBorrowed,
    fetchAllBooks
} from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { userPageReturnButton, userPageBackButton } from "../../../sxStyles";
import { endSession } from "../../../auth";
import Borrow from "../../../interfaces/borrow.interface";

const MyAccount: FC = (): JSX.Element => {
    const [books, setBooks] = useState<{ [key: number]: Book }>([]);
    const [borrows, setBorrows] = useState<Borrow[]>([]);

    const context = useContext(TheContext);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        const unsortedBooks = await fetchAllBooks();
        let sortedBooks = [];
        for (const book of unsortedBooks) {
            sortedBooks[book.id] = book;
        }
        setBooks(sortedBooks);
    };

    const fetchBorrows = async () => {
        setBorrows(await fetchCurrentBorrows());
    };

    useEffect(() => {
        fetchBooks();
        fetchBorrows();
    }, []);

    const renderBorrowedBooks = () => {
        let renderedBooks = [];
        for (const borrowed of borrows) {
            const book = books[borrowed.book];
            if (!book) continue;
            renderedBooks.push(
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
                                onClick={async () => {
                                    await fetchReturnBorrowed(borrowed.id);
                                    await fetchBorrows();
                                }}
                            >
                                Return
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            );
        }
        return renderedBooks;
    };

    return (
        <>
            <div style={{ position: "absolute", right: 30 }}>
                <p>
                    User: <b>{context?.user?.username}</b>
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
            {renderBorrowedBooks()}
        </>
    );
};

export default MyAccount;
