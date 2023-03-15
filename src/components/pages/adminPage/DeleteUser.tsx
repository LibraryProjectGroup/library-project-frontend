import { useState, FC } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from "../../../sxStyles";
import {
  fetchDeleteUser,
} from "../../../fetchFunctions";
import { fetchAddBookRequest } from "../../../fetchFunctions";

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  userId: String;
  deleteUser: Function;
}

const DeleteUsers: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  userId,
  deleteUser,
}: IProps): JSX.Element => {
  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Typography
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}
              >
                Do you want to delete this user?
              </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={() => {
                console.log(userId);
                deleteUser(userId);
                setVisible(false);
              }}
            >
              Delete
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
  );
};

export default DeleteUsers;