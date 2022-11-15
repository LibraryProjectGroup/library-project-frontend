import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loan from "../../../interfaces/loan.interface";
import { fetchAllCurrentLoans } from "../../../fetchFunctions";

const LoansGrid: FC = (): JSX.Element => {
    const [loansData, setLoansData] = useState<Loan[]>([]);

    const COLUMNS_LOANS: GridColDef[] = [
        { field: "username", headerName: "Username", flex: 2 },
        { field: "title", headerName: "Book title", flex: 3 },
        {
            field: "borrowDate",
            headerName: "Borrowed",
            flex: 2,
            valueFormatter(params) {
                return new Date(params.value).toLocaleString("fi", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric"
                });
            }
        },
        {
            field: "dueDate",
            headerName: "Due",
            flex: 2,
            valueFormatter(params) {
                return new Date(params.value).toLocaleString("fi", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric"
                });
            }
        },
        { field: "id", headerName: "Book ID", flex: 2 }
    ];

    useEffect(() => {
        loadLoansData();
    }, []);

    const loadLoansData = async () => {
        const loansTmp = await fetchAllCurrentLoans();
        setLoansData(loansTmp);
    };

    return (
        <DataGrid
            columns={COLUMNS_LOANS}
            rows={loansData}
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default LoansGrid;
