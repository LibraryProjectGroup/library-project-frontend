import { useState, FC, useContext, useEffect } from "react";
import {
    fetchUserCurrentBookReservations,
    fetchCancelBookReservation
} from "../../../fetchFunctions";
import ExtendedReservation from "../../../interfaces/extendedReservation.interface";
import { TheContext } from "../../../TheContext";
import { Paper, Stack, Typography, Button, Fab } from "@mui/material";
import { listBooksDeleteButton, userPageBackButton } from "../../../sxStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserReservations: FC = (): JSX.Element => {
    const [reservations, setReservations] = useState<ExtendedReservation[]>([]);
    const context = useContext(TheContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReservations(context?.user?.id);
    }, [context]);

    const fetchReservations = async (userId: number | null | undefined) => {
        console.log("Reservations fetch");
        userId &&
            setReservations(await fetchUserCurrentBookReservations(userId));
    };

    const renderReservationData = (reservation: ExtendedReservation) => {
        return (
            <Paper elevation={10} sx={{ padding: "2rem" }}>
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
        <div>
            <Fab
                aria-label="back"
                sx={userPageBackButton}
                onClick={() => {
                    navigate("/user");
                }}
            >
                <ArrowBackIcon />
            </Fab>
            {reservations ? (
                reservations.map((reservation) =>
                    renderReservationData(reservation)
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
        </div>
    );
};

export default UserReservations;
