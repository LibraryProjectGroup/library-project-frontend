import React, {
  useState,
  FC,
  useEffect,
  useContext,
  Fragment,
  useCallback,
} from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Fab,
  Grid,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import Book_reservation from "../../../interfaces/book_reservation.interface";
import BookForm from "./BookForm";
import UserListPopup from "./UserListPopup";
import {
  fetchAllBooks,
  fetchDeleteBook,
  fetchAllCurrentBorrows,
  fetchCreateBorrow,
  fetchCurrentBorrows,
  fetchAddBookReservation,
  fetchAllBookReservations,
  fetchActiveAndLoanableReservations,
  fetchCurrentBookReservations,
  fetchCancelBookReservation,
  fetchLoanBookReservation,
  fetchAllReservedBooks,
  fetchPagedBooks,
  fetchAllBooksCount,
} from "../../../fetchFunctions";
import {
  listBooksDeleteButton,
  listBooksEditButton,
  listBooksLoanButton,
  addBookAddButton as addButton,
  listBooksFavoriteButton as favButton,
} from "../../../sxStyles";
import Borrow from "../../../interfaces/borrow.interface";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import BookRequestForm from "./BookRequestForm";
import { LOAN_DAYS, RESERVATION_DAYS, MS_IN_DAY } from "../../../constants";

