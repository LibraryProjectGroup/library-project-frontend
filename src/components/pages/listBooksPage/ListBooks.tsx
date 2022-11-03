import { useState, FC, useEffect, useContext } from "react";
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

const ListBooks: FC = (): JSX.Element => {
    const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const [formBook, setFormBook] = useState<Book | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formEditing, setFormEditing] = useState(false);

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

    useEffect(() => {
        fetchBooks();
        fetchBorrows();
    }, []);

    const renderBookData = (book: Book) => {
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
                                book.library_user != context?.user?.id &&
                                !context?.user?.administrator
                            }
                            color="error"
                            onClick={async () => {
                                const response = await fetchDeleteBook(book.id);
                                if (response.ok) fetchBooks();
                            }}
                        >
                            Delete book
                        </Button>
                        <Button
                            sx={listBooksEditButton}
                            variant="contained"
                            disabled={
                                book.library_user != context?.user?.id &&
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
                        location: ""
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
    );
};

export default ListBooks;
