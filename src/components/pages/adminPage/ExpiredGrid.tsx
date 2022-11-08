import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchExpiredLoans } from "../../../fetchFunctions";

const ExpiredGrid: FC = (): JSX.Element => {
    const [expiredData, setExpiredData] = useState<any[]>([]);

    const COLUMNS_LOANS: GridColDef[] = [
        { field: "username", headerName: "Username", flex: 2 },
        { field: "title", headerName: "Book title", flex: 3 },
        { field: "dueDate", headerName: "Due", flex: 2 },
        { field: "userId", headerName: "User ID", flex: 2 },
        { field: "bookId", headerName: "Book ID", flex: 2 }
    ];

    useEffect(() => {
        loadExpiredData();
    }, []);

    const loadExpiredData = async () => {
        const loansTmp = await fetchExpiredLoans();
        setExpiredData(loansTmp);
    };

    return (
        <DataGrid
            columns={COLUMNS_LOANS}
            rows={expiredData}
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default ExpiredGrid;
