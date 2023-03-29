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
  TablePagination,
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
import DeleteBook from "./DeleteBook";
import LoanBook from "./LoanBook";
import ReserveBook from "./ReserveBook";
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
import { ToastContainer, toast } from "react-toastify";
import Borrow from "../../../interfaces/borrow.interface";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import BookRequestForm from "./BookRequestForm";
import { LOAN_DAYS, RESERVATION_DAYS, MS_IN_DAY } from "../../../constants";

import "react-toastify/dist/ReactToastify.css";

const ListBooks: FC = (): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
  const [currentReservations, setCurrentReservations] = useState<
    Book_reservation[]
  >([]);
  const [userBorrows, setUserBorrows] = useState<Borrow[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [activeAndLoanableReservations, setActiveAndLoanableReservations] =
    useState<any[]>([]);
  const [bookPage, setBookPage] = useState(1);
  const [bookPageSize, setBookPageSize] = useState(books.length);
  const [bookCount, setBookCount] = useState<number>(0);
  const [bookId, setBookId] = useState<number>(0);

  const [requestVisible, setRequestVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loanVisible, setLoanVisible] = useState(false);
  const [reserveVisible, setReserveVisible] = useState(false);

  const [formBook, setFormBook] = useState<Book | null>(null);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(books);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            setBookId(book.id);
            setLoanVisible(true);
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
            setBookId(book.id);
            setReserveVisible(true);
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
                Year: {book.year}
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
                  setBookId(book.id);
                  setDeleteVisible(true);
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
                    year: new Date().getFullYear(),
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
          <DeleteBook
            visible={deleteVisible}
            setVisible={setDeleteVisible}
            confirmation={popUpConfirmation}
            setConfirmation={setPopUpConfirmationOpen}
            bookId={bookId}
            fetchBooks={fetchBooks}
            fetchDeleteBook={fetchDeleteBook}
          />
          <LoanBook
            visible={loanVisible}
            setVisible={setLoanVisible}
            confirmation={popUpConfirmation}
            setConfirmation={setPopUpConfirmationOpen}
            bookId={bookId}
            fetchCreateBorrow={fetchCreateBorrow}
            fetchBooks={fetchBooks}
            fetchBorrows={fetchBorrows}
          />
          <ReserveBook
            visible={reserveVisible}
            setVisible={setReserveVisible}
            confirmation={popUpConfirmation}
            setConfirmation={setPopUpConfirmationOpen}
            bookId={bookId}
            fetchBooks={fetchBooks}
            fetchBorrows={fetchBorrows}
          />
          <Grid
            sx={{
              textAlign: "center",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TablePagination
              component="div"
              count={books.length}
              rowsPerPageOptions={[5, 10, 25]}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Books per page:"
            />
          </Grid>
        </Box>
        <Stack
          spacing={3}
          sx={{ margin: "2rem", display: "flex", alignItems: "center" }}
        >
          {books
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((book) => renderBookData(book))}
        </Stack>

        <Grid
          sx={{
            textAlign: "center",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <TablePagination
            component="div"
            count={books.length}
            rowsPerPageOptions={[5, 10, 25]}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Books per page:"
          />
        </Grid>

        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          enableMultiContainer
          containerId={"ToastSuccess"}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          enableMultiContainer
          containerId={"ToastAlert"}
        />

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
