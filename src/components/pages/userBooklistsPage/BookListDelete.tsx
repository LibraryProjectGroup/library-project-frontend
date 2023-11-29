import { FC } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { cancelButton, confirmButton, popupContainer } from '../../../sxStyles'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface DeleteBookListProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  bookListId: number
  fetchDeleteBookList: Function
  updateBookLists: () => Promise<void>
}

const DeleteBookList: FC<DeleteBookListProps> = ({
  visible,
  setVisible,
  bookListId,
  fetchDeleteBookList,
  updateBookLists,
}: DeleteBookListProps): JSX.Element => {
  const deletionMessage = () =>
    toast.success('List deleted successfully', { containerId: 'ToastSuccess' })
  const ErrorMessage = () =>
    toast.error('Deletion failed', { containerId: 'ToastAlert' })
  const handleClose = () => {
    setVisible(false)
  }

  async function deleteBookList(bookListId: number) {
    const success = await fetchDeleteBookList(bookListId)
    if (success) {
      deletionMessage()
    } else {
      ErrorMessage()
    }
    await updateBookLists()
    setVisible(false)
  }

  return (
    <Modal open={visible} onClose={handleClose}>
      <Box sx={popupContainer}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Typography
              sx={{
                fontFamily: 'Merriweather',
                fontWeight: 'light',
              }}
            >
              Do you want to delete this list?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={confirmButton}
              variant="contained"
              color="primary"
              onClick={() => deleteBookList(bookListId)}
            >
              Delete
            </Button>
            <Button sx={cancelButton} variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default DeleteBookList
