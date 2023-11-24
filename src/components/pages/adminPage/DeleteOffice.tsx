import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cancelButton, confirmButton, popupContainer } from '../../../sxStyles'

interface IProps {
  visible: boolean
  setVisible: Function
  homeOfficeId: number
  fetchDeleteHomeOffice: Function
  loadHomeOfficeData: Function
}

const DeleteOffice: FC<IProps> = ({
  visible,
  setVisible,
  homeOfficeId,
  fetchDeleteHomeOffice,
  loadHomeOfficeData,
}: IProps): JSX.Element => {
  const deletionMessage = () =>
    toast.success('Office deleted successfully', {
      containerId: 'ToastSuccess',
    })
  const ErrorMessage = () =>
    toast.error('Deletion failed', { containerId: 'ToastAlert' })

  const deleteHomeOffice = async () => {
    await fetchDeleteHomeOffice(homeOfficeId).then((res: { ok: any }) => {
      if (res.ok) {
        ErrorMessage()
      } else {
        deletionMessage()
      }
    })
    await loadHomeOfficeData()
    setVisible(false)
  }

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={popupContainer}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Typography
              sx={{
                fontFamily: 'Merriweather',
                fontWeight: 'light',
              }}
            >
              Do you want to delete this office?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={confirmButton}
              variant="contained"
              onClick={async () => {
                deleteHomeOffice()
              }}
            >
              Delete
            </Button>
            <Button
              sx={cancelButton}
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

export default DeleteOffice
