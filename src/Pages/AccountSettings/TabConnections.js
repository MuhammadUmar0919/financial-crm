// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Iconify from 'Components/Iconify'
import { CopiedBtn } from 'Components/CopiedBtn'

const connectedAccountsArr = [
  {
    checked: true,
    title: 'Google',
    logo: '/images/logos/google.png',
    subtitle: 'Calendar and Contacts'
  },
  {
    checked: false,
    title: 'Slack',
    logo: '/images/logos/slack.png',
    subtitle: 'Communications'
  },
  {
    checked: true,
    title: 'Github',
    logo: '/images/logos/github.png',
    subtitle: 'Manage your Git repositories'
  },
  {
    checked: true,
    title: 'Mailchimp',
    subtitle: 'Email marketing service',
    logo: '/images/logos/mail-chimp.png'
  },
  {
    title: 'Asana',
    checked: false,
    subtitle: 'Communication',
    logo: '/images/logos/asana.png'
  }
]

const socialAccountsArr = [
  {
    title: 'Facebook',
    isConnected: false,
    username: '@Facebook',
    logo: '/images/logos/facebook.png'
  },
  {
    title: 'Twitter',
    isConnected: true,
    username: '@Twitter',
    logo: '/images/logos/twitter.png'
  },
  {
    title: 'Instagram',
    isConnected: true,
    username: '@Instagram',
    logo: '/images/logos/instagram.png'
  },
  {
    title: 'Dribbble',
    isConnected: false,
    username: '@Dribbble',
    logo: '/images/logos/dribbble.png'
  },
  {
    title: 'Behance',
    isConnected: false,
    username: '@Behance',
    logo: '/images/logos/behance.png'
  }
]

const TabConnections = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Connected Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Display content from your connected accounts on your site
            </Typography>

            {connectedAccountsArr.map(account => {
              return (
                <Box
                  key={account.title}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                      <img src={account.logo} alt={account.title} height='30' width='30' />
                    </Box>
                    <div>
                      <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {account.subtitle}
                      </Typography>
                    </div>
                  </Box>
                  <Switch defaultChecked={account.checked} />
                </Box>
              )
            })}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Social Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Display content from social accounts on your site
            </Typography>

            {socialAccountsArr.map(account => {
              return (
                <Box
                  key={account.title}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                      <img src={account.logo} alt={account.title} height='30' />
                    </Box>
                    <div>
                      <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                      {account.isConnected ? (
                        <Typography
                          to='/'
                          component={Link}
                          sx={{ color: 'primary.main' }}
                          onClick={e => e.preventDefault()}
                        >
                          {account.username}
                        </Typography>
                      ) : (
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          Not Connected
                        </Typography>
                      )}
                    </div>
                  </Box>
                  <Button
                    variant='outlined'
                    sx={{ p: 1.5, minWidth: 38 }}
                    color={account.isConnected ? 'error' : 'secondary'}
                  >
                    {
                      account.isConnected ? (
                        <Iconify icon='mdi:delete-outline' />
                      ) : (
                        <CopiedBtn 
                          sx={{display: 'contents'}}
                          title={account.title} 
                          text={account.username}
                          icon="mdi:link-variant"
                        />
                      )
                    }
                  </Button>
                </Box>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabConnections
