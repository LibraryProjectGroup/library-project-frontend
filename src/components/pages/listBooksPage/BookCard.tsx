import React, { useState, useEffect } from 'react'
import {
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  Rating,
  Collapse,
} from '@mui/material'
import Borrow from '../../../interfaces/borrow.interface'
import Book from '../../../interfaces/book.interface'
import Book_reservation from '../../../interfaces/book_reservation.interface'
import Book_review from '../../../interfaces/book_review.interface'
import OfficeSpan from '../../OfficeSpan'
import { MS_IN_DAY, RESERVATION_DAYS } from '../../../constants'
import {
  editBookCancelButton,
  editBookListUpdateButton,
  listBooksDeleteButton,
  listBooksEditButton,
  reviewDeleteButton,
  showReviewsButton,
} from '../../../sxStyles'
import UserListPopup from './UserListPopup'
import {
  fetchAddReview,
  fetchReviewsByBookId,
  fetchAllReviews,
  fetchAverageReview,
  fetchDeleteReview,
} from '../../../fetchFunctions'

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
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [isReviewVisible, setReviewVisible] = useState(false)
  const [reviews, setReviews] = useState<Book_review[]>([])
  const [isReviewListVisible, setReviewListVisible] = useState(false)
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const fetchedReviews = await fetchAllReviews()
        setReviews(fetchedReviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    const loadAverageRating = async () => {
      try {
        const avgRating = await fetchAverageReview(book.id)
        setAverageRating(avgRating)
      } catch (error) {
        console.error('Error fetching average rating:', error)
      }
    }
    loadReviews()
    loadAverageRating()
  }, [book.id])

  const handleReviewSubmit = async () => {
    try {
      const success = await fetchAddReview(book.id, reviewText, rating)
      if (success) {
        setRating(0)
        setReviewText('')
        setReviewVisible(false)
        const fetchedReviews = await fetchAllReviews()
        setReviews(fetchedReviews)
      } else {
        console.error('Failed to add review')
      }
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }
  const deleteReview = async (reviewId: number) => {
    await fetchDeleteReview(reviewId)
    const fetchedReviews = await fetchAllReviews()
    setReviews(fetchedReviews)
  }

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
          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
            }}
          >
            Average Rating:
          </Typography>
          <Rating
            name="average-rating"
            value={averageRating || 0} // Display 0 if averageRating is null
            readOnly
            precision={0.1}
          />
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
          {!isReviewVisible && (
            <Button
              sx={listBooksEditButton}
              variant="contained"
              onClick={() => setReviewVisible(true)}
            >
              Add Review
            </Button>
          )}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={1}>
        {isReviewVisible && (
          <>
            <TextField
              label="Write your review here..."
              multiline
              rows={4}
              fullWidth
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <Typography component="legend">Rating:</Typography>
            <Rating
              name="rating"
              value={rating}
              precision={1}
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue || 0)
              }}
            />
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                sx={editBookListUpdateButton}
                onClick={handleReviewSubmit}
              >
                Submit Review
              </Button>
              <Button
                variant="contained"
                sx={editBookCancelButton}
                onClick={() => setReviewVisible(false)}
              >
                Cancel
              </Button>
            </Stack>
          </>
        )}
      </Stack>

      <Button
        variant="text"
        color="primary"
        sx={showReviewsButton}
        onClick={() => {
          setReviewListVisible(!isReviewListVisible)
        }}
      >
        <Typography variant="subtitle1">
          {isReviewListVisible ? 'Hide reviews' : 'View reviews'} (
          {reviews.length})
        </Typography>
      </Button>
      <Collapse in={isReviewListVisible}>
        <div>
          <ul style={{ listStyleType: 'none' }}>
            {reviews.map((review, index) => (
              <li
                key={index}
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#f7f7f7',
                  maxWidth: 400,
                  height: 100,
                  position: 'relative',
                }}
              >
                <Typography>{review.userId}</Typography>
                <Rating
                  name="average-rating"
                  value={review.rating || 0}
                  readOnly
                  precision={0.1}
                />
                <Typography style={{ marginTop: '5px' }}>
                  {review.comment}
                </Typography>
                <Button
                  onClick={() => deleteReview(review.id)}
                  sx={reviewDeleteButton}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </Paper>
  )
}

export default BookCard
