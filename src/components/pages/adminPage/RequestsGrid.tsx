import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loan from "../../../interfaces/loan.interface";
import { fetchAllBookRequests } from "../../../fetchFunctions";
import Book_request from "../../../interfaces/book_request.interface";

const RequestsGrid: FC = (): JSX.Element => {
    const [requestsData, setRequestsData] = useState<Book_request[]>([]);

    const COLUMNS_LOANS: GridColDef[] = [
        { field: "id", headerName: "Request ID", flex: 2 },
        { field: "userId", headerName: "User ID", flex: 3 },
        { field: "isbn", headerName: "ISBN", flex: 2 },
        { field: "title", headerName: "Title", flex: 2 },
        { field: "reason", headerName: "Reason", flex: 2 },
        { field: "status", headerName: "Status", flex: 2 }
    ];

    useEffect(() => {
        loadRequestsData();
    }, []);

    const loadRequestsData = async () => {
        const requestsTmp = await fetchAllBookRequests();
        setRequestsData(requestsTmp);
    };

    return (
        <DataGrid
            columns={COLUMNS_LOANS}
            rows={requestsData}
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default RequestsGrid;
