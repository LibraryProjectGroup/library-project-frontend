import React, { useState, useEffect, FC } from "react";
import { Box, Tab, Tabs, Fab, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
    userPageBackButton,
    adminPageTabs,
    adminPageTab
} from "../../../sxStyles";
import UsersGrid from "./UsersGrid";
import BooksGrid from "./BooksGrid";
import LoansGrid from "./LoansGrid";
import ExpiredGrid from "./ExpiredGrid";
import RequestsGrid from "./RequestsGrid";
import ReservationsGrid from "./ReservationsGrid";

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
            <Fab
                aria-label="back"
                sx={userPageBackButton}
                onClick={() => {
                    navigate("/list-books");
                }}
            >
                <ArrowBackIcon />
            </Fab>
            <Box
                sx={{
                    width: "70%",
                    margin: "auto"
                }}
            >
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    centered={true}
                    sx={adminPageTabs}
                >
                    <Tab label="Users" sx={adminPageTab} />
                    <Tab label="Books" sx={adminPageTab} />
                    <Tab label="Current loans" sx={adminPageTab} />
                    <Tab label="Expired loans" sx={adminPageTab} />
                    <Tab label="Book requests" sx={adminPageTab} />
                    <Tab label="Book reservations" sx={adminPageTab} />
                </Tabs>

                <TabPanel index={0} currentTab={currentTab}>
                    <UsersGrid />
                </TabPanel>
                <TabPanel index={1} currentTab={currentTab}>
                    <BooksGrid />
                </TabPanel>
                <TabPanel index={2} currentTab={currentTab}>
                    <LoansGrid />
                </TabPanel>
                <TabPanel index={3} currentTab={currentTab}>
                    <ExpiredGrid />
                </TabPanel>
                <TabPanel index={4} currentTab={currentTab}>
                    <RequestsGrid />
                </TabPanel>
                <TabPanel index={5} currentTab={currentTab}>
                    <ReservationsGrid />
                </TabPanel>
            </Box>
        </Box>
    );
};

export default Admin;
