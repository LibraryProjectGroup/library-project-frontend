import * as React from 'react';
import { AppBar, Box, Fab, Grid, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { endSession } from "../../auth";
import { userLogOutButton, navbarPages, navbarPagesLarge } from "../../sxStyles";
import { TheContext } from "../../TheContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { log } from "console";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";
import { fontSize } from "@mui/system";
import AdbIcon from '@mui/icons-material/Adb';

const NavBar2: FC = (): JSX.Element => {
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

          {/* Navbar title for large screens */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
              fontFamily: "Merriweather",
              letterSpacing: '.3rem',
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

          {/* Navbar pages, Hamburger menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' },
              }}
            >
              <MenuItem onClick={() => { navigate("/admin"); }}>
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
              </MenuItem>
              <MenuItem onClick={() => { navigate("/user"); }}>
                <Typography
                  sx={navbarPages}
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  LOANED BOOKS
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {navigate("/reservations");}}>
                <Typography
                  sx={navbarPages}
                  onClick={() => {
                    navigate("/reservations");
                  }}
                >
                  BOOK RESERVATIONS
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => { navigate("/booklists"); }}>
                <Typography
                  sx={navbarPages}
                  onClick={() => {
                    navigate("/booklists");
                  }}
                >
                  MY LISTS
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Navbar Title, Hamburger menu */}
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
              flexGrow: 1,
              fontFamily: "Merriweather",
              letterSpacing: '.3rem',
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

          {/* Navbar pages for large screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none' } }} >
            {context?.user?.administrator ? (
              <Button
                sx={navbarPages}
                onClick={() => {
                  navigate("/admin");
                }}
              >
              ADMIN PAGE
              </Button>
            ) : (
              <></>
            )}
            <Button
              sx={navbarPages}
              onClick={() => {
                navigate("/user");
              }}
            >
              LOANED BOOKS
            </Button>
            <Button
              sx={navbarPages}
              onClick={() => {
                navigate("/reservations");
              }}
            >
              BOOK RESERVATIONS
            </Button>
            <Button
              sx={navbarPages}
              onClick={() => {
                navigate("/booklists");
              }}
            >
              LISTS
            </Button>
          </Box>

          {/* Navbar pages for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }} >
            {context?.user?.administrator ? (
              <Button
                sx={navbarPagesLarge}
                onClick={() => {
                  navigate("/admin");
                }}
              >
                ADMIN PAGE
              </Button>
            ) : (
              <></>
            )}
            <Button
              sx={navbarPagesLarge}
              onClick={() => {
                navigate("/user");
              }}
            >
              LOANED BOOKS
            </Button>
            <Button
              sx={navbarPagesLarge}
              onClick={() => {
                navigate("/reservations");
              }}
            >
              BOOK RESERVATIONS
            </Button>
            <Button
              sx={navbarPagesLarge}
              onClick={() => {
                navigate("/booklists");
              }}
            >
              LISTS
            </Button>
          </Box>

          {/* User & Log out for Hamburger menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }}>
            <Tooltip title={context?.user?.username}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* User & Log out for large screens */}
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }} >
            <Tooltip title={context?.user?.username}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar></Avatar>
              </IconButton>
            </Tooltip>
            <Box sx={{ marginLeft: 1, marginTop: 1}}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Merriweather",
                color: "black",
                fontSize: 12.5,
              }}
            >
              User: <b>{context?.user?.username}</b>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Merriweather",
                color: "black",
                fontSize: 12.5,
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
            </Box>
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

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar2;
