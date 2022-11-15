import { FC, useContext } from "react";
import ListBooks from "./components/pages/listBooksPage/ListBooks";
import LoginPage from "./components/pages/loginPage/LoginPage";
import CreateAccount from "./components/pages/createAccountPage/CreateAccount";
import MyAccount from "./components/pages/userPage/UserPage";
import Admin from "./components/pages/adminPage/Admin";
import UnauthorizedPage from "./components/pages/errorPages/UnauthorizedPage";
import MissingPage from "./components/pages/errorPages/MissingPage";
import TheContextProvider, { TheContext } from "./TheContext";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import UserBooklists from "./components/pages/userBooklistsPage/UserBooklistsPage";
import UserBooks from "./components/pages/UserBooksPage/UserBooks";

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
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Navigate to="/list-books" />}
                    ></Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create-account" element={<CreateAccount />} />
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
                        path="/admin"
                        element={
                            <AdminRoute>
                                <Admin />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="*" 
                        element={
                            <MissingPage />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </TheContextProvider>
    );
}

export default App;
