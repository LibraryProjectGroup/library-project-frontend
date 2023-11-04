import React, { useState } from 'react'
import Book from '../../../interfaces/book.interface'
import {
  editBookCancelButton,
  editBookListUpdateButton,
} from '../../../sxStyles'
import { fetchAddReview } from '../../../fetchFunctions'
import { Stack, TextField, Typography, Rating, Button } from '@mui/material'

interface BookReviewFormProps {
  book: Book
  isReviewVisible: boolean
  setReviewVisible: (value: boolean) => void
  loadReviewsAndRating: () => void
}

const BookReviewForm: React.FC<BookReviewFormProps> = ({
  book,
  isReviewVisible,
  setReviewVisible,
  loadReviewsAndRating,
}) => {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState<number>(0)

  const handleReviewSubmit = async () => {
    try {
      const success = await fetchAddReview(book.id, reviewText, rating)
      if (success) {
        setRating(0)
        setReviewText('')
        setReviewVisible(false)
        loadReviewsAndRating()
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
  )
}

export default BookReviewForm
