import { useState, useEffect, FC } from "react";
import {
    DataGrid,
    DataGridProps,
    GridCellEditCommitParams,
    GridCellParams,
    GridColDef
} from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import Book_reservation from "../../../interfaces/book_reservation.interface";
import {
    fetchAllBookReservations,
    fetchCancelBookReservation
} from "../../../fetchFunctions";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ReservationsGrid: FC = (): JSX.Element => {
    const [reservationsData, setReservationsData] = useState<
        Book_reservation[]
    >([]);

    const COLUMNS_RESERVATIONS: GridColDef[] = [
        { field: "id", headerName: "Reservation ID", flex: 2 },
        { field: "userId", headerName: "User ID", flex: 2 },
        { field: "bookId", headerName: "Book ID", flex: 2 },
        {
            field: "reservationDatetime",
            headerName: "Reservation time",
            flex: 3,
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
            headerName: "Has been loaned",
            flex: 2,
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
            headerName: "Has been canceled",
            flex: 2,
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
            headerName: "Cancel reservation",
            flex: 3,
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
        const reservationsTmp = await fetchAllBookReservations();
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
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default ReservationsGrid;
