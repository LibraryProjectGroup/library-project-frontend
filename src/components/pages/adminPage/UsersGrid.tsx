import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import User from "../../../interfaces/user.interface";
import { fetchDeleteUser, fetchAllUsers } from "../../../fetchFunctions";

const UsersGrid: FC = (): JSX.Element => {
    const [usersData, setUsersData] = useState<User[]>([]);

    const COLUMNS_USERS: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 2 },
        { field: "username", headerName: "Username", flex: 2 },
        { field: "administrator", headerName: "Administrator", flex: 3 },
        {
            field: "delete",
            headerName: "Delete user",
            flex: 3,
            renderCell: (params) => (
                <Button
                    onClick={() => {
                        deleteUser(params.row.id);
                        loadUsersData();
                    }}
                >
                    Delete user
                </Button>
            )
        }
    ];

    useEffect(() => {
        loadUsersData();
    }, []);

    const loadUsersData = async () => {
        const usersTmp = await fetchAllUsers();
        setUsersData(usersTmp);
    };

    const deleteUser = async (id: number) => {
        await fetchDeleteUser(id);
        await loadUsersData();
    };

    return (
        <DataGrid
            columns={COLUMNS_USERS}
            rows={usersData}
            sx={{ width: "100%", height: 1000 }}
        ></DataGrid>
    );
};

export default UsersGrid;
