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
  Stack,
} from "@mui/material";
import {
  listBooksFavoriteButton as favButton,
  userPageMyListsButton,
  listBooksEditButton,
  listBooksEntryAddButton,
} from "../../../sxStyles";
import Book from "../../../interfaces/book.interface";
import Book_list from "../../../interfaces/book_list.interface";
import Book_list_entry from "../../../interfaces/book_list_entry.interface";
import {
  fetchUserBooklists,
  fetchAddEntry,
  fetchUpdateBooklist,
} from "../../../fetchFunctions";
import { useNavigate } from "react-router-dom";

const UserListPopup: FC<{ book: Book }> = ({ book }): JSX.Element => {
  const [booklists, setBooklists] = useState<Book_list[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (Boolean(anchorEl) === true) {
      fetchBooklists();
    }
  }, [anchorEl]);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddButton = (list: Book_list) => {
    const addEntry: Book_list_entry = {
      id: -1,
      list: list.id,
      book: book.id,
    };
    console.log(addEntry);
    //TODO: add check to prevent duplicate entries
    //  fetch all entries of user
    //  compare addEntry to fetched entries
    fetchAddEntry(addEntry);
    // close popup after adding
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const fetchBooklists = async () => {
    setBooklists(await fetchUserBooklists());
  };

  const addBookToList = async (newEntry: Book_list_entry) => {
    const response = await fetchAddEntry(newEntry);
  };

  /*
    // note(markus):    maybe doing checkmark is too advanced to complete in the remaining time
    //                  suggestion to just use a button to add then delete only from the list view for now
    
    const handleBooklistCheckmark = (e: React.SyntheticEvent, list:Book_list) => {
        //console.log(book)
        //console.log(book.id)
        console.log( e.target.checked )
        console.log( list )
        if(e.target.checked){
            //add book to list of checkmark

        } else {
            //remove book from list

        }
    }
    */

  const renderBooklists = () => {
    let booklist = [];
    for (const list of booklists) {
      if (!list) continue;
      booklist.push(
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ paddingRight: 2 }}
          >
            <ListItem key={list.id}>{list.name}</ListItem>
            <Button
              sx={listBooksEntryAddButton}
              onClick={() => {
                handleAddButton(list);
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      );
    }

    // note(markus): this part shows for a split second when clicking a new +add button
    if (booklists.length < 1) {
      booklist.push(
        <>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography>You have no lists yet.</Typography>
            <Box sx={{ marginRight: 5 }}>
              <Button
                sx={userPageMyListsButton}
                variant="contained"
                onClick={() => {
                  navigate("/booklists");
                }}
              >
                Go to My Lists
              </Button>
            </Box>
          </Box>
        </>
      );
    }

    return booklist;
  };

  /*
    const renderBooklists = () => {
        let booklist = [];
        for (const list of booklists) {
            if (!list) continue;
            booklist.push(<ListItem key={list.id}>{list.name}</ListItem>);
        }
    
        return booklist;
    };*/

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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>{renderBooklists()}</List>
      </Popover>
    </div>
  );
};

export default UserListPopup;
