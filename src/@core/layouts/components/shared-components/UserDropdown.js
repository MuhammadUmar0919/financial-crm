// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Iconify from 'Components/Iconify'

// ** Context
import { useAuth } from 'Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import useToken from 'Hooks/UseToken'
import { StyledMenuItem } from 'Components/StyledMenuItem/Style'
import { ListItemIcon } from '@mui/material'
import { sentenceCase } from 'change-case'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { token } = useToken()
  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      navigate(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={token?.fullName}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        onClick={() => handleDropdownClose()}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src='images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{token?.fullName}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {sentenceCase((token?.roleName || '').replace('-', ''))}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem onClick={() => handleDropdownClose('/user-settings/profile')}>
          <ListItemIcon>
            <Iconify icon={token?.roleIcon} />
          </ListItemIcon>
            Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDropdownClose('/user-settings/account')}>
          <ListItemIcon>
          <Iconify icon='mdi:account-cog-outline' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleDropdownClose('/general-details/pricing')}>
          <ListItemIcon>
            <Iconify icon='mdi:currency-usd' /> 
          </ListItemIcon>
            Pricing
        </MenuItem>
        <MenuItem color="secondary" onClick={() => handleDropdownClose('/general-details/faq')}>
          <ListItemIcon>
            <Iconify icon='mdi:help-circle-outline' />
          </ListItemIcon>
            FAQ
        </MenuItem>
        <Divider />
        <StyledMenuItem color="error" onClick={handleLogout}>
          <ListItemIcon sx={{color: "inherit"}}>
            <Iconify icon='mdi:logout' />
          </ListItemIcon>
          Logout
        </StyledMenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
