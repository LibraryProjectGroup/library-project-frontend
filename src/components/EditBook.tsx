import React, { useState, FC } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stack,
} from "@mui/material";

import Book from "../interfaces/book.interface";
import BACKEND_URL from "../backendUrl";

interface IProps {
  editBookFormVisible: boolean;
  bookToEdit: Book;
  setEditBookFormVisible: Function;
  fetchAllBooks: Function;
}

const EditBook: FC<IProps> = ({
  editBookFormVisible,
  bookToEdit,
  setEditBookFormVisible,
  fetchAllBooks,
}: IProps): JSX.Element => {
  const [editedBook, setEditedBook] = useState(bookToEdit);

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
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            paddingTop: 4,
            paddingX: 4,
            paddingBottom: 2,
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
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
                  location: e.target.value,
                }))
              }
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: 15,
                  //width: "30%",
                  backgroundColor: "#FFD100",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#FFB500",
                  },
                  //padding: 2,
                }}
                variant="contained"
                onClick={() => {
                  updateBook(book);
                }}
              >
                Update
              </Button>
              <Button
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: 15,
                  //width: "30%",
                  backgroundColor: "#FFD100",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#FFB500",
                  },
                  //padding: 2,
                }}
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

  const updateBook = async (book: Book) => {
    const response = await fetch(`${BACKEND_URL}/book`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": BACKEND_URL,
      },
      body: JSON.stringify(editedBook),
    });
    if (response.ok) {
      setEditBookFormVisible(false);
      fetchAllBooks();
    }
  };

  return (
    <div>
      {bookToEdit && renderBookData(bookToEdit, editedBook, setEditedBook)}
    </div>
  );
};

export default EditBook;
