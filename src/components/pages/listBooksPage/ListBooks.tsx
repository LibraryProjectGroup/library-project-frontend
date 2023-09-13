import React, { useState, useEffect, useContext, useCallback, FC, Fragment } from 'react';
import { Box, Stack, Grid, Snackbar, IconButton, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TheContext } from "../../../TheContext";
import { fetchPagedBooks, fetchAllCurrentBorrows, fetchCurrentBorrows, fetchCurrentBookReservations, fetchActiveAndLoanableReservations, fetchAllBooksCount, fetchAddBookReservation, fetchCreateBorrow, fetchDeleteBook } from "../../../fetchFunctions";
import BookCard from './BookCard'; // Assuming you've placed it in the same directory
import PaginationControls from './PaginationControls';
import NotificationSnackbars from './NotificationSnackbars';
import FloatingActionButtons from './FloatingActionButtons';
import BookForm from './BookForm'; // Assuming you have this component
import BookRequestForm from './BookRequestForm'; // Assuming you have this component
import ButtonPopup from './ButtonPopup'; // Assuming you have this component
import ToastContainers from "../../../ToastContainers"; // Assuming this is the correct path
import { useNavigate } from 'react-router-dom';
import Book from '../../../interfaces/book.interface';
import Book_reservation from '../../../interfaces/book_reservation.interface';
import Borrow from '../../../interfaces/borrow.interface';
import { listBooksLoanButton } from '../../../sxStyles';

const ListBooks: FC = (): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

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
    <React.Fragment>
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