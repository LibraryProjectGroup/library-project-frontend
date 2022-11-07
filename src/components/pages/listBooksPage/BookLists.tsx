import * as React from "react";
import { FC, useState, useEffect } from "react";
import {
    Popover,
    Box,
    Button,
    Typography,
    TextField,
    Stack
} from "@mui/material";
import {
    editBookBox,
    editBookUpdateButton,
    editBookCancelButton,
    listBooksFavoriteButton as favButton
} from "../../../sxStyles";
import Book from "../../../interfaces/book.interface";
import Book_list from "../../../interfaces/book_list.interface";
import { fetchAllBooks, fetchUserBooklists } from "../../../fetchFunctions";

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

    const fetchBooks = async () => setBooks(await fetchAllBooks());
    const fetchBooklists = async () => setBooklists(await fetchUserBooklists());

    //add fetch for booklists

    useEffect(() => {
        fetchBooks();
        fetchBooklists();
    }, []);

    const renderBooklists = () => {
        let booklist = [];
        for (const list of booklists) {
            const lists = booklists[list.id];
            if (!lists) {
                booklist.push(
                    // button and input field to create new booklist
                    <Typography>No lists, create a new one!</Typography>
                );
            } else {
                //names of lists with checkboxes and a button to save book to selected list
                booklist.push(<Typography>{lists.name}</Typography>);
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
                <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                    {renderBooklists()}
                </Typography>
            </Popover>
        </div>
    );
};

export default BookLists;
