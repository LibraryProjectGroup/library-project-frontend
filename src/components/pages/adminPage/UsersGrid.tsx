import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import User from "../../../interfaces/user.interface";
import EditUser from "../../../interfaces/editUser.interface";
import {
    fetchDeleteUser,
    fetchAllUsers,
    fetchUserById,
    fetchAdminUpdateUserData
} from "../../../fetchFunctions";
import UserForm from "./EditUsers";

const UsersGrid: FC = (): JSX.Element => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [oneUserData, setOneUserData] = useState<EditUser | null>(null);
    const [formVisible, setFormVisible] = useState(false);

    const COLUMNS_USERS: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 2 },
        { field: "username", headerName: "Username", flex: 2 },
        { field: "email", headerName: "Email", flex: 2 },
        {
            field: "administrator",
            headerName: "Administrator",
            flex: 3,
            valueFormatter(params) {
                return params.value === 0 ? "false" : "true";
            }
        },
        {
            field: "edit",
            headerName: "Edit user",
            flex: 1.5,
            renderCell: (params) => (
                <Button
                    sx={{ color: "blue" }}
                    onClick={() => {
                        editUser(params.row.id);
                    }}
                >
                    Edit
                </Button>
            )
        },
        {
            field: "delete",
            headerName: "Delete user",
            flex: 1.5,
            renderCell: (params) => (
                <Button
                    sx={{ color: "red" }}
                    onClick={() => {
                        deleteUser(params.row.id);
                        loadUsersData();
                    }}
                >
                    Delete
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

    const editUser = async (id: number) => {
        let userData = await fetchUserById(id);
        userData.administrator =
            userData.administrator === 1 ? "true" : "false";
        setFormVisible(true);
        setOneUserData(userData);
    };

    const updateUser = async (editedUser: EditUser) => {
        const ok = await fetchAdminUpdateUserData(editedUser);
        if (ok?.ok) {
            setFormVisible(false);
            await loadUsersData();
        }
    };

    return (
        <>
            <UserForm
                visible={formVisible}
                setVisible={setFormVisible}
                setOneUserData={setOneUserData}
                user={oneUserData}
                updateUser={updateUser}
            />
            <DataGrid
                columns={COLUMNS_USERS}
                rows={usersData}
                sx={{ width: "100%", height: 1000 }}
            ></DataGrid>
        </>
    );
};

export default UsersGrid;
