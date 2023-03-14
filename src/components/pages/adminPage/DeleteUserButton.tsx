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
import id from "../../../interfaces/user.interface";

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  userId: id | null;
}

const DeleteUsers: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  userId,
}: IProps): JSX.Element => {
  const deleteUser = async (deleteUser: id) => {
    const response = await fetchDeleteUser(deleteUser);
    if (response.ok) {
      setVisible(false);
    }
  };

  const handleOpen = () => {
    setConfirmation({
      ok: true,
      message: "Book request has been submitted",
    });
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={() => {
                deleteUser(deleteUser);
                handleOpen();
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