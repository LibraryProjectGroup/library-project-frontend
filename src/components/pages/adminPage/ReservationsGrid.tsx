import { useState, useEffect, FC } from "react";
import {
    DataGrid,
    DataGridProps,
    GridCellEditCommitParams,
    GridCellParams,
    GridColDef
} from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import JoinedReservation from "../../../interfaces/joinedReservation.interface";
import {
    fetchJoinedBookReservations,
    fetchCancelBookReservation
} from "../../../fetchFunctions";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ReservationsGrid: FC = (): JSX.Element => {
    const [reservationsData, setReservationsData] = useState<
        JoinedReservation[]
    >([]);

    const COLUMNS_RESERVATIONS: GridColDef[] = [
        { field: "id", headerName: "Reservation ID", flex: 1 },
        { field: "username", headerName: "Username", flex: 2 },
        { field: "title", headerName: "Book title", flex: 3 },
        { field: "bookId", headerName: "Book id", flex: 1 },
        {
            field: "reservationDatetime",
            headerName: "Reservation time",
            flex: 2,
            valueFormatter(params) {
                return new Date(params.value).toLocaleString("fi", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                });
            }
        },
        {
            field: "loaned",
            headerName: "Loaned",
            flex: 1,
            renderCell(params) {
                return params.value ? (
                    <div style={{ color: "green" }}>true</div>
                ) : (
                    <div style={{ color: "gray" }}>false</div>
                );
            }
        },
        {
            field: "canceled",
            headerName: "Canceled",
            flex: 1,
            renderCell(params) {
                return params.value ? (
                    <div style={{ color: "green" }}>true</div>
                ) : (
                    <div style={{ color: "gray" }}>false</div>
                );
            }
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Cancel res.",
            flex: 1,
            renderCell: (params) =>
                params.row.canceled ? null : (
                    <div>
                        <IconButton
                            style={{ color: "red" }}
                            title="Cancel"
                            onClick={() => {
                                cancelReservation(params.row.id);
                            }}
                        >
                            <RemoveCircleIcon />
                        </IconButton>
                    </div>
                )
        }
    ];

    useEffect(() => {
        loadReservationsData();
    }, []);

    const loadReservationsData = async () => {
        const reservationsTmp = await fetchJoinedBookReservations();
        setReservationsData(reservationsTmp);
    };

    const cancelReservation = async (id: number) => {
        await fetchCancelBookReservation(id);
        loadReservationsData();
    };

    return (
        <DataGrid
            columns={COLUMNS_RESERVATIONS}
            rows={reservationsData}
            sx={{ width: "100%", height: 1000, backgroundColor: "white" }}
        ></DataGrid>
    );
};

export default ReservationsGrid;