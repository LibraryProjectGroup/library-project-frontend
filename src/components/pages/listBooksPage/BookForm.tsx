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
import AddScanner from "../../scanner/AddScanner";

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
  const [lastIsbn, setLastIsbn] = useState("");
  const [cameraVisible, setCameraVisible] = useState(false);
  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: "",
  });

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

  const fetchApi = (isbn: string) => {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
        encodeURIComponent(isbn)
    )
      .then((response) => response.json())
      .then((result) => {
        const date = result.items[0].volumeInfo.publishedDate;
        const bookData = result.items[0];
        if (bookData.volumeInfo.imageLinks) {
          setBook({
            ...book,
            isbn: isbn,
            author: bookData.volumeInfo.authors[0],
            image: bookData.volumeInfo.imageLinks.thumbnail,
            title: bookData.volumeInfo.title,
            year: date[0] + date[1] + date[2] + date[3],
          });
        } else {
          setBook({
            ...book,
            isbn: isbn,
            author: bookData.volumeInfo.authors[0],
            image: null,
            title: bookData.volumeInfo.title,
            year: date[0] + date[1] + date[2] + date[3],
          });
        }
      })
      .catch((err) => console.log(err));
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

  if (book.isbn != "" && book.isbn != lastIsbn) {
    setLastIsbn(book.isbn);
    fetchApi(book.isbn);
  } else if (book.isbn == "" && lastIsbn != "") {
    setLastIsbn("");
  }

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
              <Button
                sx={editBookCancelButton}
                variant="contained"
                onClick={() => {
                  setCameraVisible(true);
                }}
              >
                Scanner
              </Button>
              <AddScanner
                visible={cameraVisible}
                setVisible={setCameraVisible}
                confirmation={popUpConfirmation}
                setConfirmation={setPopUpConfirmationOpen}
                callApi={fetchApi}
              />
            </Stack>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default EditBook;
