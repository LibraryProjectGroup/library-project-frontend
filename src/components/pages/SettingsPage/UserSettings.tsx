import { FC, useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import User from '../../../interfaces/editUser.interface'
import { HomeOffice } from '../../../interfaces/HomeOffice'
import { useNavigate } from 'react-router-dom'
import {
  fetchAllHomeOffices,
  fetchDeleteUser,
  fetchUpdateUserData,
  fetchUserById,
} from '../../../fetchFunctions'
import { toast } from 'react-toastify'
import { confirmButton } from '../../../sxStyles'
import OfficeSpan from '../../OfficeSpan'
import { TheContext } from '../../../TheContext'
import ToastContainers from '../../../ToastContainers'
import { endSession } from '../../../auth'

const UserSettings: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const context = useContext(TheContext)
  const [offices, setOffices] = useState<HomeOffice[]>([])
  const [isDataChanged, setIsDataChanged] = useState(false)
  const [userDataFromApi, setUserDataFromApi] = useState<User | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [checkDelete, setCheckDelete] = useState<boolean>(false)
  const ErrorMessage = () =>
    toast.error(
      'Deletion failed, check that you have returned all loaned books before deleting user!',
      { containerId: 'ToastAlert' }
    )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Fetch user data from the API
    if (context?.user?.id) {
      ;(async () => {
        if (!context?.user?.id) return
        const userData = await fetchUserById(context.user.id)
        setUserDataFromApi(userData)
      })()
    }
  }, [context?.user?.id])

  useEffect(() => {
    // Set initial userData and handle null value for homeOfficeId
    if (userDataFromApi) {
      const updatedUserData = {
        ...userDataFromApi,
        homeOfficeId:
          userDataFromApi.homeOfficeId === null
            ? 0
            : userDataFromApi.homeOfficeId,
      }
      setUserData(updatedUserData)
    }
  }, [userDataFromApi])
  //FETCH ALL OFFICES
  useEffect(() => {
    ;(async () => {
      setOffices(await fetchAllHomeOffices())
    })()
  }, [])
  //HANDLE USER INPUT CHANGE
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!userData) return
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    })
    setIsDataChanged(true)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  //LOGOUT
  const handleLogout = () => {
    endSession()
    context?.setIsLogin(false)
    navigate('/login?deletionStatus=success')
  }

  //UPDATE USER
  const updateUser = async (editedUser: User) => {
    const ok = await fetchUpdateUserData(editedUser)
    if (ok?.ok) {
      toast.success('User edited succesfully', { containerId: 'ToastSuccess' })
    } else {
      console.log('Failed to update user')
    }
  }
  const handleUpdate = () => {
    if (isDataChanged && userData) {
      updateUser(userData)
      setIsDataChanged(false)
    } else {
      console.log('No changes to update')
    }
  }
  //DELETE USER
  const deleteUser = async () => {
    if (!userData) return
    await fetchDeleteUser(userData?.id).then((res: { ok: any }) => {
      if (!res.ok) {
        ErrorMessage()
      } else {
        handleLogout()
      }
    })
    handleClose()
  }

  if (userData == null) return <></>

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ marginTop: 7, width: '70%' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            User Settings
          </Typography>
          <TextField
            sx={{ width: { xs: '100%', md: '40%' } }}
            disabled
            label="Username"
            name="username"
            value={userData?.username}
          />
          <TextField
            sx={{ width: { xs: '100%', md: '40%' } }}
            disabled
            label="Email"
            name="email"
            value={userData?.email}
          />
          <TextField
            sx={{ width: { xs: '100%', md: '40%' } }}
            select
            label="Set home office"
            name="homeOfficeId"
            value={userData?.homeOfficeId}
            onChange={(e) => onChange(e)}
          >
            <MenuItem value={0} key={0}>
              <OfficeSpan countryCode="" officeName="Unknown" />
            </MenuItem>
            {offices.map(({ id, name, countryCode }) => (
              <MenuItem value={id} key={id}>
                <OfficeSpan countryCode={countryCode} officeName={name} />
              </MenuItem>
            ))}
          </TextField>
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              disabled={!isDataChanged}
              sx={confirmButton}
              variant="contained"
              onClick={() => {
                handleUpdate()
              }}
            >
              Update
            </Button>
            <Button variant="contained" color="error" onClick={handleOpen}>
              Delete User
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <b>Are you sure you want to delete this user?</b>
                </DialogContentText>
                <DialogContentText>
                  <b>Write "delete" to confirm!</b>
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="delete"
                  label="Write here..."
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    if (e.target.value.toUpperCase() === 'DELETE') {
                      setCheckDelete(true)
                    } else {
                      setCheckDelete(false)
                    }
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteUser}
                  variant="contained"
                  color="error"
                  disabled={!checkDelete}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Stack>
        <ToastContainers />
      </Paper>
    </Box>
  )
}

export default UserSettings
