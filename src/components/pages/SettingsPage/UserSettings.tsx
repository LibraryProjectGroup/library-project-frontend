import { FC, useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import User from '../../../interfaces/editUser.interface'
import { HomeOffice } from '../../../interfaces/HomeOffice'
import {
  fetchAllHomeOffices,
  fetchUpdateUserData,
  fetchUserById,
} from '../../../fetchFunctions'
import { toast } from 'react-toastify'
import { confirmButton } from '../../../sxStyles'
import OfficeSpan from '../../OfficeSpan'
import { TheContext } from '../../../TheContext'

const UserSettings: FC = (): JSX.Element => {
  const context = useContext(TheContext)

  const [offices, setOffices] = useState<HomeOffice[]>([])
  const [isDataChanged, setIsDataChanged] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)
  /*  const [usersData, setUsersData] = useState<User[]>([]) */

  useEffect(() => {
    ;(async () => {
      if (context?.user?.id) setUserData(await fetchUserById(context?.user?.id))
    })()
  }, [context?.user?.id])

  useEffect(() => {
    ;(async () => {
      setOffices(await fetchAllHomeOffices())
    })()
  }, [])

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

  const editingMessage = () => {
    if (isDataChanged) {
      toast.success('User edited succesfully', { containerId: 'ToastSuccess' })
    }
  }

  /*   const loadUserData = async () => {
      const userTmp = await fetchUserById(userData?.id)
      setUserData(userTmp)
    }
  
    useEffect(() => {
      loadUserData()
    }, []) */

  /*  const loadUsersData = async () => {
     const usersTmp = await fetchAllUsers()
     setUsersData(usersTmp)
   } */

  /*  const updateUser = async (editedUser: User) => {
     const ok = await fetchAdminUpdateUserData(editedUser)
     if (ok?.ok) {
       await loadUsersData()
     }
   } */

  console.log(userData)
  if (userData == null) return <></>

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ marginTop: 7, width: '70%' }}>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            User Settings
          </Typography>
          <TextField
            disabled
            label="Username"
            name="username"
            value={userData?.username}
            onChange={(e) => onChange(e)}
          />
          <TextField
            disabled
            label="Email"
            name="email"
            value={userData?.email}
            onChange={(e) => onChange(e)}
          />
          <TextField
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
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              disabled={!isDataChanged}
              sx={confirmButton}
              variant="contained"
              onClick={() => {
                fetchUpdateUserData(userData)
                editingMessage()
                setIsDataChanged(false)
              }}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default UserSettings
