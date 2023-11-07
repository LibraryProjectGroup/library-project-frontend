import React, { useEffect, useState } from 'react'
import Book from '../../../interfaces/book.interface'
import {
  editBookCancelButton,
  editBookListUpdateButton,
} from '../../../sxStyles'
import { fetchAddReview } from '../../../fetchFunctions'
import { Stack, TextField, Typography, Rating, Button } from '@mui/material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface BookReviewFormProps {
  book: Book
  isReviewVisible: boolean
  setReviewVisible: (value: boolean) => void
  loadReviewsAndRating: () => void
  setReviewListVisible: (value: boolean) => void
}

const BookReviewForm: React.FC<BookReviewFormProps> = ({
  book,
  isReviewVisible,
  setReviewVisible,
  loadReviewsAndRating,
  setReviewListVisible,
}) => {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [characterCount, setCharacterCount] = useState(500)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (isReviewVisible) {
      setCharacterCount(500)
    }
  }, [isReviewVisible])

  const SuccessMessage = () =>
    toast.success('Review was added successfully', {
      containerId: 'ToastSuccess',
    })

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    if (newText.length <= 500) {
      setReviewText(newText)
      setCharacterCount(500 - newText.length)
    }
  }

  const handleReviewSubmit = async () => {
    try {
      if (rating == 0) {
        setErrorText('Select a rating before submitting')
        return
      }
      const success = await fetchAddReview(book.id, reviewText, rating)
      if (success) {
        setRating(0)
        setReviewText('')
        setErrorText('')
        setReviewVisible(false)
        loadReviewsAndRating()
        SuccessMessage()
        setReviewListVisible(true)
      } else {
        console.error('Failed to add review')
      }
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  return (
    <Stack direction="column" spacing={1}>
      {isReviewVisible && (
        <>
          <div style={{ marginTop: '50px' }} />
          <TextField
            label="Write your review here..."
            multiline
            rows={4}
            fullWidth
            value={reviewText}
            onChange={handleReviewTextChange}
            margin="normal"
            variant="outlined"
            helperText={`${characterCount} characters left`}
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
          {errorText && (
            <Typography variant="body2" color="error">
              {errorText}
            </Typography>
          )}
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
  )
}

export default BookReviewForm
