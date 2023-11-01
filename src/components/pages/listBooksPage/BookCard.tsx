import React from 'react'
import { Paper, Typography, Stack, Button } from '@mui/material'
import Borrow from '../../../interfaces/borrow.interface'
import Book from '../../../interfaces/book.interface'
import Book_reservation from '../../../interfaces/book_reservation.interface'
import OfficeSpan from '../../OfficeSpan'
import { MS_IN_DAY, RESERVATION_DAYS } from '../../../constants'
import { listBooksDeleteButton, listBooksEditButton } from '../../../sxStyles'
import UserListPopup from './UserListPopup'

interface BookCardProps {
  book: Book
  currentBorrows: Borrow[]
  currentReservations: Book_reservation[]
  context: any
  renderLoanButton: (book: Book) => JSX.Element | null
  renderReserveButton: (book: Book) => JSX.Element | null
  bookInCurrentBorrows: (book: Book) => boolean
  handleDelete: (book: Book) => void
  handleEdit: (book: Book) => void
  activeAndLoanableReservations: any
  viewType: string
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  currentBorrows,
  currentReservations,
  context,
  renderLoanButton,
  renderReserveButton,
  bookInCurrentBorrows,
  handleDelete,
  handleEdit,
  activeAndLoanableReservations,
  viewType,
}) => {
  return (
    <Paper
      elevation={10}
      sx={
        viewType === 'list'
          ? { padding: '2rem', width: { xs: '90%', md: '60%' } }
          : {
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              width: 'auto',
              height: 650,
            }
      }
      key={book.id}
    >
      <Stack
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection:
            viewType === 'list' ? { xs: 'column', md: 'row' } : 'column',
          justifyContent: { md: 'space-between' },
          padding: '1rem',
        }}
      >
        <Stack>
          {book.image ? (
            <img alt="Book cover" width={120} height={160} src={book.image} />
          ) : (
            <img
              alt="Book cover not available"
              width={120}
              height={160}
              src={'https://images.isbndb.com/covers/91/26/9789513119126.jpg'}
            />
          )}
        </Stack>

        <Stack>
          <Typography
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              marginBottom: 1,
            }}
          >
            {book.title}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
              marginTop: 1,
            }}
          >
            Author: {book.author}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
            }}
          >
            Year: {book.year}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
            }}
          >
            Topic: {book.topic}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
            }}
          >
            ISBN: {book.isbn}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
            }}
          >
            Office:{' '}
            <OfficeSpan
              countryCode={book.homeOfficeCountry}
              officeName={book.homeOfficeName}
            />
          </Typography>
          {bookInCurrentBorrows(book) && (
            <Typography
              sx={{
                fontFamily: 'Merriweather',
                fontWeight: 'light',
                marginTop: '1rem',
              }}
            >
              {`Loan due: ${currentBorrows
                .filter((borrow) => borrow.book === book.id)
                .map((borrow) =>
                  new Date(borrow.dueDate).toLocaleString('fi', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })
                )}.`}
            </Typography>
          )}
          {activeAndLoanableReservations
            .map((obj: { bookId: any }) => obj.bookId)
            .includes(book.id) && (
            <Typography
              sx={{
                fontFamily: 'Merriweather',
                fontWeight: 'light',
                color: 'orange',
              }}
            >
              {`Reservation due: ${currentReservations
                .filter((obj) => obj.bookId === book.id)
                .map((obj) =>
                  new Date(
                    new Date(obj.reservationDatetime).getTime() +
                      RESERVATION_DAYS * MS_IN_DAY
                  ).toLocaleString('fi', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })
                )}.`}
            </Typography>
          )}
        </Stack>
        <Stack style={{ height: 250 }}>
          <UserListPopup book={book} />
          <Button
            sx={listBooksDeleteButton}
            variant="contained"
            color="error"
            disabled={
              book.library_user !== context?.user?.id &&
              !context?.user?.administrator
            }
            onClick={() => handleDelete(book)}
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
            onClick={() => handleEdit(book)}
          >
            Edit book
          </Button>
          {renderLoanButton(book)}
          {renderReserveButton(book)}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default BookCard
