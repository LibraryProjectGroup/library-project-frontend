import React, { useState, FC, useContext, useEffect } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";
import { TheContext } from "../../../TheContext";
import {
  editBookBox,
  editBookUpdateButton,
  editBookCancelButton,
} from "../../../sxStyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  borrowedId: number;
  fetchReturnBorrowed: Function;
  fetchBorrows: Function;
}

const ReturnBook: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  borrowedId,
  fetchReturnBorrowed,
  fetchBorrows,
}: IProps): JSX.Element => {
  const ReturnMessage = () => toast.success("Returning successful");
  const context = useContext(TheContext);

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
              Do you want to return this book?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={editBookUpdateButton}
              variant="contained"
              onClick={async () => {
                await fetchReturnBorrowed(borrowedId);
                await context?.fetchBorrows();
                setVisible(false);
                ReturnMessage();
              }}
            >
              Return
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

export default ReturnBook;
