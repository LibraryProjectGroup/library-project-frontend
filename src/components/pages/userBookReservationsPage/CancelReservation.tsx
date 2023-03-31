import { FC, useContext } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";
import { TheContext } from "../../../TheContext";
import { popupContainer, confirmButton, cancelButton } from "../../../sxStyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  visible: boolean;
  setVisible: Function;
  reservationId: number;
  fetchCancelBookReservation: Function;
  fetchReservations: Function;
}

const CancelReservation: FC<IProps> = ({
  visible,
  setVisible,
  reservationId,
  fetchCancelBookReservation,
  fetchReservations,
}: IProps): JSX.Element => {
  const CancelMessage = () =>
    toast.success("Cancellation successful", { containerId: "ToastSuccess" });
  const ErrorMessage = () =>
    toast.error("Reservation failed", { containerId: "ToastAlert" });
  const context = useContext(TheContext);

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
              Do you want to cancel your reservation?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={confirmButton}
              variant="contained"
              color="error"
              onClick={async () => {
                const response = await fetchCancelBookReservation(
                  reservationId
                );
                if (response.ok) fetchReservations(context?.user?.id);
                setVisible(false);
                CancelMessage();
              }}
            >
              Cancel reservation
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

export default CancelReservation;
