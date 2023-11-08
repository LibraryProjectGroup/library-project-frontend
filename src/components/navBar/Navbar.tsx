import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import * as React from 'react'

import { FC, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  navbarMenuItemHamburger,
  navbarPagesHamburger,
  navbarPagesLarge,
  userProfileButton,
} from '../../sxStyles'
import { TheContext } from '../../TheContext'
import ProfileMenuButton from './ProfileMenuButton'

const NavBar: FC = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const context = useContext(TheContext)
  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [menuList, setMenuList] = useState([
    { nav: '/user', text: 'MY LOANED BOOKS' },
    { nav: '/reservations', text: 'MY BOOK RESERVATIONS' },
    { nav: '/booklists', text: 'MY LISTS' },
  ])

  useEffect(() => {
    if (context?.user?.administrator) {
      setMenuList([
        { nav: '/admin', text: 'ADMIN PAGE' },
        { nav: '/user', text: 'MY LOANED BOOKS' },
        { nav: '/reservations', text: 'MY BOOK RESERVATIONS' },
        { nav: '/booklists', text: 'MY LISTS' },
      ])
    } else {
      setMenuList([
        { nav: '/user', text: 'MY LOANED BOOKS' },
        { nav: '/reservations', text: 'MY BOOK RESERVATIONS' },
        { nav: '/booklists', text: 'MY LISTS' },
      ])
    }
  }, [context?.user?.administrator])

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: 'white', height: 80, justifyContent: 'center' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Navbar title for large screens */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', lg: 'flex' },
              fontFamily: 'Merriweather',
              letterSpacing: '.3rem',
              color: 'black',
              cursor: 'pointer',
              '&:hover': {
                color: '#FFB500',
              },
            }}
            onClick={() => navigate('/list-books')}
          >
            EfiLibrary
          </Typography>

          {/* Navbar pages, Hamburger menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
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
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {menuList.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      navigate(item.nav)
                      handleCloseNavMenu()
                    }}
                    sx={navbarMenuItemHamburger}
                  >
                    <Typography sx={navbarPagesHamburger}>
                      {item.text}
                    </Typography>
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>

          {/* Navbar Title, Hamburger menu */}
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: 'Merriweather',
              letterSpacing: '.3rem',
              color: 'black',
              cursor: 'pointer',
              '&:hover': {
                color: '#FFB500',
              },
            }}
            onClick={() => navigate('/list-books')}
          >
            EfiLibrary
          </Typography>

          {/* Navbar pages for large screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {context?.user?.administrator ? (
              <Button
                sx={navbarPagesLarge}
                onClick={() => {
                  navigate('/admin')
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
                navigate('/user')
              }}
            >
              MY LOANED BOOKS
            </Button>
            <Button
              sx={navbarPagesLarge}
              onClick={() => {
                navigate('/reservations')
              }}
            >
              MY BOOK RESERVATIONS
            </Button>
            <Button
              sx={navbarPagesLarge}
              onClick={() => {
                navigate('/booklists')
              }}
            >
              MY LISTS
            </Button>
          </Box>

          {/* User & Log out for Hamburger menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', lg: 'none' } }}>
            <Tooltip
              title={
                context?.borrows &&
                (context?.borrows?.length > 1 ||
                context?.borrows?.length == 0 ? (
                  <p style={{ margin: 0 }}>
                    <p>User: {context?.user?.username}</p>
                    <p>Currently loaning {context?.borrows?.length} books</p>
                  </p>
                ) : (
                  <p style={{ margin: 0 }}>
                    <p>User: {context?.user?.username}</p>
                    <p>Currently loaning {context?.borrows?.length} book</p>
                  </p>
                ))
              }
            >
              <IconButton onClick={handleOpenUserMenu} sx={userProfileButton}>
                {/* Avatar is for icon in mobile view. Could and should change in future */}
                <AccountBoxIcon></AccountBoxIcon>
              </IconButton>
            </Tooltip>
            <ProfileMenuButton
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
              navigate={navigate}
              context={context}
            />
          </Box>

          {/* User & Log out for large screens */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Box sx={{ marginLeft: 1, marginTop: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Merriweather',
                  color: 'black',
                  fontSize: 12.5,
                }}
              >
                {/* Current user text */}
                User: <b>{context?.user?.username}</b>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Merriweather',
                  color: 'black',
                  fontSize: 12.5,
                }}
              >
                {/* Currently loaning x books / book text */}
                {context?.borrows &&
                  (context?.borrows?.length > 1 ||
                  context?.borrows?.length == 0 ? (
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
            <Tooltip title="Profile">
              <Fab
                aria-label="profile"
                sx={userProfileButton}
                onClick={handleOpenUserMenu}
              >
                <AccountBoxIcon />
              </Fab>
            </Tooltip>
            <ProfileMenuButton
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
              navigate={navigate}
              context={context}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
