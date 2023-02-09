import * as React from 'react';
import { AppBar, Box, Button, Fab, Grid, Tooltip, Typography, Container, Toolbar, Avatar, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { endSession } from "../../auth";
import { userLogOutButton, navbarPages } from "../../sxStyles";
import { TheContext } from "../../TheContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { log } from "console";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";
import { fontSize } from "@mui/system";

const NavBar: FC = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const context = useContext(TheContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", height: 80 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* Navbar large screens */}
          <Typography
            variant="h4"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "Merriweather",
              paddingLeft: 5,
              color: "black",
              cursor: "pointer",
              "&:hover": {
                color: "#FFB500",
              },
            }}
            onClick={() => navigate("/list-books")}
          >
            EfiLibrary
          </Typography>

          <Box sx={{ flexGrow: 1, display: {xs: "none", md: "flex"} }} >
            {context?.user?.administrator ? (
              <Typography
                sx={navbarPages}
                onClick={() => {
                  navigate("/admin");
                }}
              >
                ADMIN PAGE
              </Typography>
            ) : (
              <></>
            )}
            <Typography
              sx={navbarPages}
              onClick={() => {
                navigate("/user");
              }}
            >
              MY LOANED BOOKS
            </Typography>
            <Typography
              sx={navbarPages}
              onClick={() => {
                navigate("/reservations");
              }}
            >
              MY BOOK RESERVATIONS
            </Typography>
            <Typography
              sx={navbarPages}
              onClick={() => {
                navigate("/booklists");
              }}
            >
              MY LISTS
            </Typography>
          </Box>

          {/* Navbar Hamburger */}
          <Typography
            variant="h4"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Merriweather",
              paddingLeft: 5,
              color: "black",
              cursor: "pointer",
              "&:hover": {
                color: "#FFB500",
              },
            }}
            onClick={() => navigate("/list-books")}
          >
            EfiLibrary
          </Typography>

          <Box sx={{ flexGrow: 1, display: {xs: "flex", md: "none"} }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              >
              <MenuIcon />
            </IconButton>
            {context?.user?.administrator ? (
              <Typography
                sx={navbarPages}
                onClick={() => {
                  navigate("/admin");
                }}
              >
                ADMIN PAGE
              </Typography>
            ) : (
              <></>
            )}
            <Typography
              sx={navbarPages}
              onClick={() => {
                navigate("/user");
              }}
            >
              MY LOANED BOOKS
            </Typography>
            <Typography
              sx={navbarPages}
              onClick={() => {
                navigate("/reservations");
              }}
            >
              MY BOOK RESERVATIONS
            </Typography>
            <Typography
              sx={navbarPages}
              onClick={() => {
                navigate("/booklists");
              }}
            >
              MY LISTS
            </Typography>
          </Box>

        {/* Navbar Hamburger 
          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", }} >
            <Tooltip title="User settings">
              <Avatar></Avatar>
            </Tooltip>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Merriweather",
                  color: "black",
                  fontSize: 15,
                }}
              >
                User: <b>{context?.user?.username}</b>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Merriweather",
                  color: "black",
                  fontSize: 15,
                }}
              >
                {context?.borrows &&
                  (context?.borrows?.length > 1 ? (
                    <p style={{ margin: 0 }}>
                      Currently loaning {context?.borrows?.length} books
                    </p>
                  ) : (
                    <p style={{ margin: 0 }}>
                      Currently loaning {context?.borrows?.length} book
                    </p>
                  ))}
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
          </Box>
          */}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
