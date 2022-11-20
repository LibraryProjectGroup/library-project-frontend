import { useState, FC, useContext, useEffect } from "react";
import {
    fetchUserCurrentBookReservations,
    fetchCancelBookReservation
} from "../../../fetchFunctions";
import JoinedReservation from "../../../interfaces/joinedReservation.interface";
import { TheContext } from "../../../TheContext";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { listBooksDeleteButton } from "../../../sxStyles";
import userEvent from "@testing-library/user-event";

const UserReservations: FC = (): JSX.Element => {
    const [reservations, setReservations] = useState<JoinedReservation[]>([]);
    const context = useContext(TheContext);

    useEffect(() => {
        fetchReservations(context?.user?.id);
    }, []);

    useEffect(() => {
        console.log(reservations);
    }, [reservations]);

    const fetchReservations = async (userId: number | null | undefined) => {
        if (userId) {
            setReservations(await fetchUserCurrentBookReservations(userId));
        }
    };

    const renderReservationData = (reservation: JoinedReservation) => {
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
                                fontWeight: "light"
                            }}
                        >
                            {reservation.reservationDatetime.toLocaleString(
                                "fi",
                                {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric"
                                }
                            )}
                        </Typography>
                        <Button
                            sx={listBooksDeleteButton}
                            variant="contained"
                            color="error"
                            onClick={async () => {
                                const response =
                                    await fetchCancelBookReservation(
                                        reservation.id
                                    );
                                if (response.ok)
                                    fetchReservations(context?.user?.id);
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
            {reservations.map((reservation) =>
                renderReservationData(reservation)
            )}
        </div>
    );
};

export default UserReservations;
