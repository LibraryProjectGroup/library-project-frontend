import { FC, useContext } from "react";
import ListBooks from "./components/pages/listBooksPage/ListBooks";
import LoginPage from "./components/pages/loginPage/LoginPage";
import CreateAccount from "./components/pages/createAccountPage/CreateAccount";
import MyAccount from "./components/pages/userPage/UserPage";
import TheContextProvider, { TheContext } from "./TheContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const ProtectedRoute: FC<any> = (props) => {
    const context = useContext(TheContext);

    if (context?.username) {
      return props.children;
    }

    return <p>Unauthorized</p>;
  };

  return (
    /* Container component messes up with the margins and/or paddings, pushing
      all components to the right and leaving a big empty space on the left. For
      now it can be fixed by replacing with div*/
    <TheContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}></Route>
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
        </Routes>
      </BrowserRouter>
    </TheContextProvider>
  );
}

export default App;
