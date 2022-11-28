import { FC, useContext } from "react";
import ListBooks from "./components/pages/listBooksPage/ListBooks";
import LoginPage from "./components/pages/loginPage/LoginPage";
import CreateAccount from "./components/pages/createAccountPage/CreateAccount";
import PasswordReset from "./components/pages/passwordReset/PasswordReset";
import MyAccount from "./components/pages/userPage/UserPage";
import Admin from "./components/pages/adminPage/Admin";
import UnauthorizedPage from "./components/pages/errorPages/UnauthorizedPage";
import MissingPage from "./components/pages/errorPages/MissingPage";
import TheContextProvider, { TheContext } from "./TheContext";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import UserBooklists from "./components/pages/userBooklistsPage/UserBooklistsPage";
import UserReservations from "./components/pages/userBookReservationsPage/UserReservationsPage";
import { AppBar, Typography } from "@mui/material";
import ListPage from "./components/pages/listPage/ListPage";

function App() {
    const ProtectedRoute: FC<any> = (props) => {
        return isAuthenticated() ? props.children : <Navigate to="/login" />;
    };

    const AdminRoute: FC<any> = (props) => {
        const context = useContext(TheContext);

        return context?.user?.administrator ? (
            props.children
        ) : (
            <UnauthorizedPage />
        );
    };

    return (
        <TheContextProvider>
            <AppBar
                position="static"
                sx={{ backgroundColor: "white", height: 80 }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "Merriweather",
                        padding: 3,
                        paddingLeft: 5,
                        color: "black"
                    }}
                >
                    efilibrary
                </Typography>
            </AppBar>
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Navigate to="/list-books" />}
                    ></Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route
                        path="/passwordreset/:secret"
                        element={<PasswordReset />}
                    />
                    <Route
                        path="/list-books"
                        element={
                            <ProtectedRoute>
                                <ListBooks />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <MyAccount />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/booklists"
                        element={
                            <ProtectedRoute>
                                <UserBooklists />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/list/:id"
                        element={
                            <ProtectedRoute>
                                <ListPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reservations"
                        element={
                            <ProtectedRoute>
                                <UserReservations />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <Admin />
                            </AdminRoute>
                        }
                    />
                    <Route path="*" element={<MissingPage />} />
                </Routes>
            </BrowserRouter>
        </TheContextProvider>
    );
}

export default App;
