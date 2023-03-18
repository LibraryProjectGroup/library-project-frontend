import { FC } from "react";
import {
  Modal,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from "../../../sxStyles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  bookId: number;
  fetchCreateBorrow: Function;
  fetchBooks: Function;
  fetchBorrows: Function;
}

const ReserveBook: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  bookId,
  fetchCreateBorrow,
  fetchBooks,
  fetchBorrows,
}: IProps): JSX.Element => {
    const RevervationMessage = () => toast.success("Reservation succeeded");

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
              Do you want to reserve this book?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={async () => {
                await fetchCreateBorrow(bookId);
                await fetchBooks();
                await fetchBorrows();
                setVisible(false);
                RevervationMessage();
              }}
            >
              Reserve
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

export default ReserveBook;