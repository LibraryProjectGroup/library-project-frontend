import { FC, useContext } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";
import { TheContext } from "../../../TheContext";
import { popupContainer, confirmButton, cancelButton } from "../../../sxStyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  visible: boolean;
  setVisible: Function;
  borrowedId: number;
  fetchReturnBorrowed: Function;
  fetchBorrows: Function;
}

const ReturnBook: FC<IProps> = ({
  visible,
  setVisible,
  borrowedId,
  fetchReturnBorrowed,
  fetchBorrows,
}: IProps): JSX.Element => {
  const ReturnMessage = () =>
    toast.success("Book returned successfully", {
      containerId: "ToastSuccess",
    });
  const ErrorMessage = () =>
    toast.error("Return failed", { containerId: "ToastAlert" });
  const context = useContext(TheContext);

  const returnBook = async () => {
    await fetchReturnBorrowed(borrowedId).then((res: { ok: any }) => {
      if (!res.ok) {
        ErrorMessage();
      } else {
        ReturnMessage();
      }
    });
    await context?.fetchBorrows();
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
              Do you want to return this book?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={confirmButton}
              variant="contained"
              onClick={async () => {
                returnBook();
              }}
            >
              Return
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

export default ReturnBook;
