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
import AddScanner from "../../scanner/AddScanner";
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
  const apikey = "&key=AIzaSyDQIsAIinLXi7UWR_dO_oRBWJtkAcZHwiE";
  const [lastIsbn, setLastIsbn] = useState("");
  const [cameraVisible, setCameraVisible] = useState(false);
  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: "",
  });
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

  const fetchApi = (isbn: string) => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
      .then((response) => response.json())
      .then((result) => {
        const x = result.items[0].volumeInfo.publishedDate;
        if (result.items[0].volumeInfo.imageLinks !== undefined) {
          setBook({
            isbn: isbn,
            author: result.items[0].volumeInfo.authors[0],
            image: result.items[0].volumeInfo.imageLinks.thumbnail,
            title: result.items[0].volumeInfo.title,
            year: x[0] + x[1] + x[2] + x[3],
          });
        } else {
          setBook({
            isbn: isbn,
            author: result.items[0].volumeInfo.authors[0],
            image: "https://images.isbndb.com/covers/91/26/9789513119126.jpg",
            title: result.items[0].volumeInfo.title,
            year: x[0] + x[1] + x[2] + x[3],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (book.isbn != "" && book.isbn != lastIsbn) {
    setLastIsbn(book.isbn);
    fetchApi(book.isbn);
  } else if (book.isbn == "" && lastIsbn != "") {
    setLastIsbn("");
  }

  return (
    <Modal open={visible} onClose={() => handleClose()}>
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
    </Modal>
  );
};

export default EditBook;
