import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
// @ts-ignore
import * as countries from 'iso-3166-1-codes'
import { ChangeEvent } from 'react'
import { HomeOffice } from '../../../interfaces/HomeOffice'
import {
  editUserBox,
  editUserCancelButton,
  editUserUpdateButton,
} from '../../../sxStyles'
import CountrySpan from '../../CountrySpan'

type Props = {
  visible: boolean
  setVisible: Function
  homeOffice: HomeOffice | null
  setEditingHomeOfficeData: Function
  updateHomeOffice: Function
}

export default function EditHomeOffice({
  visible,
  setVisible,
  homeOffice,
  setEditingHomeOfficeData,
  updateHomeOffice,
}: Props): JSX.Element | null {
  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEditingHomeOfficeData({
      ...homeOffice,
      [event.target.name]: event.target.value,
    })
  }

  function hide() {
    setVisible(false)
  }

  if (homeOffice == null) {
    return null
  }

  return (
    <Modal open={visible} onClose={hide}>
      <Box sx={editUserBox}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
            }}
            variant="h4"
          >
            Edit Office
          </Typography>
          <TextField
            select
            label="Country"
            name="countryCode"
            value={homeOffice?.countryCode}
            onChange={(e) => onChange(e)}
          >
            {
              // @ts-ignore
              countries.map(({ alpha3, name }) => {
                return (
                  <MenuItem value={alpha3}>
                    <CountrySpan countryCode={alpha3} includeFlag={true} />
                  </MenuItem>
                )
              })
            }
          </TextField>
          <TextField
            label="Name"
            name="name"
            value={homeOffice?.name}
            onChange={(e) => onChange(e)}
          />

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editUserUpdateButton}
              variant="contained"
              onClick={() => updateHomeOffice(homeOffice)}
            >
              Update
            </Button>
            <Button
              sx={editUserCancelButton}
              variant="contained"
              onClick={hide}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
