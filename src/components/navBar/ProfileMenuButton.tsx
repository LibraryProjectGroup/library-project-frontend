import React from 'react'
import { Menu, MenuItem, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { endSession } from '../../auth'
import ContextData from '../../interfaces/ContextData.interface'

interface ProfileMenuProps {
  anchorElUser: HTMLElement | null
  handleCloseUserMenu: () => void
  navigate: (path: string) => void
  context: ContextData | null
}

// Profile menu that opens when you click the profile avatar. Opens up a menu with log out button and settings etc.
const ProfileMenuButton: React.FC<ProfileMenuProps> = ({
  anchorElUser,
  handleCloseUserMenu,
  navigate,
  context,
}) => {
  const handleLogout = () => {
    endSession()
    navigate('/login')
    context?.setIsLogin(false)
  }
  const handleSettings = () => {
    navigate('/settings')
    handleCloseUserMenu() // Close the menu after navigating
  }
  return (
    <Menu
      sx={{ mt: '55px' }}
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
      {/* Settings page button */}
      <MenuItem onClick={handleSettings}>
        <SettingsOutlinedIcon />
        <Typography sx={{ marginRight: 1, marginLeft: 1 }} textAlign="center">
          Settings
        </Typography>
      </MenuItem>
      {/* Logout button */}
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        <Typography sx={{ marginRight: 1, marginLeft: 1 }} textAlign="center">
          Log out
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default ProfileMenuButton
