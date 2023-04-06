import { useState, FC } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";
import { popupContainer, confirmButton, cancelButton } from "../../../sxStyles";
import { fetchDeleteUser } from "../../../fetchFunctions";
import { fetchAddBookRequest } from "../../../fetchFunctions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  visible: boolean;
  setVisible: Function;
  userId: String;
  fetchDeleteUser: Function;
  loadUsersData: Function;
}

const DeleteUsers: FC<IProps> = ({
  visible,
  setVisible,
  userId,
  fetchDeleteUser,
  loadUsersData,
}: IProps): JSX.Element => {
  const deletionMessage = () =>
    toast.success("User deleted successfully", { containerId: "ToastSuccess" });
  const ErrorMessage = () =>
    toast.error("Deletion failed", { containerId: "ToastAlert" });

  const deleteUser = async () => {
    await fetchDeleteUser(userId).then((res: { ok: any }) => {
      if (!res.ok) {
        ErrorMessage();
      } else {
        deletionMessage();
      }
    });
    //deleteUser(userId);
    await loadUsersData();
    setVisible(false);
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={popupContainer}>
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
              sx={confirmButton}
              variant="contained"
              onClick={async () => {
                deleteUser();
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
  );
};

export default DeleteUsers;
