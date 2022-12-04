import { useState, FC, useContext, useEffect } from "react";
import {
    fetchUserCurrentBookReservations,
    fetchCancelBookReservation
} from "../../../fetchFunctions";
import ExtendedReservation from "../../../interfaces/extendedReservation.interface";
import { TheContext } from "../../../TheContext";
import { Paper, Stack, Typography, Button, Fab, Box } from "@mui/material";
import { listBooksDeleteButton, userPageBackButton } from "../../../sxStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserReservations: FC = (): JSX.Element => {
    const [reservations, setReservations] = useState<ExtendedReservation[]>([]);
    const context = useContext(TheContext);
    const navigate = useNavigate();

    const loanOverdue = (dueDate: string) => {
        const dueDateNextDay = new Date(dueDate).getTime() + 86400000;
        return new Date().getTime() > dueDateNextDay;
    };

    useEffect(() => {
        fetchReservations(context?.user?.id);
    }, [context]);

    const fetchReservations = async (userId: number | null | undefined) => {
        if (userId) {
            const reservations: ExtendedReservation[] =
                await fetchUserCurrentBookReservations(userId);
            console.log(reservations);
            if (reservations) {
                setReservations(reservations);
            }
        }
    };

    const renderReservationData = (
        reservation: ExtendedReservation,
        index: number
    ) => {
        return (
            <Paper elevation={10} sx={{ padding: "2rem" }} key={index}>
                <Stack direction="row" justifyContent="space-between">
                    <Stack sx={{ alignSelf: "center" }}>
                        <Typography
                            sx={{
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                marginBottom: 2
                            }}
                        >
                            {reservation.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Merriweather",
                                fontWeight: "light",
                                marginBottom: 3
                            }}
                        >
                            {"Reserved: " +
                                new Date(
                                    reservation.reservationDatetime
                                ).toLocaleString("fi", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                })}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Merriweather",
                                fontWeight: "light",
                                marginBottom: 3,
                                color:
                                    reservation.returnDate === null &&
                                    loanOverdue(reservation.dueDate)
                                        ? "red"
                                        : null
                            }}
                        >
                            {reservation.returnDate === null
                                ? "Loan due: " +
                                  new Date(reservation.dueDate).toLocaleString(
                                      "fi",
                                      {
                                          year: "numeric",
                                          month: "numeric",
                                          day: "numeric"
                                      }
                                  )
                                : `Returned: ${new Date(
                                      reservation.dueDate
                                  ).toLocaleString("fi", {
                                      year: "numeric",
                                      month: "numeric",
                                      day: "numeric"
                                  })}`}
                        </Typography>
                        <Button
                            sx={listBooksDeleteButton}
                            variant="contained"
                            color="error"
                            onClick={async () => {
                                if (
                                    window.confirm("Cancel this reservation?")
                                ) {
                                    const response =
                                        await fetchCancelBookReservation(
                                            reservation.id
                                        );
                                    if (response.ok)
                                        fetchReservations(context?.user?.id);
                                }
                            }}
                        >
                            Cancel reservation
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        );
    };

    return (
        <Box sx={{ marginTop: 5, marginBottom: 5, position: "relative" }}>
            <Fab
                aria-label="back"
                sx={userPageBackButton}
                onClick={() => {
                    navigate(-1);
                }}
            >
                <ArrowBackIcon />
            </Fab>
            {reservations ? (
                reservations?.map((reservation, index) =>
                    renderReservationData(reservation, index)
                )
            ) : (
                <div
                    style={{
                        width: "100%",
                        textAlign: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Merriweather",
                            fontWeight: "light",
                            fontSize: 25
                        }}
                    >
                        You have no current book reservations
                    </Typography>
                </div>
            )}
        </Box>
    );
};

export default UserReservations;
