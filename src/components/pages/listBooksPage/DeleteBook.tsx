import { FC } from "react";
import {
  Modal,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import {
  BookBox,
  ConfirmButton,
  CancelButton,
} from "../../../sxStyles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  bookId: number;
  fetchDeleteBook: Function;
  fetchBooks: Function;
}

const DeleteBook: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  bookId,
  fetchDeleteBook,
  fetchBooks,
}: IProps): JSX.Element => {
  const deletionMessage = () => toast.success("Deletion succeeded");

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={BookBox}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
              }}
            >
              Do you want to delete this book?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={ConfirmButton}
              variant="contained"
              onClick={async () => {
                await fetchDeleteBook(bookId);
                await fetchBooks();
                setVisible(false);
                deletionMessage();
              }}
            >
              Delete
            </Button>
            <Button
              sx={CancelButton}
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

export default DeleteBook;