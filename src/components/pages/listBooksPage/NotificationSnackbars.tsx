import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface NotificationSnackbarsProps {
  open: string;
  handleClose: () => void;
}

const NotificationSnackbars: React.FC<NotificationSnackbarsProps> = ({
  open,
  handleClose,
}) => {
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Snackbar
        open={open === "expiring"}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
        >
          You have expiring loan(s)
        </Alert>
      </Snackbar>
      <Snackbar
        open={open === "expired"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }} variant="filled">
          YOU HAVE EXPIRED LOAN(S)
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationSnackbars;
