import React, { useState, FC, useEffect, useContext, Fragment } from "react";
import { Paper, Typography, Button, Stack, Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import BookForm from "./BookForm";
import UserListPopup from "./UserListPopup";
import {
    fetchAllBooks,
    fetchDeleteBook,
    fetchAllCurrentBorrows,
    fetchCreateBorrow,
    fetchCurrentBorrows,
    fetchAddBookReservation,
    fetchAllBookReservations,
    fetchCancelBookReservation,
    fetchLoanBookReservation,
    fetchAllReservedBooks
} from "../../../fetchFunctions";
import {
    listBooksDeleteButton,
    listBooksEditButton,
    listBooksLoanButton,
    addBookAddButton as addButton,
    listBooksFavoriteButton as favButton
} from "../../../sxStyles";
import Borrow from "../../../interfaces/borrow.interface";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import BookRequestForm from "./BookRequestForm";

const ListBooks: FC = (): JSX.Element => {
    const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
    const [userBorrows, setUserBorrows] = useState<Borrow[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const [requestVisible, setRequestVisible] = useState(false);

    const [formBook, setFormBook] = useState<Book | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formEditing, setFormEditing] = useState(false);
    const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
        ok: false,
        message: ""
    });

    const [open, setOpen] = useState<"none" | "expiring" | "expired">("none");

    const context = useContext(TheContext);
    const navigate = useNavigate();

    const fetchBooks = async () => setBooks(await fetchAllBooks());

    const fetchBorrows = async () =>
        setCurrentBorrows(await fetchAllCurrentBorrows());

    const fetchUserBorrows = async () => {
        setUserBorrows(await fetchCurrentBorrows());
    };

    const bookInCurrentBorrows = (book: Book) => {
        let inCurrentBorrows = false;
        for (let i = 0; i < currentBorrows.length; i++) {
            if (currentBorrows[i].book === book.id) {
                inCurrentBorrows = true;
            }
        }
        return inCurrentBorrows;
    };
    const handleOpen = () => {
        for (const borrowed of userBorrows) {
            const currentDate = new Date();
            const datedDueDate = new Date(borrowed.dueDate);
            const convertToDay = 24 * 60 * 60 * 1000;
            const calculatedTime = Math.floor(
                (datedDueDate.getTime() - currentDate.getTime()) / convertToDay
            );
            if (calculatedTime < 0) {
                setOpen("expired");
                break;
            }

            if (
                calculatedTime >= 0 &&
                calculatedTime < 5 &&
                open !== "expired"
            ) {
                setOpen("expiring");
            }
        }
    };

    const handleClose = () => {
        setOpen("none");
    };

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

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

    const action_2 = (
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
        fetchUserBorrows();
    }, []);

    // eslint-disable-next-line
    useEffect(handleOpen, [userBorrows]);

    const renderBookData = (book: Book) => {
        if (!book.deleted) {
            return (
                <Paper elevation={10} sx={{ padding: "2rem" }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack sx={{ alignSelf: "center" }}>
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontWeight: "bold",
                                    marginBottom: 2
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
                            <UserListPopup book={book} />
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
                action={action_2}
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
                {
                context?.user?.administrator ?
                    <Fab
                        aria-label="admin"
                        sx={addButton}
                        onClick={() => {
                            navigate("/admin");
                        }}
                    >
                        <AdminPanelSettingsIcon />
                    </Fab>
                    : <></>
                }
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
                <Fab
                    sx={addButton}
                    onClick={() => {
                        setRequestVisible(true);
                    }}
                >
                    <AddCommentIcon />
                </Fab>
                <BookRequestForm
                    visible={requestVisible}
                    setVisible={setRequestVisible}
                />
                <Snackbar
                    open={open === "expiring"}
                    action={action}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="warning"
                        sx={{ width: "100%" }}
                        variant="filled"
                    >
                        You have expiring book(s)
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={open === "expired"}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        severity="error"
                        sx={{ width: "100%" }}
                        variant="filled"
                    >
                        YOU HAVE EXPIRED BOOK(S)
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default ListBooks;
