import {
  useState,
  FC,
  useEffect,
  useContext,
  Fragment,
  useCallback,
} from "react";
import {
  Button,
  Stack,
  Box,
} from "@mui/material";
import { TheContext } from "../../../TheContext";
import Book from "../../../interfaces/book.interface";
import Book_reservation from "../../../interfaces/book_reservation.interface";
import BookForm from "./BookForm";
import ButtonPopup from "./ButtonPopup";
import {
  fetchDeleteBook,
  fetchAllCurrentBorrows,
  fetchCreateBorrow,
  fetchCurrentBorrows,
  fetchAddBookReservation,
  fetchActiveAndLoanableReservations,
  fetchCurrentBookReservations,
  fetchPagedBooks,
} from "../../../fetchFunctions";
import { listBooksLoanButton } from "../../../sxStyles";
import ToastContainers from "../../../ToastContainers";
import Borrow from "../../../interfaces/borrow.interface";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BookCard from './BookCard';
import PaginationControls from './PaginationControls';
import NotificationSnackbars from './NotificationSnackbars';
import FloatingActionButtons from './FloatingActionButtons';
import BookRequestForm from './BookRequestForm';


const ListBooks: FC = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [currentBorrows, setCurrentBorrows] = useState<Borrow[]>([]);
  const [currentReservations, setCurrentReservations] = useState<
    Book_reservation[]
  >([]);
  const [userBorrows, setUserBorrows] = useState<Borrow[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [activeAndLoanableReservations, setActiveAndLoanableReservations] =
    useState<any[]>([]);
  const bookPage = 1;
  const bookPageSize = books.length;
  const [bookId, setBookId] = useState(0);

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

  const fetchBooks = useCallback(async () => {
    setBooks(await fetchPagedBooks(bookPage, bookPageSize));
  }, [bookPage, bookPageSize]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    <>
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
    </>
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
    if (!activeAndLoanableReservations.map((obj) => obj.bookId).includes(book.id)) {
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
    if (!userLoaningBook(book) &&
        !activeAndLoanableReservations.map((obj) => obj.bookId).includes(book.id) &&
        bookInCurrentBorrows(book)) {
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

  return (
    <>
        <Snackbar
            open={popUpConfirmation.ok}
            autoHideDuration={4000}
            onClose={handleClosePopUpConfirmation}
            message={popUpConfirmation.message}
            action={action_2}
        />
        <Box sx={{ marginTop: 5, marginBottom: 5, width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                <FloatingActionButtons
                    setRequestVisible={setRequestVisible}
                    setFormEditing={setFormEditing}
                    setFormBook={setFormBook}
                    setFormVisible={setFormVisible}
                />
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
                {/* Pop up element */}
                <ButtonPopup
                    deleteVisible={deleteVisible}
                    setDeleteVisible={setDeleteVisible}
                    loanVisible={loanVisible}
                    setLoanVisible={setLoanVisible}
                    reserveVisible={reserveVisible}
                    setReserveVisible={setReserveVisible}
                    bookId={bookId}
                    fetchBooks={fetchBooks}
                    fetchDeleteBook={fetchDeleteBook}
                    fetchCreateBorrow={fetchCreateBorrow}
                    fetchBorrows={fetchBorrows}
                    fetchReservations={fetchReservations}
                    fetchAddBookReservation={fetchAddBookReservation}
                />
                <PaginationControls
                    booksLength={books.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
            <Stack spacing={3} sx={{ margin: "2rem", display: "flex", alignItems: "center" }}>
                {books
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((book) => (
                        <BookCard
                            book={book}
                            currentBorrows={currentBorrows}
                            currentReservations={currentReservations}
                            context={context}
                            renderLoanButton={renderLoanButton}
                            renderReserveButton={renderReserveButton}
                            bookInCurrentBorrows={bookInCurrentBorrows}
                            activeAndLoanableReservations={activeAndLoanableReservations}
                            handleDelete={(selectedBook) => {
                              setBookId(selectedBook.id);
                              setDeleteVisible(true);
                            }}
                            handleEdit={(selectedBook) => {
                              setFormEditing(true);
                              setFormBook(selectedBook);
                              setFormVisible(true);
                            }}
                        />
                    ))}
            </Stack>
            <PaginationControls
                booksLength={books.length}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <ToastContainers />
            <NotificationSnackbars
                open={open}
                handleClose={handleClose}
            />
        </Box>
    </>
);
};

export default ListBooks;