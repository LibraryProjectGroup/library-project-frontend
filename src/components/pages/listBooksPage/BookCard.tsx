import React, { useState, useEffect } from 'react'
import {
  Paper,
  Typography,
  Stack,
  Button,
  Rating,
  Collapse,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { toast } from 'react-toastify'
import Borrow from '../../../interfaces/borrow.interface'
import Book from '../../../interfaces/book.interface'
import Book_reservation from '../../../interfaces/book_reservation.interface'
import Book_review from '../../../interfaces/book_review.interface'
import OfficeSpan from '../../OfficeSpan'
import { MS_IN_DAY, RESERVATION_DAYS } from '../../../constants'
import {
  listBooksDeleteButton,
  listBooksEditButton,
  reviewDeleteButton,
  showReviewsButton,
} from '../../../sxStyles'
import UserListPopup from './UserListPopup'
import LikeButton from './LikeButton'
import {
  fetchReviewsByBookId,
  fetchAverageRatingForBook,
  fetchDeleteReview,
  fetchAllUsers,
} from '../../../fetchFunctions'
import User from '../../../interfaces/user.interface'
import BookReviewForm from './BookReviewForm'
import BookReviewDelete from './BookReviewDelete'

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
  const [isReviewVisible, setReviewVisible] = useState(false)
  const [reviews, setReviews] = useState<Book_review[]>([])
  const [isReviewListVisible, setReviewListVisible] = useState(false)
  const [averageRating, setAverageRating] = useState(0)
  const [usernames, setUsernames] = useState<Record<number, string>>({})
  const [reviewedBooks, setReviewedBooks] = useState<Set<number>>(new Set())
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState<number>(0)

  useEffect(() => {
    loadReviewsAndRating()
    loadUsernames()
  }, [book.id])

  const loadReviewsAndRating = async () => {
    try {
      const fetchedReviews = await fetchReviewsByBookId(book.id)
      const averageRatingData = await fetchAverageRatingForBook(book.id)
      setReviews(fetchedReviews)
      setAverageRating(averageRatingData.averageRating)

      if (context?.user?.id) {
        const hasReviewed = fetchedReviews.some(
          (review) => review.user_id === context.user.id
        )
        if (hasReviewed) {
          setReviewedBooks((prevReviewedBooks) =>
            new Set(prevReviewedBooks).add(book.id)
          )
        }
      }
    } catch (error) {
      console.log('Error loading reviews and average rating: ', error)
    }
  }

  const loadUsernames = async () => {
    try {
      const users: User[] = await fetchAllUsers()
      const usernameMap: Record<number, string> = {}
      users.forEach((user) => {
        usernameMap[user.id] = user.username
      })
      setUsernames(usernameMap)
    } catch (error) {
      console.error('Error fetching usernames:', error)
    }
  }

  const deleteReview = async (reviewId: number) => {
    try {
      await fetchDeleteReview(reviewId)
      loadReviewsAndRating()
      DeleteSuccessMessage()

      setReviewedBooks((prevReviewBooks) => {
        const updateReviewedBooks = new Set(prevReviewBooks)
        updateReviewedBooks.delete(book.id)
        return updateReviewedBooks
      })
      setDeleteConfirmationVisible(false)
    } catch (error) {
      console.error('Error deleting a review', error)
    }
  }

  const DeleteSuccessMessage = () =>
    toast.success('Review deleted successfully', {
      containerId: 'ToastSuccess',
    })

  const ErrorMessageDelete = () =>
    toast.error('You have already reviewed this book!', {
      containerId: 'ToastAlert',
    })

  return (
    <Paper
      elevation={10}
      sx={
        viewType === 'list'
          ? { padding: '2rem', width: { xs: '90%', md: '60%' } }
          : {
              padding: '1rem',
              width: 'auto',
              height: 'auto',
              margin: '1rem',
              display: 'flex',
              flexDirection: 'column',
            }
      }
      key={book.id}
    >
      <Stack
        sx={
          viewType === 'list'
            ? {
                flex: 1,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { md: 'space-between' },
                padding: '1rem',
              }
            : {
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                justifyContent: 'space-between',
              }
        }
      >
        <Stack
          sx={
            viewType === 'list'
              ? {
                  display: 'flex',
                  flex: 1,
                  flexDirection: { xs: 'row', md: 'column' },
                  position: 'relative',
                  justifyContent: 'space-between',
                  minWidth: 120,
                  maxWidth: { xs: 999, md: 0 },
                }
              : {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 'auto',
                }
          }
        >
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
          <LikeButton book={book} viewType={viewType} />
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
              marginBottom: '1rem',
            }}
          >
            Office:{' '}
            <OfficeSpan
              countryCode={book.homeOfficeCountry}
              officeName={book.homeOfficeName}
            />
          </Typography>
          <div style={{ height: '1rem', marginBottom: '10px' }}>
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
          </div>
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
          <Typography sx={{ fontFamily: 'Merriweather', fontWeight: 'light' }}>
            Average rating:
          </Typography>
          <Rating
            name="average-rating"
            value={averageRating}
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
          {viewType === 'list' && (
            <Button
              sx={listBooksEditButton}
              variant="contained"
              onClick={() => {
                if (isReviewVisible) {
                  setReviewVisible(false)
                } else if (reviewedBooks.has(book.id)) {
                  ErrorMessageDelete()
                } else {
                  setReviewVisible(!isReviewVisible)
                }
              }}
            >
              Add Review
            </Button>
          )}
        </Stack>
      </Stack>
      {viewType === 'list' && (
        <BookReviewForm
          book={book}
          isReviewVisible={isReviewVisible}
          setReviewVisible={setReviewVisible}
          loadReviewsAndRating={loadReviewsAndRating}
          setReviewListVisible={setReviewListVisible}
        />
      )}
      {viewType === 'list' && (
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
            {reviews ? reviews.length : 0})
          </Typography>
        </Button>
      )}
      <Collapse in={isReviewListVisible}>
        <div>
          <List>
            {reviews
              ? reviews.map((review, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      wordWrap: 'break-word',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {usernames[review.user_id]
                          ? usernames[review.user_id][0].toUpperCase()
                          : 'U'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={usernames[review.user_id] || 'Unknown User'}
                      secondaryTypographyProps={{ whiteSpace: 'pre-wrap' }}
                      secondary={
                        <>
                          <Rating
                            name="rating"
                            value={review.rating || 0}
                            readOnly
                            precision={0.1}
                          />
                          <br />
                          {review.comment}
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#888',
                              marginTop: '10px',
                              textAlign: 'right',
                            }}
                          >
                            {new Date(review.review_date).toLocaleDateString(
                              'fi-FI',
                              {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                              }
                            )}
                          </div>
                        </>
                      }
                    />
                    {context?.user?.id === review.user_id && (
                      <Button
                        onClick={() => {
                          setSelectedReviewId(review.id)
                          setDeleteConfirmationVisible(true)
                        }}
                        sx={reviewDeleteButton}
                      >
                        Delete
                      </Button>
                    )}
                  </ListItem>
                ))
              : null}
          </List>
        </div>
      </Collapse>
      <BookReviewDelete
        open={deleteConfirmationVisible}
        onClose={() => setDeleteConfirmationVisible(false)}
        onDelete={() => deleteReview(selectedReviewId)}
      />
    </Paper>
  )
}

export default BookCard