const ListBooks: FC = (): JSX.Element => {
  const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
  const [currentReservations, setCurrentReservations] = useState<
    Book_reservation[]
  >([]);
  const [userBorrows, setUserBorrows] = useState<Borrow[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [activeAndLoanableReservations, setActiveAndLoanableReservations] =
    useState<any[]>([]);
  const [bookPage, setBookPage] = useState(1);
  const [bookPageSize, setBookPageSize] = useState(20);
  const [bookCount, setBookCount] = useState<number>(0);

  const [requestVisible, setRequestVisible] = useState(false);

  const [formBook, setFormBook] = useState<Book | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditing, setFormEditing] = useState(false);
  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: "",
  });

  const [open, setOpen] = useState<
    "none" | "expiring" | "expired" | "bookform"
  >("none");

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    setBooks(await fetchPagedBooks(bookPage, bookPageSize));
    fetchBookCount();
  }, [bookPage, bookPageSize]);

  const fetchBookCount = async () => {
    setBookCount(await fetchAllBooksCount());
  };

  const fetchBorrows = async () =>
    setCurrentBorrows(await fetchAllCurrentBorrows());

  const fetchUserBorrows = async () => {
    setUserBorrows(await fetchCurrentBorrows());
  };

  const fetchReservations = async () => {
    setCurrentReservations(await fetchCurrentBookReservations());
  };

  const fetchActiveReservedAndLoanable = async () => {
    setActiveAndLoanableReservations(
      await fetchActiveAndLoanableReservations()
    );
  };
  const handlePageButton = (forward: boolean) => {
    setBookPage(bookPage + (forward ? 1 : -1));
  };

  const bookInCurrentBorrows = (book: Book) => {
    let inCurrentBorrows = false;
    for (let i = 0; i < currentBorrows.length; i++) {
      if (currentBorrows[i].book === book.id) {
        inCurrentBorrows = true;
      }
    }
    return inCurrentBorrows;
  };

  const bookInCurrentReservations = (book: Book) => {
    let inCurrentReservations = false;
    for (let i = 0; i < currentReservations.length; i++) {
      if (currentReservations[i].bookId === book.id) {
        inCurrentReservations = true;
      }
    }
    return inCurrentReservations;
  };

  const userLoaningBook = (book: Book) => {
    let isLoaning = false;
    currentBorrows.forEach((borrow) => {
      if (
        borrow.book === book.id &&
        borrow.library_user === context?.user?.id
      ) {
        isLoaning = true;
      }
    });
    return isLoaning;
  };

  const handleOpen = () => {
    for (const borrowed of userBorrows) {
      const currentDate = new Date();
      const datedDueDate = new Date(borrowed.dueDate);
      const convertToDay = 24 * 60 * 60 * 1000;
      const calculatedTime = Math.floor(
        (datedDueDate.getTime() - currentDate.getTime()) / convertToDay
      );
      if (calculatedTime < 0) {
        setOpen("expired");
        break;
      }

      if (calculatedTime >= 0 && calculatedTime < 5 && open !== "expired") {
        setOpen("expiring");
      }
    }
  };

  const handleClose = () => {
    setOpen("none");
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleClosePopUpConfirmation = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setPopUpConfirmationOpen({
      ok: false,
      message: "",
    });
  };

  const action_2 = (
    <React.Fragment>
      {/*! Undo functional for the future? */}
      {/* <Button
        color="secondary"
        size="small"
        onClick={handleClosePopUpConfirmation}
      >
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosePopUpConfirmation}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    fetchBooks();
    fetchBorrows();
    fetchReservations();
    fetchUserBorrows();
    fetchActiveReservedAndLoanable();
  }, [fetchBooks]);

  // eslint-disable-next-line
  useEffect(handleOpen, [userBorrows]);

  useEffect(() => {
    fetchBooks();
  }, [bookPage, fetchBooks]);

  const renderLoanButton = (book: Book) => {
    if (
      !activeAndLoanableReservations.map((obj) => obj.bookId).includes(book.id)
    ) {
      return (
        <Button
          sx={listBooksLoanButton}
          variant="contained"
          disabled={bookInCurrentBorrows(book)}
          onClick={async () => {
            if (window.confirm("Do you want to LOAN this book?")) {
              let message = "Loaning succeeded";
              await fetchCreateBorrow(book.id)
                .then((res) => {
                  if (!res.ok) {
                    message = "Loaning failed";
                  }
                })
                .then(() =>
                  setPopUpConfirmationOpen({
                    ok: true,
                    message: message,
                  })
                );
              await fetchBooks();
              await fetchBorrows();
            }
          }}
        >
          LOAN
        </Button>
      );
    } else {
      return null;
    }
  };

  const renderReserveButton = (book: Book) => {
    if (
      !userLoaningBook(book) &&
      !activeAndLoanableReservations
        .map((obj) => obj.bookId)
        .includes(book.id) &&
      bookInCurrentBorrows(book)
    ) {
      return (
        <Button
          sx={listBooksLoanButton}
          variant="contained"
          disabled={bookInCurrentReservations(book)}
          onClick={async () => {
            if (window.confirm("Do you want to RESERVE this book?")) {
              let message = "Reservation succeeded";
              await fetchAddBookReservation(book.id)
                .then((res) => {
                  if (!res.ok) {
                    message = "Reservation failed";
                  }
                })
                .then(() =>
                  setPopUpConfirmationOpen({
                    ok: true,
                    message: message,
                  })
                );
              await fetchBooks();
              await fetchReservations();
            }
          }}
        >
          RESERVE
        </Button>
      );
    } else {
      return null;
    }
  };

  const renderBookData = (book: Book) => {
    if (!book.deleted) {
      return (
        <Paper
          elevation={10}
          sx={{ padding: "2rem", width: { xs: "90%", md: "60%" } }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "space-between" },
            }}
          >
            <Stack>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                {book.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Author: {book.author}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Topic: {book.topic}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                isbn: {book.isbn}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Location: {book.location}
              </Typography>
              {bookInCurrentBorrows(book) && (
                <Typography
                  sx={{
                    fontFamily: "Merriweather",
                    fontWeight: "light",
                  }}
                >
                  {`Loan due: ${currentBorrows
                    .filter((borrow) => borrow.book === book.id)
                    .map((borrow) =>
                      new Date(borrow.dueDate).toLocaleString("fi", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                    )}.`}
                </Typography>
              )}
              {activeAndLoanableReservations
                .map((obj) => obj.bookId)
                .includes(book.id) && (
                <Typography
                  sx={{
                    fontFamily: "Merriweather",
                    fontWeight: "light",
                    color: "orange",
                  }}
                >
                  {`Reservation due: ${currentReservations
                    .filter((obj) => obj.bookId === book.id)
                    .map((obj) =>
                      new Date(
                        new Date(obj.reservationDatetime).getTime() +
                          RESERVATION_DAYS * MS_IN_DAY
                      ).toLocaleString("fi", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                    )}.`}
                </Typography>
              )}
            </Stack>
            <Stack>
              <UserListPopup book={book} />
              <Button
                sx={listBooksDeleteButton}
                variant="contained"
                disabled={
                  book.library_user !== context?.user?.id &&
                  !context?.user?.administrator
                }
                color="error"
                onClick={async () => {
                  if (window.confirm("Do you want to DELETE this book?")) {
                    let message = "Delete succeeded";
                    await fetchDeleteBook(book.id)
                      .then((res) => {
                        if (!res.ok) {
                          message = "Delete failed";
                        }
                      })
                      .then(() =>
                        setPopUpConfirmationOpen({
                          ok: true,
                          message: message,
                        })
                      );
                    await fetchBooks();
                  }
                }}
              >
                Delete book
              </Button>
              <Button
                sx={listBooksEditButton}
                variant="contained"
                disabled={
                  book.library_user !== context?.user?.id &&
                  !context?.user?.administrator
                }
                onClick={() => {
                  setFormEditing(true);
                  setFormBook(book);
                  setFormVisible(true);
                }}
              >
                Edit book
              </Button>
              {renderLoanButton(book)}
              {renderReserveButton(book)}
            </Stack>
          </Stack>
        </Paper>
      );
    }
  };

  return (
    <>
      {/* Pop up element */}
      <Snackbar
        open={popUpConfirmation.ok}
        autoHideDuration={4000}
        onClose={handleClosePopUpConfirmation}
        message={popUpConfirmation.message}
        action={action_2}
      />
      {/* Pop up element */}
      <Box sx={{ marginTop: 5, marginBottom: 5, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
            }}
          >
            <Tooltip title="Request a book">
              <Fab
                aria-label="request"
                sx={addButton}
                onClick={() => {
                  setRequestVisible(true);
                }}
              >
                <AddCommentIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Add new book">
              <Fab
                aria-label="add"
                sx={addButton}
                onClick={() => {
                  setFormEditing(false);
                  setFormBook({
                    id: -1, // This wont get used
                    title: "",
                    author: "",
                    topic: "",
                    isbn: "",
                    location: "",
                    deleted: false,
                  });
                  setFormVisible(true);
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>
          <BookForm
            visible={formVisible}
            setVisible={setFormVisible}
            confirmation={popUpConfirmation}
            setConfirmation={setPopUpConfirmationOpen}
            book={formBook}
            setBook={setFormBook}
            editing={formEditing}
            updateBooks={fetchBooks}
          />

          <BookRequestForm
            visible={requestVisible}
            setVisible={setRequestVisible}
            confirmation={popUpConfirmation}
            setConfirmation={setPopUpConfirmationOpen}
          />
          <Grid
            sx={{
              textAlign: "center",
              marginBottom: 3,
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <FormControl
              sx={{
                marginLeft: 4,
                marginBottom: 0,
                marginTop: 2,
                minWidth: 80,
              }}
              size="small"
            >
              <InputLabel id="Page">Page</InputLabel>
              <Select
                labelId="page"
                id="page"
                value={String(bookPage)}
                label="page"
                onChange={(event: SelectChangeEvent) => {
                  setBookPage(Number(event.target.value));
                }}
              >
                {Array(Math.ceil(bookCount / bookPageSize))
                  .fill(null)
                  .map((x, i) => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Tooltip title="First Page">
              <Fab
                aria-label="first1"
                sx={addButton}
                onClick={() => {
                  setBookPage(1);
                }}
                disabled={bookPage <= 1}
              >
                <FirstPageIcon />
              </Fab>
            </Tooltip>

            <Tooltip title="Previous Page">
              <Fab
                aria-label="previous1"
                sx={addButton}
                onClick={() => {
                  handlePageButton(false);
                }}
                disabled={bookPage <= 1}
              >
                <ArrowLeftIcon />
              </Fab>
            </Tooltip>

            <Tooltip title="Next Page">
              <Fab
                aria-label="next1"
                sx={addButton}
                onClick={() => {
                  handlePageButton(true);
                }}
                disabled={bookPageSize * bookPage >= bookCount}
              >
                <ArrowRightIcon />
              </Fab>
            </Tooltip>

            <FormControl
              sx={{
                marginLeft: 4,
                marginBottom: 0,
                marginTop: 2,
                minWidth: 80,
              }}
              size="small"
            >
              <InputLabel id="pageSize">Books per Page</InputLabel>
              <Select
                labelId="pageSize"
                id="pageSize"
                value={String(bookPageSize)}
                label="Page Size"
                onChange={(event: SelectChangeEvent) => {
                  setBookPageSize(Number(event.target.value));
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Stack
          spacing={3}
          sx={{ margin: "2rem", display: "flex", alignItems: "center" }}
        >
          {books?.map((book) => renderBookData(book))}
        </Stack>

        <Grid sx={{ textAlign: "center", marginTop: 3 }}>
          <Tooltip title="Previous Page">
            <Fab
              aria-label="previous2"
              sx={addButton}
              onClick={() => {
                handlePageButton(false);
              }}
              disabled={bookPage <= 1}
            >
              <ArrowLeftIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Next Page">
            <Fab
              aria-label="next2"
              sx={addButton}
              onClick={() => {
                handlePageButton(true);
              }}
              disabled={bookPageSize * bookPage >= bookCount}
            >
              <ArrowRightIcon />
            </Fab>
          </Tooltip>
        </Grid>

        <Snackbar
          open={open === "expiring"}
          action={action}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
            variant="filled"
          >
            You have expiring loan(s)
          </Alert>
        </Snackbar>
        <Snackbar
          open={open === "expired"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" sx={{ width: "100%" }} variant="filled">
            YOU HAVE EXPIRED LOAN(S)
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ListBooks;
