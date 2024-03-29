import { FC, useContext } from 'react'
import { Modal, Box, Button, Stack, Typography } from '@mui/material'
import { popupContainer, confirmButton, cancelButton } from '../../../sxStyles'
import { toast } from 'react-toastify'
import { TheContext } from '../../../TheContext'

import 'react-toastify/dist/ReactToastify.css'

interface IProps {
  deleteVisible: boolean
  setDeleteVisible: Function
  loanVisible: boolean
  setLoanVisible: Function
  reserveVisible: boolean
  setReserveVisible: Function
  bookId: number
  fetchBooks: Function
  fetchDeleteBook: Function
  fetchCreateBorrow: Function
  fetchBorrows: Function
  fetchReservations: Function
  fetchAddBookReservation: Function
}

const ButtonPopup: FC<IProps> = ({
  deleteVisible,
  setDeleteVisible,
  loanVisible,
  setLoanVisible,
  reserveVisible,
  setReserveVisible,
  bookId,
  fetchBooks,
  fetchDeleteBook,
  fetchCreateBorrow,
  fetchBorrows,
  fetchReservations,
  fetchAddBookReservation,
}: IProps): JSX.Element => {
  const DeletionMessage = () =>
    toast.success('Book deleted successfully', { containerId: 'ToastSuccess' })
  const RevervationMessage = () =>
    toast.success('Reservation successful', { containerId: 'ToastSuccess' })
  const LoanMessage = () =>
    toast.success('Loaning successful', { containerId: 'ToastSuccess' })
  const ErrorMessageDelete = () =>
    toast.error('Deletion failed, Something went wrong', {
      containerId: 'ToastAlert',
    })
  const ErrorMessageReserve = () =>
    toast.error('Reservation failed, Something went wrong', {
      containerId: 'ToastAlert',
    })
  const ErrorMessageLoan = () =>
    toast.error('Loaning failed, Something went wrong', {
      containerId: 'ToastAlert',
    })
  const context = useContext(TheContext)

  const deleteBook = async () => {
    await fetchDeleteBook(bookId).then((res: { ok: any }) => {
      console.log(bookId)
      if (!res.ok) {
        ErrorMessageDelete()
      } else {
        DeletionMessage()
      }
    })
    await fetchBooks()
    setDeleteVisible(false)
  }

  const loanBook = async () => {
    await fetchCreateBorrow(bookId).then((res: { ok: any }) => {
      console.log(bookId)
      if (!res.ok) {
        ErrorMessageLoan()
      } else {
        LoanMessage()
      }
    })
    await fetchBooks()
    await context?.fetchBorrows()
    await fetchBorrows()
    setLoanVisible(false)
  }

  const reserveBook = async () => {
    await fetchAddBookReservation(bookId).then((res: { ok: any }) => {
      console.log(bookId)
      if (!res.ok) {
        ErrorMessageReserve()
      } else {
        RevervationMessage()
      }
    })
    await fetchBooks()
    await fetchReservations()
    setReserveVisible(false)
  }

  return (
    <>
      <Modal open={deleteVisible} onClose={() => setDeleteVisible(false)}>
        <Box sx={popupContainer}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography
                sx={{
                  fontFamily: 'Merriweather',
                  fontWeight: 'light',
                }}
              >
                Do you want to delete this book?
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={confirmButton}
                variant="contained"
                onClick={async () => {
                  deleteBook()
                }}
              >
                Delete
              </Button>
              <Button
                sx={cancelButton}
                variant="contained"
                onClick={() => setDeleteVisible(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Modal open={loanVisible} onClose={() => setLoanVisible(false)}>
        <Box sx={popupContainer}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography
                sx={{
                  fontFamily: 'Merriweather',
                  fontWeight: 'light',
                }}
              >
                Do you want to loan this book?
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={confirmButton}
                variant="contained"
                onClick={async () => {
                  loanBook()
                }}
              >
                Loan
              </Button>
              <Button
                sx={cancelButton}
                variant="contained"
                onClick={() => setLoanVisible(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Modal open={reserveVisible} onClose={() => setReserveVisible(false)}>
        <Box sx={popupContainer}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography
                sx={{
                  fontFamily: 'Merriweather',
                  fontWeight: 'light',
                }}
              >
                Do you want to reserve this book?
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={confirmButton}
                variant="contained"
                onClick={async () => {
                  reserveBook()
                }}
              >
                Reserve
              </Button>
              <Button
                sx={cancelButton}
                variant="contained"
                onClick={() => setReserveVisible(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default ButtonPopup
