import { useState, FC } from 'react'
import { Modal, Box, Button, TextField, Stack, Typography } from '@mui/material'
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from '../../../sxStyles'
import { fetchAddBookRequest } from '../../../fetchFunctions'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

interface IProps {
  visible: boolean
  setVisible: Function
  confirmation: Object
  setConfirmation: Function
}

const RequestBook: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
}: IProps): JSX.Element => {
  const [isbn, setIsbn] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [reason, setReason] = useState<string>('')

  const SuccessMessage = () =>
    toast.success('Book request has been submitted', {
      containerId: 'ToastSuccess',
    })

  const ErrorMessage = () =>
    toast.error('Book request failed, Something went wrong', {
      containerId: 'ToastAlert',
    })

  const requestBook = async () => {
    try {
      const res = await fetchAddBookRequest(isbn, title, reason)
      if (res.ok) {
        SuccessMessage()
        setVisible(false)
      } else {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      ErrorMessage()
    }
  }

  const handleOpen = () => {
    setConfirmation({
      ok: true,
      message: 'Book request has been submitted',
    })
  }

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
            }}
            variant="h4"
          >
            Request a Book
          </Typography>
          <TextField
            label="ISBN"
            name="isbn"
            onChange={(e) => setIsbn(e.target.value)}
          />
          <TextField
            label="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Reason"
            name="reason"
            onChange={(e) => setReason(e.target.value)}
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={() => {
                requestBook()
              }}
            >
              Add
            </Button>
            <Button
              sx={editBookCancelButton}
              variant="contained"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default RequestBook
