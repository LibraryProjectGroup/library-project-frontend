import React, { useState, FC, useEffect, useContext } from "react";
import { Paper, Typography, Button, Stack, Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import BookForm from "./BookForm";
import {
    fetchAllBooks,
    fetchDeleteBook,
    fetchAllCurrentBorrows,
    fetchCreateBorrow
} from "../../../fetchFunctions";
import {
    listBooksDeleteButton,
    listBooksEditButton,
    listBooksLoanButton,
    addBookAddButton as addButton
} from "../../../sxStyles";
import Borrow from "../../../interfaces/borrow.interface";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ListBooks: FC = (): JSX.Element => {
    const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const [formBook, setFormBook] = useState<Book | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formEditing, setFormEditing] = useState(false);
    const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
        ok: false,
        message: ""
    });

    const context = useContext(TheContext);
    const navigate = useNavigate();

    const fetchBooks = async () => setBooks(await fetchAllBooks());

    const fetchBorrows = async () =>
        setCurrentBorrows(await fetchAllCurrentBorrows());

    const bookInCurrentBorrows = (book: Book) => {
        let inCurrentBorrows = false;
        for (let i = 0; i < currentBorrows.length; i++) {
            if (currentBorrows[i].book === book.id) {
                inCurrentBorrows = true;
            }
        }
        return inCurrentBorrows;
    };

    const handleClosePopUpConfirmation = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setPopUpConfirmationOpen({
            ok: false,
            message: ""
        });
    };

    const action = (
        <React.Fragment>
            {/*! Undo functional for the future? */}
            {/* <Button
        color="secondary"
        size="small"
        onClick={handleClosePopUpConfirmation}
      >
        UNDO
      </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClosePopUpConfirmation}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    useEffect(() => {
        fetchBooks();
        fetchBorrows();
    }, []);

    const renderBookData = (book: Book) => {
        if (!book.deleted) {
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
                        <Stack
                            marginY={1}
                            justifyContent="start"
                            paddingLeft="2rem"
                        >
                            <Button
                                sx={listBooksDeleteButton}
                                variant="contained"
                                disabled={
                                    book.library_user !== context?.user?.id &&
                                    !context?.user?.administrator
                                }
                                color="error"
                                onClick={async () => {
                                    const response = await fetchDeleteBook(
                                        book.id
                                    );
                                    if (response.ok) fetchBooks();
                                }}
                            >
                                Delete book
                            </Button>
                            <Button
                                sx={listBooksEditButton}
                                variant="contained"
                                disabled={
                                    book.library_user !== context?.user?.id &&
                                    !context?.user?.administrator
                                }
                                onClick={() => {
                                    setFormEditing(true);
                                    setFormBook(book);
                                    setFormVisible(true);
                                }}
                            >
                                Edit book
                            </Button>
                            <Button
                                sx={listBooksLoanButton}
                                variant="contained"
                                disabled={bookInCurrentBorrows(book)}
                                onClick={async () => {
                                    if (
                                        window.confirm(
                                            "Do you want to LOAN this book?"
                                        )
                                    ) {
                                        let message = "Loaning succeeded";
                                        await fetchCreateBorrow(book.id)
                                            .then((res) => {
                                                if (!res.ok) {
                                                    message = "Loaning failed";
                                                }
                                            })
                                            .then(() =>
                                                setPopUpConfirmationOpen({
                                                    ok: true,
                                                    message: message
                                                })
                                            );
                                        await fetchBooks();
                                        await fetchBorrows();
                                    }
                                }}
                            >
                                LOAN
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            );
        }
    };

    return (
        <>
            {/* Pop up element */}
            <Snackbar
                open={popUpConfirmation.ok}
                autoHideDuration={4000}
                onClose={handleClosePopUpConfirmation}
                message={popUpConfirmation.message}
                action={action}
            />
            {/* Pop up element */}
            <Box sx={{ marginTop: 5, marginBottom: 5 }}>
                <Fab
                    aria-label="account"
                    sx={addButton}
                    onClick={() => {
                        navigate("/user");
                    }}
                >
                    <AccountBoxIcon />
                </Fab>
                {context?.user?.administrator && (
                    <Fab
                        aria-label="add"
                        sx={addButton}
                        onClick={() => {
                            navigate("/admin");
                        }}
                    >
                        <AdminPanelSettingsIcon />
                    </Fab>
                )}
                <Stack spacing={3} sx={{ margin: "auto", width: "60%" }}>
                    {books?.map((book) => renderBookData(book))}
                </Stack>
                <Fab
                    aria-label="add"
                    sx={addButton}
                    onClick={() => {
                        setFormEditing(false);
                        setFormBook({
                            id: -1, // This wont get used
                            title: "",
                            author: "",
                            topic: "",
                            isbn: "",
                            location: "",
                            deleted: false
                        });
                        setFormVisible(true);
                    }}
                >
                    <AddIcon />
                </Fab>
                <BookForm
                    visible={formVisible}
                    setVisible={setFormVisible}
                    book={formBook}
                    setBook={setFormBook}
                    editing={formEditing}
                    updateBooks={fetchBooks}
                />
            </Box>
        </>
    );
};

export default ListBooks;
