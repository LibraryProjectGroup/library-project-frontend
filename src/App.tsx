import { FC, useContext } from "react";
import ListBooks from "./components/pages/listBooksPage/ListBooks";
import LoginPage from "./components/pages/loginPage/LoginPage";
import CreateAccount from "./components/pages/createAccountPage/CreateAccount";
import MyAccount from "./components/pages/userPage/UserPage";
import Admin from "./components/pages/adminPage/Admin";
import TheContextProvider, { TheContext } from "./TheContext";
import { Routes, Route, BrowserRouter, Navigate, Switch } from "react-router-dom";
import { isAuthenticated } from "./auth";

function App() {
    const ProtectedRoute: FC<any> = (props) => {
        return isAuthenticated() ? props.children : <Navigate to="/login" />;
    };

    const AdminRoute: FC<any> = (props) => {
        const context = useContext(TheContext);

        return context?.user?.administrator ? (
            props.children
        ) : (
            <p>Unauthorized</p>
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
                        path="/admin"
                        element={
                            <AdminRoute>
                                <Admin />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="*" component={() => "404 NOT FOUND"}
                    />
                </Routes>
            </BrowserRouter>
        </TheContextProvider>
    );
}

export default App;
