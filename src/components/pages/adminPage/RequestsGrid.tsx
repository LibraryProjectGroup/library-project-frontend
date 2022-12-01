import { useState, useEffect, FC } from "react";
import * as React from "react";
import {
    DataGrid,
    DataGridProps,
    GridCellEditCommitParams,
    GridCellParams,
    GridColDef,
    GridRenderCellParams,
    MuiEvent
} from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import Loan from "../../../interfaces/loan.interface";
import {
    fetchAllBookRequests,
    fetchUpdateBookRequest
} from "../../../fetchFunctions";
import Book_request, {
    Book_request_status
} from "../../../interfaces/book_request.interface";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const RequestsGrid: FC = (): JSX.Element => {
    const [requestsData, setRequestsData] = useState<Book_request[]>([]);

    const COLUMNS_LOANS: GridColDef[] = [
        { field: "id", headerName: "Request ID", flex: 1 },
        { field: "userId", headerName: "User ID", flex: 1 },
        { field: "isbn", headerName: "ISBN", flex: 2 },
        { field: "title", headerName: "Title", flex: 3 },
        { field: "reason", headerName: "Reason", flex: 3 },
        {
            field: "status",
            headerName: "Status",
            flex: 2,
            valueFormatter(params: any) {
                switch (params.value) {
                    case 0:
                        return "PENDING";
                    case 1:
                        return "DENIED";
                    case 2:
                        return "APPROVED";
                    default:
                        return "UNKNOWN";
                }
            },
            valueOptions: [0, 1, 2]
        },
        {
            field: "approve",
            headerName: "Approve",
            renderCell: (params) => (
                <IconButton
                    title="Approve"
                    onClick={() => {
                        updateStatus(params.row.id, 2);
                        loadRequestsData();
                    }}
                >
                    <CheckIcon />
                </IconButton>
            )
        },
        {
            field: "deny",
            headerName: "Deny",
            renderCell: (params) => (
                <IconButton
                    title="Deny"
                    onClick={() => {
                        updateStatus(params.row.id, 1);
                        loadRequestsData();
                    }}
                >
                    <ClearIcon />
                </IconButton>
            )
        }
    ];

    useEffect(() => {
        loadRequestsData();
    }, []);

    const loadRequestsData = async () => {
        const requestsTmp = await fetchAllBookRequests();
        setRequestsData(requestsTmp);
    };

    const updateStatus = async (id: number, status: Book_request_status) =>
        await fetchUpdateBookRequest(id, status);

    return (
        <DataGrid
            columns={COLUMNS_LOANS}
            rows={requestsData}
            sx={{ width: "100%", height: 1000, backgroundColor: "white" }}
        ></DataGrid>
    );
};

export default RequestsGrid;
