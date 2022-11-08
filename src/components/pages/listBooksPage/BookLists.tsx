import * as React from "react";
import { FC, useState, useEffect } from "react";
import {
    Popover,
    Box,
    Button,
    Typography,
    TextField,
    Stack,
    List,
    ListItem
} from "@mui/material";
import {
    editBookBox,
    editBookUpdateButton,
    editBookCancelButton,
    listBooksFavoriteButton as favButton
} from "../../../sxStyles";
import Book from "../../../interfaces/book.interface";
import Book_list from "../../../interfaces/book_list.interface";
import {
    fetchAllBooks,
    fetchUserBooklists,
    fetchCreateBooklist
} from "../../../fetchFunctions";

const BookLists: FC = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const [books, setBooks] = useState<Book[]>([]);
    const [booklists, setBooklists] = useState<Book_list[]>([]);
    const [message, setMessage] = useState("");

    const fetchBooks = async () => setBooks(await fetchAllBooks());
    const fetchBooklists = async () => setBooklists(await fetchUserBooklists());

    useEffect(() => {
        fetchBooks();
        fetchBooklists();
    }, []);

    const renderBooklists = () => {
        let booklist = [];
        for (const list of booklists) {
            const lists = booklists[list.id];
            if (!lists) {
                setMessage("No lists yet, create a new one!");
                booklist.push(
                    // button and input field to create new booklist
                    <Box>
                        <TextField label="Title" name="title" />
                        <Button>Add</Button>
                    </Box>
                );
            } else {
                //names of lists with checkboxes and a button to save book to selected list
                setMessage("Add to list...");
                booklist.push(<ListItem>{lists.name}</ListItem>);
            }
        }
        return booklist;
    };

    return (
        <div>
            <Button size="small" sx={favButton} onClick={handleClick}>
                + add
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ textAlign: "center" }}>
                        {message}
                    </Typography>
                    <List>
                        The content of the Popover.
                        {renderBooklists()}
                    </List>
                </Box>
            </Popover>
        </div>
    );
};

export default BookLists;
