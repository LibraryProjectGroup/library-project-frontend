import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchExpiredLoans } from "../../../fetchFunctions";
import DetailedExpiredBorrow from "../../../interfaces/detailedExpiredBorrow.interface";

const ExpiredGrid: FC = (): JSX.Element => {
    const [expiredData, setExpiredData] = useState<DetailedExpiredBorrow[]>([]);

    const COLUMNS_EXPIRED: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 2 },
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
        let tmpExpired: any = await fetchExpiredLoans();
        // borrowId != id. TODO: change interfaces and backend query.
        setExpiredData(
            tmpExpired.map((expired: any) => {
                return { ...expired, id: expired.borrowId };
            })
        );
    };

    return (
        <DataGrid
            columns={COLUMNS_EXPIRED}
            rows={expiredData}
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default ExpiredGrid;
