import { useState, useEffect, FC, Fragment } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import User from "../../../interfaces/user.interface";
import EditUser from "../../../interfaces/editUser.interface";
import {
  fetchDeleteUser,
  fetchAllUsers,
  fetchUserById,
  fetchAdminUpdateUserData,
  fetchPasswordResetSecret,
  fetchAllHomeOffices,
} from "../../../fetchFunctions";
import UserForm from "./EditUsers";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteUser from "./DeleteUser";
import ToastContainers from "../../../ToastContainers";

import "react-toastify/dist/ReactToastify.css";
import { HomeOffice } from "../../../interfaces/HomeOffice";
import OfficeSpan from "../../OfficeSpan";

const UsersGrid: FC = (): JSX.Element => {
  const [offices, setOffices] = useState<HomeOffice[]>([]);

  useEffect(() => {
    (async () => {
      setOffices(await fetchAllHomeOffices());
    })();
  }, []);

  const [usersData, setUsersData] = useState<User[]>([]);
  const [oneUserData, setOneUserData] = useState<EditUser | null>(null);

  const [requestVisible, setRequestVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const COLUMNS_USERS: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "username", headerName: "Username", flex: 2, minWidth: 160 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 230 },
    {
      field: "administrator",
      headerName: "Administrator",
      flex: 1.5,
      minWidth: 110,
      valueFormatter(params) {
        return params.value === 0 ? "false" : "true";
      },
    },
    {
      field: "office",
      headerName: "Office",
      flex: 3,
      renderCell: (params) => {
        const homeOffice = (offices ?? []).find(
          (office) => office.id === params.row.homeOfficeId
        );
        if (!homeOffice) {
          return <span>Unknown</span>;
        }
        return (
          <OfficeSpan
            countryCode={homeOffice.countryCode}
            officeName={homeOffice.name}
          />
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit user",
      flex: 1.5,
      minWidth: 80,
      renderCell: (params) => (
        <Button
          sx={{ color: "blue" }}
          onClick={() => {
            editUser(params.row.id);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete user",
      flex: 1.5,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          sx={{ color: "red" }}
          onClick={() => {
            setRowId(params.row.id);
            setDeleteVisible(true);
          }}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "password reset",
      headerName: "Link to reset password",
      flex: 2,
      minWidth: 170,
      renderCell: (params) => (
        <Button
          sx={{ color: "red" }}
          onClick={async () => {
            const result = await fetchPasswordResetSecret(params.row.id);
            if (result.ok) {
              navigator.clipboard.writeText(
                `${window.location.origin}/passwordreset/${result.secret}`
              );
              setOpen(true);
            }
          }}
        >
          Generate
        </Button>
      ),
    },
  ];

  useEffect(() => {
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
    const usersTmp = await fetchAllUsers();
    setUsersData(usersTmp);
  };

  /*const deleteUser = async (id: number) => {
    await fetchDeleteUser(id);
    await loadUsersData();
  };*/

  const editUser = async (id: number) => {
    let userData = await fetchUserById(id);
    userData.administrator = userData.administrator === 1 ? "true" : "false";
    setRequestVisible(true);
    setOneUserData(userData);
  };

  const updateUser = async (editedUser: EditUser) => {
    const ok = await fetchAdminUpdateUserData(editedUser);
    if (ok?.ok) {
      setRequestVisible(false);
      await loadUsersData();
    }
  };

  return (
    <>
      <DeleteUser
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        userId={rowId}
        fetchDeleteUser={fetchDeleteUser}
        loadUsersData={loadUsersData}
      />
      <UserForm
        visible={requestVisible}
        setVisible={setRequestVisible}
        setOneUserData={setOneUserData}
        user={oneUserData}
        updateUser={updateUser}
      />
      <ToastContainers />
      <DataGrid
        columns={COLUMNS_USERS}
        rows={usersData}
        sx={{ width: "100%", height: 1000, backgroundColor: "white" }}
      ></DataGrid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Password reset link copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
};

export default UsersGrid;
