import {
    AppBar,
    Box,
    Button,
    Fab,
    Grid,
    Tooltip,
    Typography
} from "@mui/material";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { endSession } from "../../auth";
import { userLogOutButton, userPageMyListsButton } from "../../sxStyles";
import { TheContext } from "../../TheContext";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar: FC = (): JSX.Element => {
    const context = useContext(TheContext);
    const navigate = useNavigate();
    return (
        <AppBar position="static" sx={{ backgroundColor: "white", height: 80 }}>
            <Box sx={{ height: "100%" }}>
                <Grid container columns={{ xs: 6 }} sx={{ height: "100%" }}>
                    <Grid
                        item
                        xs={1}
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: "Merriweather",
                                paddingLeft: 5,
                                color: "black"
                            }}
                        >
                            efilibrary
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            sx={userPageMyListsButton}
                            variant="contained"
                            onClick={() => {
                                navigate("/user");
                            }}
                        >
                            My loaned books
                        </Button>
                        <Button
                            sx={userPageMyListsButton}
                            variant="contained"
                            onClick={() => {
                                navigate("/reservations");
                            }}
                        >
                            My book reservations
                        </Button>
                        <Button
                            sx={userPageMyListsButton}
                            variant="contained"
                            onClick={() => {
                                navigate("/booklists");
                            }}
                        >
                            My Lists
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Merriweather",
                                color: "black"
                            }}
                        >
                            User: <b>{context?.user?.username}</b>
                        </Typography>

                        <Tooltip title="Log out">
                            <Fab
                                aria-label="log out"
                                sx={userLogOutButton}
                                onClick={() => {
                                    endSession();
                                    navigate("/login");
                                    // update user data when you logIn and logOut
                                    context?.setIsLogin(false);
                                }}
                            >
                                <LogoutIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </AppBar>
    );
};

export default NavBar;
