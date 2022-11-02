import React, { useState, useContext, FC } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stack
} from "@mui/material";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import BACKEND_URL from "../../../backendUrl";
import { fetchAndSetAllBooks } from "../../../fetchFunctions";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton
} from "../../../sxStyles";

interface IProps {
  editBookFormVisible: boolean;
  bookToEdit: Book | null;
  setBooks: Function;
  setEditBookFormVisible: Function;
}

const EditBook: FC<IProps> = ({
  editBookFormVisible,
  bookToEdit,
  setBooks,
  setEditBookFormVisible
}: IProps): JSX.Element => {
  const [editedBook, setEditedBook] = useState(bookToEdit);
  const context = useContext(TheContext);

  const renderBookData = (
    book: Book,
    editedBook: Book,
    setEditedBook: Function
  ) => {
    return (
      <Modal
        open={editBookFormVisible}
        onClose={() => {
          setEditBookFormVisible(false);
        }}
      >
        <Box sx={editBookBox}>
          <Stack spacing={2}>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold"
              }}
              variant="h4"
            >
              Edit {editedBook.title}
            </Typography>
            <TextField
              label="Author"
              name="author"
              value={editedBook.author}
              onChange={(e) =>
                setEditedBook(() => ({ ...editedBook, author: e.target.value }))
              }
            />
            <TextField
              label="Title"
              name="title"
              value={editedBook.title}
              onChange={(e) =>
                setEditedBook(() => ({ ...editedBook, title: e.target.value }))
              }
            />
            <TextField
              label="Topic"
              name="topic"
              value={editedBook.topic}
              onChange={(e) =>
                setEditedBook(() => ({ ...editedBook, topic: e.target.value }))
              }
            />
            <TextField
              label="ISBN"
              name="isbn"
              value={editedBook.isbn}
              onChange={(e) =>
                setEditedBook(() => ({ ...editedBook, isbn: e.target.value }))
              }
            />
            <TextField
              label="Location"
              name="location"
              value={editedBook.location}
              onChange={(e) =>
                setEditedBook(() => ({
                  ...editedBook,
                  location: e.target.value
                }))
              }
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={editBookUpdateButton}
                variant="contained"
                onClick={() => {
                  updateBook(book);
                }}
              >
                Update
              </Button>
              <Button
                sx={editBookCancelButton}
                variant="contained"
                onClick={() => {
                  setEditBookFormVisible(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    );
  };

  // Should maybe be modified and moved to fetchFunctions.tsx
  const updateBook = async (book: Book) => {
    const response = await fetch(`${BACKEND_URL}/book`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": BACKEND_URL
      },
      body: JSON.stringify(editedBook)
    });
    if (response.ok) {
      setEditBookFormVisible(false);
      fetchAndSetAllBooks(setBooks);
    }
  };

  return (
    <div>
      {bookToEdit &&
        editedBook &&
        renderBookData(bookToEdit, editedBook, setEditedBook)}
    </div>
  );
};

export default EditBook;
