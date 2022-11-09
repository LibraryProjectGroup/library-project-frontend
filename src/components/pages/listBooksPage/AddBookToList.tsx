import * as React from "react";
import { FC, useState, useEffect } from "react";
import {
    Popover,
    Box,
    Button,
    Typography,
    List,
    ListItem,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { listBooksFavoriteButton as favButton } from "../../../sxStyles";
import Book from "../../../interfaces/book.interface";
import Book_list from "../../../interfaces/book_list.interface";
import Book_list_entry from "../../../interfaces/book_list_entry.interface";
import { fetchUserBooklists } from "../../../fetchFunctions";

const AddBookToList: FC = (): JSX.Element => {
    const [booklists, setBooklists] = useState<Book_list[]>([]);
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
    const fetchBooklists = async () => {
        setBooklists(await fetchUserBooklists());
    };

    useEffect(() => {
        if (Boolean(anchorEl) === true) {
            fetchBooklists();
        }
    }, [fetchBooklists]);

    const renderBooklists = () => {
        let booklist = [];
        for (const list of booklists) {
            if (!list) continue;
            booklist.push(
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={list.name}
                    />
                </FormGroup>
            );
        }

        return booklist;
    };

    {
        /*
    const renderBooklists = () => {
        let booklist = [];
        for (const list of booklists) {
            if (!list) continue;
            booklist.push(<ListItem key={list.id}>{list.name}</ListItem>);
        }
    
        return booklist;
    };*/
    }

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
                <List>{renderBooklists()}</List>
            </Popover>
        </div>
    );
};

export default AddBookToList;
