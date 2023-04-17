import { useState, FC, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  MenuItem,
} from "@mui/material";
import Book from "../../../interfaces/book.interface";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from "../../../sxStyles";
import {
  fetchUpdateBook,
  fetchAddBook,
  fetchAllHomeOffices,
} from "../../../fetchFunctions";
import { HomeOffice } from "../../../interfaces/HomeOffice";
import CountrySpan from "../../CountrySpan";
import OfficeSpan from "../../OfficeSpan";

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
  const [offices, setOffices] = useState<HomeOffice[]>([]);

  useEffect(() => {
    (async () => {
      setOffices(await fetchAllHomeOffices());
    })();
  }, []);

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

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <form
        onSubmit={() => {
          editing ? updateBook(book) : addBook(book);
          handleOpen();
        }}
      >
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
              required
              value={book.author}
              onChange={(e) => onChange(e)}
            />
            <TextField
              label="Title"
              name="title"
              required
              value={book.title}
              onChange={(e) => onChange(e)}
            />
            <TextField
              label="Topic"
              name="topic"
              required
              value={book.topic}
              onChange={(e) => onChange(e)}
            />
            <TextField
              label="ISBN"
              name="isbn"
              required
              value={book.isbn}
              onChange={(e) => onChange(e)}
            />
            <TextField
              label="Year"
              name="year"
              required
              value={book.year}
              onChange={(e) => onChange(e)}
            />
            <TextField
              select
              label="Office"
              name="homeOfficeId"
              required
              value={book.homeOfficeId}
              onChange={(e) => onChange(e)}
            >
              {
                // @ts-ignore
                offices.map(({ id, name, countryCode }) => {
                  return (
                    <MenuItem value={id}>
                      <OfficeSpan countryCode={countryCode} officeName={name} />
                    </MenuItem>
                  );
                })
              }
            </TextField>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={editBookUpdateButton}
                variant="contained"
                type="submit"
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
            </Stack>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default EditBook;
