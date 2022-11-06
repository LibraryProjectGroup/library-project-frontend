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
import UsersGrid from "./UsersGrid";
import BooksGrid from "./BooksGrid";
import LoansGrid from "./LoansGrid";

const Admin: FC = (): JSX.Element => {
    const [currentTab, setCurrentTab] = useState<number>(0);
    const navigate = useNavigate();

    const TabPanel = (props: any) => {
        const { children, currentTab, index, ...other } = props;
        return (
            <Box>
                {currentTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </Box>
        );
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };
    return (
        <Box sx={{ height: "100vh", width: "100%" }}>
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                centered={true}
                sx={adminPageTabs}
            >
                <Tab label="Users" sx={adminPageTab} />
                <Tab label="Books" sx={adminPageTab} />
                <Tab label="Current loans" sx={adminPageTab} />
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
                <UsersGrid />
            </TabPanel>
            <TabPanel index={1} currentTab={currentTab}>
                <BooksGrid />
            </TabPanel>
            <TabPanel index={2} currentTab={currentTab}>
                <LoansGrid />
            </TabPanel>
        </Box>
    );
};

export default Admin;
