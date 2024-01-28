// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Iconify from 'Components/Iconify';

// ** Toast Imports
import toast from 'react-hot-toast'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode: mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
      toast('Hello Darkness!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
          },
        }
      );
    } else {
      handleModeChange('light')
      toast('Hello Brightness!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
          },
        }
      );
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Iconify icon={settings.mode === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'} />
    </IconButton>
  )
}

export default ModeToggler
