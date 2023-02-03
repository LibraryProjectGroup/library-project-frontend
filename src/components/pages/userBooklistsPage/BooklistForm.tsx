import { useState, FC } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from "../../../sxStyles";
import {
  fetchUpdateBooklist,
  fetchCreateBooklist,
} from "../../../fetchFunctions";
import Book_list from "../../../interfaces/book_list.interface";

interface IProps {
  visible: boolean;
  setVisible: Function;
  booklist: Book_list | null;
  setBooklist: Function;
  editing: boolean;
  updateBooklists: Function;
}

const EditBooklist: FC<IProps> = ({
  visible,
  setVisible,
  booklist,
  setBooklist,
  editing,
  updateBooklists,
}: IProps): JSX.Element => {
  const updateBooklist = async (newBooklist: Book_list) => {
    const response = await fetchUpdateBooklist(newBooklist);
    if (response.ok) {
      setVisible(false);
      updateBooklists();
    }
  };

  const addBooklist = async (newBooklist: Book_list) => {
    const response = await fetchCreateBooklist(newBooklist);
    if (response.ok) {
      setVisible(false);
      updateBooklists();
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBooklist({
      ...booklist,
      [event.target.name]: event.target.value,
    });
  };

  if (booklist == null) return <></>;

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            {editing ? `Edit ${booklist.name}` : "Add new booklist"}
          </Typography>
          <TextField
            label="List Name"
            name="name"
            value={booklist.name}
            onChange={(e) => onChange(e)}
          />

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={() =>
                editing ? updateBooklist(booklist) : addBooklist(booklist)
              }
            >
              {editing ? "Update" : "Add"}
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

export default EditBooklist;
