import { FC, useContext } from "react";
import ListBooks from "./components/pages/listBooksPage/ListBooks";
import LoginPage from "./components/pages/loginPage/LoginPage";
import CreateAccount from "./components/pages/createAccountPage/CreateAccount";
import MyAccount from "./components/pages/userPage/UserPage";
import TheContextProvider, { TheContext } from "./TheContext";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

function App() {
  const ProtectedRoute: FC<any> = (props) => isAuthenticated() ? props.children : <Navigate to="/login" />;

  return (
    /* Container component messes up with the margins and/or paddings, pushing
      all components to the right and leaving a big empty space on the left. For
      now it can be fixed by replacing with div*/
    <TheContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccount />} />

            <Route index element={<Navigate to="/list-books" />}></Route>
            <Route path="/list-books" element={<ProtectedRoute><ListBooks /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </TheContextProvider>
  );
}

export default App;
