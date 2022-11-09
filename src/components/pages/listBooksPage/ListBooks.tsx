import { useState, FC, useEffect, useContext, Fragment } from "react";
import { Paper, Typography, Button, Stack, Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import BookForm from "./BookForm";
import {
    fetchAllBooks,
    fetchDeleteBook,
    fetchAllCurrentBorrows,
    fetchCreateBorrow,
    fetchCurrentBorrows
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
import Alert from "@mui/material/Alert";
import Book_request from "../../../interfaces/book_request.interface";
import BookRequestForm from "./BookRequestForm";

const ListBooks: FC = (): JSX.Element => {
    const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
    const [userBorrows, setUserBorrows] = useState<Borrow[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const [requestVisible, setRequestVisible] = useState(false);

    const [formBook, setFormBook] = useState<Book | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formEditing, setFormEditing] = useState(false);

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
    //-------------------------------------------
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
                open != "expired"
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

    useEffect(() => {
        fetchBooks();
        fetchBorrows();
        fetchUserBorrows();
    }, []);

    useEffect(() => {
        handleOpen();
    }, [userBorrows]);

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
                                    await fetchCreateBorrow(book.id);
                                    await fetchBooks();
                                    await fetchBorrows();
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
            <Snackbar open={open == "expiring"} action={action}>
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    You have expiring book(s)
                </Alert>
            </Snackbar>
            <Snackbar open={open == "expired"}>
                <Alert severity="error" sx={{ width: "100%" }} variant="filled">
                    YOU HAVE EXPIRED BOOK(S)
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ListBooks;
