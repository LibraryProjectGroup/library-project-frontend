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

const RequestsGrid: FC = (): JSX.Element => {
    const [requestsData, setRequestsData] = useState<Book_request[]>([]);

    const COLUMNS_LOANS: GridColDef[] = [
        { field: "id", headerName: "Request ID", flex: 2 },
        { field: "userId", headerName: "User ID", flex: 3 },
        { field: "isbn", headerName: "ISBN", flex: 2 },
        { field: "title", headerName: "Title", flex: 2 },
        { field: "reason", headerName: "Reason", flex: 2 },
        {
            field: "status",
            headerName: "Status",
            flex: 2,
            type: "singleSelect",
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
            valueOptions: [0, 1, 2],
            editable: true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            renderCell: (params) => (
                <div>
                    <IconButton
                        title="Save"
                        onClick={() =>
                            updateStatus(params.row.id, params.row.status)
                        }
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
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
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default RequestsGrid;
