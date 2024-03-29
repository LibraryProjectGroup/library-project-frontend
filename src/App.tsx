import { FC, useContext } from 'react'
import ListBooks from './components/pages/listBooksPage/ListBooks'
import LoginPage from './components/pages/loggedOut/loginPage/LoginPage'
import CreateAccount from './components/pages/loggedOut/createAccountPage/CreateAccount'
import PasswordReset from './components/pages/loggedOut/passwordReset/PasswordReset'
import MyAccount from './components/pages/userPage/UserPage'
import Admin from './components/pages/adminPage/Admin'
import UnauthorizedPage from './components/pages/errorPages/UnauthorizedPage'
import MissingPage from './components/pages/errorPages/MissingPage'
import TheContextProvider, { TheContext } from './TheContext'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { isAuthenticated } from './auth'
import UserBooklists from './components/pages/userBooklistsPage/UserBooklistsPage'
import UserReservations from './components/pages/userBookReservationsPage/UserReservationsPage'
import ListPage from './components/pages/listPage/ListPage'
import NavBar from './components/navBar/Navbar'
import UserSettings from './components/pages/settingsPage/UserSettings'

function App() {
  const ProtectedRoute: FC<any> = (props) => {
    return isAuthenticated() ? props.children : <Navigate to="/login" />
  }

  const AdminRoute: FC<any> = (props) => {
    const context = useContext(TheContext)
    return context?.user?.administrator ? props.children : <UnauthorizedPage />
  }

  return (
    <TheContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/list-books" />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/passwordreset/:secret" element={<PasswordReset />} />
          <Route
            path="/list-books"
            element={
              <ProtectedRoute>
                <NavBar />
                <ListBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <NavBar />
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booklists"
            element={
              <ProtectedRoute>
                <NavBar />
                <UserBooklists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list/:id"
            element={
              <ProtectedRoute>
                <NavBar />
                <ListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <NavBar />
                <UserReservations extendreservation={null} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <NavBar />
                <UserSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <NavBar />
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </BrowserRouter>
    </TheContextProvider>
  )
}

export default App
