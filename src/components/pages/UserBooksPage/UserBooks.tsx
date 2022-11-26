import * as React from "react";
import { FC, useState, useEffect, useContext } from "react";
import Book_list from "../../../interfaces/book_list.interface";
import Book from "../../../interfaces/book.interface";
import Book_list_entry from "../../../interfaces/book_list_entry.interface";
import { useNavigate, useParams } from "react-router-dom";
import { TheContext } from "../../../TheContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Paper,
    Typography,
    Button,
    Stack,
    Fab,
    Card,
    CardActionArea
} from "@mui/material";
import {
    fetchBook,
    fetchAllBooks,
    fetchAllEntries,
    fetchDeleteEntry,
    fetchEntry,
    fetchEntriesByList
} from "../../../fetchFunctions";
import { listBooksDeleteButton, userPageBackButton } from "../../../sxStyles";

const UserBooks: FC<{ booklist: Book_list; handleCloseList: Function }> = ({
    booklist,
    handleCloseList
}): JSX.Element => {
    const [books, setBooks] = useState<Book[]>([]);
    const [entries, setEntries] = useState<Book_list_entry[]>([]);
    const context = useContext(TheContext);
    const navigate = useNavigate();

    const fetchBooks = async () => setBooks(await fetchAllBooks());
    const fetchEntries = async (id: number) =>
        setEntries(await fetchEntriesByList(id));

    useEffect(() => {
        if (booklist.id !== -1) {
            fetchBooks();
            fetchEntries(booklist.id);
        }
    }, [booklist]);

    const renderEntriesInList = () => {
        let renderedBooks = [];
        for (const entry of entries) {
            for (const book of books) {
                if (book.id === entry.book) {
                    renderedBooks.push(
                        <Paper
                            elevation={10}
                            sx={{
                                padding: "2rem",
                                width: "60%",
                                margin: "auto",
                                marginBottom: 1
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
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
                                    <Stack marginY={1}>
                                        <Button
                                            sx={listBooksDeleteButton}
                                            variant="contained"
                                            onClick={async () => {
                                                await fetchDeleteEntry(
                                                    entry.id
                                                );
                                                await fetchEntries(booklist.id);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Paper>
                    );
                }
            }
        }
        return renderedBooks;
    };

    return (
        <>
            <div style={{ position: "absolute", right: 30 }}>
                <p>
                    User: <b>{context?.user?.username}</b>
                </p>
                <p>{booklist.name}</p>
            </div>
            <Fab
                aria-label="back"
                sx={userPageBackButton}
                onClick={() => handleCloseList()}
            >
                <ArrowBackIcon />
            </Fab>

            {renderEntriesInList()}
        </>
    );
};

export default UserBooks;
