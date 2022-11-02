import React, { useState, useEffect, FC } from "react";
import { Box, Tab, Tabs, Fab, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Book from "../../../interfaces/book.interface";
import User from "../../../interfaces/user.interface";
import {
  fetchAllUsers,
  fetchAllBooks,
  fetchDeleteUser
} from "../../../fetchFunctions";
import { useNavigate } from "react-router-dom";
import {
  userPageBackButton,
  adminPageTabs,
  adminPageTab
} from "../../../sxStyles";

/*interface IProps {
  books: Array<Book> | undefined;
  setBooks: Function;
  setBookToEdit: Function;
  setEditBookFormVisible: Function;
}*/

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  currentTab: number;
}

const Admin: FC = (): JSX.Element => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const navigate = useNavigate();

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

  const COLUMNS_BOOKS: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 5 },
    { field: "author", headerName: "Author", flex: 4 },
    { field: "topic", headerName: "Topic", flex: 4 },
    { field: "location", headerName: "Location", flex: 3 },
    { field: "isbn", headerName: "ISBN", flex: 3 }
  ];

  const deleteUser = async (id: number) => {
    // fetchDeleteUser hard deletes and breaks the DB
    // const response = await fetchDeleteUser(id);
    console.log("delete user", id);
  };

  const TabPanel = (props: any) => {
    const { children, currentTab, index, ...other } = props;
    return (
      <Box>{currentTab === index && <Box sx={{ p: 3 }}>{children}</Box>}</Box>
    );
  };

  const loadUsersData = async () => {
    console.log("INIT USER DATA");
    const usersTmp = await fetchAllUsers();
    setUsersData(usersTmp);
  };

  const loadBooksData = async () => {
    const booksTmp = await fetchAllBooks();
    setBooksData(booksTmp);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    loadUsersData();
    loadBooksData();
  }, []);

  useEffect(() => {
    console.log(booksData);
  }, [booksData]);

  useEffect(() => {
    console.log(currentTab);
  }, [currentTab]);

  if (usersData.length > 0) {
    return (
      <Box sx={{ height: "100vh", width: "100%" }}>
        <Tabs value={currentTab} onChange={handleTabChange} sx={adminPageTabs}>
          <Tab label="Users" sx={adminPageTab} />
          <Tab label="Books" sx={adminPageTab} />
          <Tab label="Loans" sx={adminPageTab} />
        </Tabs>
        <Fab
          aria-label="back"
          sx={userPageBackButton}
          onClick={() => {
            navigate("/list-books");
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <TabPanel index={0} currentTab={currentTab}>
          <DataGrid
            columns={COLUMNS_USERS}
            rows={usersData}
            sx={{ width: "100%", height: 1000 }}
          ></DataGrid>
        </TabPanel>
        <TabPanel index={1} currentTab={currentTab}>
          <DataGrid
            columns={COLUMNS_BOOKS}
            rows={booksData}
            sx={{ width: "100%", height: 1000 }}
          ></DataGrid>
        </TabPanel>
        <TabPanel index={2} currentTab={currentTab}></TabPanel>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Admin;
