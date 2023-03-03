import { useState, FC } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import Book from "../../../interfaces/book.interface";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from "../../../sxStyles";
import { fetchUpdateBook, fetchAddBook } from "../../../fetchFunctions";

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  book: Book | null;
  setBook: Function;
  editing: boolean;
  updateBooks: Function;
}

const EditBook: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  book,
  setBook,
  editing,
  updateBooks,
}: IProps): JSX.Element => {
  const updateBook = async (newBook: Book) => {
    const response = await fetchUpdateBook(newBook);
    if (response.ok) {
      setVisible(false);
      updateBooks();
    }
  };

  const addBook = async (newBook: Book) => {
    const response = await fetchAddBook(newBook);
    if (response.ok) {
      setVisible(false);
      updateBooks();
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  if (book == null) return <></>;

  const handleOpen = () => {
    editing
      ? setConfirmation({
          ok: true,
          message: "Book has been edited",
        })
      : setConfirmation({
          ok: true,
          message: "Book has been added",
        });
  };

  const Fetchspi = () => {
    console.log("Fetchapi")
    const isbn = "9780575088498";
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&key=AIzaSyDQIsAIinLXi7UWR_dO_oRBWJtkAcZHwiE")
    .then(response => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch(err => console.log(err))
    //.then(data => setData(data))
  }

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            {editing ? `Edit ${book.title}` : "Add book"}
          </Typography>
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={(e) => onChange(e)}
          />
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={(e) => onChange(e)}
          />
          <TextField
            label="Topic"
            name="topic"
            value={book.topic}
            onChange={(e) => onChange(e)}
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={book.isbn}
            onChange={(e) => onChange(e)}
          />
          <TextField
            label="Year"
            name="year"
            value={book.year}
            onChange={(e) => onChange(e)}
          />
          <TextField
            label="Location"
            name="location"
            value={book.location}
            onChange={(e) => onChange(e)}
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={() => {
                editing ? updateBook(book) : addBook(book);
                handleOpen();
              }}
            >
              {editing ? "Update" : "Add"}
            </Button>
            <Button
              sx={editBookCancelButton}
              variant="contained"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            
            <Button
              sx={editBookCancelButton}
              variant="contained"
              onClick={() => Fetchspi}
            >
              Test Button for Api
            </Button>

          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

console.log("TEST")

export default EditBook;
