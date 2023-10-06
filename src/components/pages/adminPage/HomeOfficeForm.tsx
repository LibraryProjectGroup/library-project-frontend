import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// @ts-ignore
import * as countries from "iso-3166-1-codes";
import React, { ChangeEvent } from "react";
import { HomeOffice } from "../../../interfaces/HomeOffice";
import {
  editUserBox,
  editUserCancelButton,
  editUserUpdateButton,
} from "../../../sxStyles";
import CountrySpan from "../../CountrySpan";

type Props = {
  visible: boolean;
  setVisible: Function;
  homeOffice: HomeOffice | null;
  setHomeOfficeData: Function;
  updateHomeOffice: Function;
  addHomeOffice: Function;
  editing: boolean;
};

export default function EditHomeOffice({
  visible,
  setVisible,
  homeOffice,
  setHomeOfficeData,
  updateHomeOffice,
  addHomeOffice,
  editing,
}: Props): JSX.Element | null {
  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setHomeOfficeData({
      ...homeOffice,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (homeOffice !== null) {
      editing ? updateHomeOffice(homeOffice) : addHomeOffice(homeOffice);
    }
  };

  function hide() {
    setVisible(false);
  }

  if (homeOffice == null) {
    return null;
  }

  return (
    <Modal open={visible} onClose={hide}>
      <form onSubmit={handleSubmit}>
        <Box sx={editUserBox}>
          <Stack spacing={2}>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
              }}
              variant="h4"
            >
              {editing ? "Edit Office" : "Add Office"}
            </Typography>
            <TextField
              select
              label="Country"
              name="countryCode"
              value={homeOffice.countryCode}
              onChange={(e) => onChange(e)}
            >
              {
                // @ts-ignore
                countries.map(({ alpha3, name }) => {
                  return (
                    <MenuItem value={alpha3}>
                      <CountrySpan countryCode={alpha3} includeFlag={true} />
                    </MenuItem>
                  );
                })
              }
            </TextField>
            <TextField
              label="Name"
              name="name"
              value={homeOffice.name}
              onChange={(e) => onChange(e)}
            />

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                sx={editUserUpdateButton}
                variant="contained"
                type="submit"
              >
                {editing ? "Update" : "Add"}
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
      </form>
    </Modal>
  );
}
