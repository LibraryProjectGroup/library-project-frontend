import { FC } from 'react'
import { Modal, Box, Button, Stack, Typography } from '@mui/material'
import { popupContainer, confirmButton, cancelButton } from '../../../sxStyles'

interface BookReviewDeleteProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

const BookReviewDelete: FC<BookReviewDeleteProps> = ({
  open,
  onClose,
  onDelete,
}) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={popupContainer}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Typography
            sx={{
              fontFamily: 'Merriweather',
              fontWeight: 'light',
            }}
          >
            Do you want to delete this review?
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            sx={confirmButton}
            variant="contained"
            onClick={() => onDelete()}
          >
            Delete
          </Button>
          <Button sx={cancelButton} variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
)

export default BookReviewDelete
