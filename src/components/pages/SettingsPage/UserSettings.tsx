import { FC, useEffect, useState } from 'react'
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
import { fetchAllHomeOffices } from '../../../fetchFunctions'
import { toast } from 'react-toastify'
import { cancelButton, confirmButton } from '../../../sxStyles'
import OfficeSpan from '../../OfficeSpan'

interface Props {
  user: User | null
  setOneUserData: Function
  updateUser: Function
}

const UserSettings: FC<Props> = ({
  user,
  setOneUserData,
  updateUser,
}: Props): JSX.Element => {
  const [offices, setOffices] = useState<HomeOffice[]>([])
  const [isDataChanged, setIsDataChanged] = useState(false)

  useEffect(() => {
    ;(async () => {
      setOffices(await fetchAllHomeOffices())
    })()
  }, [])

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOneUserData({
      ...user,
      [event.target.name]: event.target.value,
    })
    setIsDataChanged(true)
  }

  const editingMessage = () => {
    if (isDataChanged) {
      toast.success('User edited succesfully', { containerId: 'ToastSuccess' })
    }
  }

  /* const onModalClose = () => {
    setVisible(false)
    setIsDataChanged(false)
  } */

  if (user == null) return <></>

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ marginTop: 7, width: '70%' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h4">
          User Settings
        </Typography>
        <TextField
          label="Username"
          name="username"
          value={user?.username}
          onChange={(e) => onChange(e)}
        />
        <TextField
          label="Email"
          name="email"
          value={user?.email}
          onChange={(e) => onChange(e)}
        />
        <TextField
          select
          label="Office"
          name="homeOfficeId"
          value={user?.homeOfficeId}
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
              updateUser(user)
              editingMessage()
              setIsDataChanged(false)
            }}
          >
            Update
          </Button>
          {/*  <Button
              sx={cancelButton}
              variant="contained"
              onClick={() => onModalClose()}
            >
              Cancel
            </Button> */}
        </Stack>
      </Paper>
    </Box>
  )
}

export default UserSettings
