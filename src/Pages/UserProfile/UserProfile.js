// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Iconify from '@core/components/iconify'

// ** Demo Components
import Teams from 'Pages/UserProfile/teams'
import Profile from 'Pages/UserProfile/profile'
import Projects from 'Pages/UserProfile/projects'
import Connections from 'Pages/UserProfile/connections'
import UserProfileHeader from 'Pages/UserProfile/UserProfileHeader'
import { useNavigate } from 'react-router-dom'

const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))
const data = {
  profileHeader: {
    fullName: 'John Doe',
    location: 'Vatican City',
    joiningDate: 'April 2021',
    designation: 'UX Designer',
    profileImg: '/images/avatars/1.png',
    designationIcon: 'mdi:fountain-pen-tip',
    coverImg: '/images/pages/profile-banner.png'
  },
  profile: {
    about: [
      { property: 'Full Name', value: 'John Doe', icon: 'mdi:account-outline' },
      { property: 'Status', value: 'active', icon: 'mdi:check' },
      { property: 'Role', value: 'Developer', icon: 'mdi:star-outline' },
      { property: 'Country', value: 'USA', icon: 'mdi:flag-outline' },
      { property: 'Language', value: 'English', icon: 'mdi:translate' }
    ],
    contacts: [
      { property: 'Contact', value: '(123) 456-7890', icon: 'mdi:phone-outline' },
      { property: 'Skype', value: 'john.doe', icon: 'mdi:message-outline' },
      { property: 'Email', value: 'john.doe@example.com', icon: 'mdi:email-outline' }
    ],
    teams: [
      { property: 'Backend Developer', value: '(126 Members)', icon: 'mdi:github', color: 'primary' },
      { property: 'React Developer', value: '(98 Members)', icon: 'mdi:react', color: 'info' }
    ],
    overview: [
      { property: 'Task Compiled', value: '13.5k', icon: 'mdi:check' },
      { property: 'Connections', value: '897', icon: 'mdi:account-outline' },
      { property: 'Projects Compiled', value: '146', icon: 'mdi:view-grid-plus-outline' }
    ],
    connections: [
      {
        isFriend: false,
        connections: '45',
        name: 'Cecilia Payne',
        avatar: '/images/avatars/2.png'
      },
      {
        isFriend: true,
        connections: '1.32k',
        name: 'Curtis Fletcher',
        avatar: '/images/avatars/3.png'
      },
      {
        isFriend: true,
        connections: '125',
        name: 'Alice Stone',
        avatar: '/images/avatars/4.png'
      },
      {
        isFriend: false,
        connections: '456',
        name: 'Darrell Barnes',
        avatar: '/images/avatars/5.png'
      },
      {
        isFriend: false,
        connections: '1.2k',
        name: 'Eugenia Moore',
        avatar: '/images/avatars/8.png'
      }
    ],
    teamsTech: [
      {
        members: 72,
        ChipColor: 'error',
        chipText: 'Developer',
        title: 'React Developers',
        avatar: '/images/icons/project-icons/react-label.png'
      },
      {
        members: 122,
        chipText: 'Support',
        ChipColor: 'primary',
        title: 'Support Team',
        avatar: '/images/icons/project-icons/support-label.png'
      },
      {
        members: 7,
        ChipColor: 'info',
        chipText: 'Designer',
        title: 'UI Designer',
        avatar: '/images/icons/project-icons/figma-label.png'
      },
      {
        members: 289,
        ChipColor: 'error',
        chipText: 'Developer',
        title: 'Vue.js Developers',
        avatar: '/images/icons/project-icons/vue-label.png'
      },
      {
        members: 24,
        chipText: 'Marketing',
        ChipColor: 'secondary',
        title: 'Digital Marketing',
        avatar: '/images/icons/project-icons/twitter-label.png'
      }
    ]
  },
  teams: [
    {
      extraMembers: 25,
      title: 'React Developers',
      avatar: '/images/icons/project-icons/react-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
        { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
        { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' },
        { avatar: '/images/avatars/4.png', name: 'George Burrill' }
      ],
      description:
        'We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.',
      chips: [
        {
          title: 'React',
          color: 'primary'
        },
        {
          title: 'MUI',
          color: 'info'
        }
      ]
    },
    {
      extraMembers: 15,
      title: 'Vue.js Dev Team',
      avatar: '/images/icons/project-icons/vue-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: "Kaith D'souza" },
        { avatar: '/images/avatars/6.png', name: 'John Doe' },
        { avatar: '/images/avatars/7.png', name: 'Alan Walker' },
        { avatar: '/images/avatars/8.png', name: 'Calvin Middleton' }
      ],
      description:
        'The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.',
      chips: [
        {
          title: 'Vuejs',
          color: 'success'
        },
        {
          color: 'error',
          title: 'Developer'
        }
      ]
    },
    {
      extraMembers: 55,
      title: 'Creative Designers',
      avatar: '/images/icons/project-icons/xd-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/1.png', name: 'Jimmy Ressula' },
        { avatar: '/images/avatars/2.png', name: 'Kristi Lawker' },
        { avatar: '/images/avatars/3.png', name: 'Danny Paul' },
        { avatar: '/images/avatars/4.png', name: 'Alicia Littleton' }
      ],
      description:
        'A design or product team is more than just the people on it. A team includes the people, the roles they play.',
      chips: [
        {
          title: 'Sketch',
          color: 'warning'
        },
        {
          title: 'XD',
          color: 'error'
        }
      ]
    },
    {
      extraMembers: 35,
      title: 'Support Team',
      avatar: '/images/icons/project-icons/support-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: 'Andrew Tye' },
        { avatar: '/images/avatars/6.png', name: 'Rishi Swaat' },
        { avatar: '/images/avatars/7.png', name: 'Rossie Kim' },
        { avatar: '/images/avatars/8.png', name: 'Mary Hunter' }
      ],
      description:
        'Support your team. Your customer support team is fielding the good, the bad, and the ugly day in and day out.',
      chips: [
        {
          color: 'info',
          title: 'Zendesk'
        }
      ]
    },
    {
      extraMembers: 19,
      title: 'Digital Marketing',
      avatar: '/images/icons/project-icons/social-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/1.png', name: 'Kim Merchent' },
        { avatar: '/images/avatars/2.png', name: "Sam D'souza" },
        { avatar: '/images/avatars/3.png', name: 'Nurvi Karlos' },
        { avatar: '/images/avatars/4.png', name: 'Margorie Whitmire' }
      ],
      description:
        'Digital marketing refers to advertising delivered through digital channels such as search engines, websites…',
      chips: [
        {
          color: 'primary',
          title: 'Twitter'
        },
        {
          title: 'Email',
          color: 'success'
        }
      ]
    },
    {
      title: 'Event',
      extraMembers: 55,
      avatar: '/images/icons/project-icons/event-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: 'Vinnie Mostowy' },
        { avatar: '/images/avatars/6.png', name: 'Allen Rieske' },
        { avatar: '/images/avatars/7.png', name: 'Julee Rossignol' },
        { avatar: '/images/avatars/8.png', name: 'Daniel Long' }
      ],
      description:
        'Event is defined as a particular contest which is part of a program of contests. An example of an event is the long…',
      chips: [
        {
          title: 'Hubilo',
          color: 'success'
        }
      ]
    },
    {
      extraMembers: 45,
      title: 'Figma Resources',
      avatar: '/images/icons/project-icons/figma-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/1.png', name: 'Andrew Mostowy' },
        { avatar: '/images/avatars/2.png', name: 'Micky Ressula' },
        { avatar: '/images/avatars/3.png', name: 'Michel Pal' },
        { avatar: '/images/avatars/4.png', name: 'Herman Lockard' }
      ],
      description:
        'Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.',
      chips: [
        {
          title: 'UI/UX',
          color: 'success'
        },
        {
          title: 'Figma',
          color: 'secondary'
        }
      ]
    },
    {
      extraMembers: 50,
      title: 'Only Beginners',
      avatar: '/images/icons/project-icons/html-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: 'Kim Karlos' },
        { avatar: '/images/avatars/6.png', name: 'Katy Turner' },
        { avatar: '/images/avatars/7.png', name: 'Peter Adward' },
        { avatar: '/images/avatars/8.png', name: 'Leona Miller' }
      ],
      description:
        'Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and…',
      chips: [
        {
          title: 'CSS',
          color: 'info'
        },
        {
          title: 'HTML',
          color: 'warning'
        }
      ]
    }
  ],
  projects: [
    {
      daysLeft: 28,
      comments: 15,
      totalTask: 344,
      hours: '380/244',
      tasks: '290/344',
      budget: '$18.2k',
      completedTask: 328,
      deadline: '28/2/22',
      chipColor: 'success',
      startDate: '14/2/21',
      budgetSpent: '$24.8k',
      members: '280 members',
      title: 'Social Banners',
      client: 'Christian Jimenez',
      avatar: '/images/icons/project-icons/social-label.png',
      description: 'We are Consulting, Software Development and Web Development Services.',
      avatarGroup: [
        { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
        { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
        { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' }
      ]
    },
    {
      daysLeft: 15,
      comments: 236,
      totalTask: 90,
      tasks: '12/90',
      hours: '98/135',
      budget: '$1.8k',
      completedTask: 38,
      deadline: '21/6/22',
      budgetSpent: '$2.4k',
      chipColor: 'warning',
      startDate: '18/8/21',
      members: '1.1k members',
      title: 'Admin Template',
      client: 'Jeffrey Phillips',
      avatar: '/images/icons/project-icons/react-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/4.png', name: "Kaith D'souza" },
        { avatar: '/images/avatars/5.png', name: 'John Doe' },
        { avatar: '/images/avatars/6.png', name: 'Alan Walker' }
      ],
      description: "Time is our most valuable asset, that's why we want to help you save it by creating…"
    },
    {
      daysLeft: 45,
      comments: 98,
      budget: '$420',
      totalTask: 140,
      tasks: '22/140',
      hours: '880/421',
      completedTask: 95,
      chipColor: 'error',
      budgetSpent: '$980',
      deadline: '8/10/21',
      title: 'App Design',
      startDate: '24/7/21',
      members: '458 members',
      client: 'Ricky McDonald',
      avatar: '/images/icons/project-icons/vue-label.png',
      description: 'App design combines the user interface (UI) and user experience (UX).',
      avatarGroup: [
        { avatar: '/images/avatars/7.png', name: 'Jimmy Ressula' },
        { avatar: '/images/avatars/8.png', name: 'Kristi Lawker' },
        { avatar: '/images/avatars/1.png', name: 'Danny Paul' }
      ]
    },
    {
      comments: 120,
      daysLeft: 126,
      totalTask: 420,
      budget: '2.43k',
      tasks: '237/420',
      hours: '1.2k/820',
      completedTask: 302,
      deadline: '12/9/22',
      budgetSpent: '$8.5k',
      chipColor: 'warning',
      startDate: '10/2/19',
      members: '137 members',
      client: 'Hulda Wright',
      title: 'Create Website',
      avatar: '/images/icons/project-icons/html-label.png',
      description: 'Your domain name should reflect your products or services so that your...',
      avatarGroup: [
        { avatar: '/images/avatars/2.png', name: 'Andrew Tye' },
        { avatar: '/images/avatars/3.png', name: 'Rishi Swaat' },
        { avatar: '/images/avatars/4.png', name: 'Rossie Kim' }
      ]
    },
    {
      daysLeft: 5,
      comments: 20,
      totalTask: 285,
      tasks: '29/285',
      budget: '28.4k',
      hours: '142/420',
      chipColor: 'error',
      completedTask: 100,
      deadline: '25/12/21',
      startDate: '12/12/20',
      members: '82 members',
      budgetSpent: '$52.7k',
      client: 'Jerry Greene',
      title: 'Figma Dashboard',
      avatar: '/images/icons/project-icons/figma-label.png',
      description: 'Use this template to organize your design project. Some of the key features are…',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: 'Kim Merchent' },
        { avatar: '/images/avatars/6.png', name: "Sam D'souza" },
        { avatar: '/images/avatars/7.png', name: 'Nurvi Karlos' }
      ]
    },
    {
      daysLeft: 4,
      comments: 16,
      budget: '$655',
      totalTask: 290,
      tasks: '29/290',
      hours: '580/445',
      completedTask: 290,
      budgetSpent: '$1.3k',
      chipColor: 'success',
      deadline: '02/11/21',
      startDate: '17/8/21',
      title: 'Logo Design',
      members: '16 members',
      client: 'Olive Strickland',
      avatar: '/images/icons/project-icons/xd-label.png',
      description: 'Premium logo designs created by top logo designers. Create the branding of business.',
      avatarGroup: [
        { avatar: '/images/avatars/8.png', name: 'Kim Karlos' },
        { avatar: '/images/avatars/1.png', name: 'Katy Turner' },
        { avatar: '/images/avatars/2.png', name: 'Peter Adward' }
      ]
    }
  ],
  connections: [
    {
      tasks: '834',
      projects: '18',
      isConnected: true,
      connections: '129',
      name: 'Mark Gilbert',
      designation: 'UI Designer',
      avatar: '/images/avatars/1.png',
      chips: [
        {
          title: 'Figma',
          color: 'secondary'
        },
        {
          title: 'Sketch',
          color: 'warning'
        }
      ]
    },
    {
      tasks: '2.31k',
      projects: '112',
      isConnected: false,
      connections: '1.28k',
      name: 'Eugenia Parsons',
      designation: 'Developer',
      avatar: '/images/avatars/2.png',
      chips: [
        {
          color: 'error',
          title: 'Angular'
        },
        {
          color: 'info',
          title: 'React'
        }
      ]
    },
    {
      tasks: '1.25k',
      projects: '32',
      isConnected: false,
      connections: '890',
      name: 'Francis Byrd',
      designation: 'Developer',
      avatar: '/images/avatars/3.png',
      chips: [
        {
          title: 'HTML',
          color: 'primary'
        },
        {
          color: 'info',
          title: 'React'
        }
      ]
    },
    {
      tasks: '12.4k',
      projects: '86',
      isConnected: false,
      connections: '890',
      name: 'Leon Lucas',
      designation: 'UI/UX Designer',
      avatar: '/images/avatars/4.png',
      chips: [
        {
          title: 'Figma',
          color: 'secondary'
        },
        {
          title: 'Sketch',
          color: 'warning'
        },
        {
          color: 'primary',
          title: 'Photoshop'
        }
      ]
    },
    {
      tasks: '23.8k',
      projects: '244',
      isConnected: true,
      connections: '2.14k',
      name: 'Jayden Rogers',
      designation: 'Full Stack Developer',
      avatar: '/images/avatars/5.png',
      chips: [
        {
          color: 'info',
          title: 'React'
        },
        {
          title: 'HTML',
          color: 'warning'
        },
        {
          color: 'success',
          title: 'Node.js'
        }
      ]
    },
    {
      tasks: '1.28k',
      projects: '32',
      isConnected: false,
      designation: 'SEO',
      connections: '1.27k',
      name: 'Jeanette Powell',
      avatar: '/images/avatars/6.png',
      chips: [
        {
          title: 'Analysis',
          color: 'secondary'
        },
        {
          color: 'success',
          title: 'Writing'
        }
      ]
    }
  ]
}
const UserProfile = () => {
  // ** State
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const navigate = useNavigate()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleChange = (event, value) => {
    setIsLoading(true)
    setActiveTab(value)
    setIsLoading(false)
    // navigate({
    //     pathname: `/pages/user-profile/${value.toLowerCase()}`
    //   })
    //   .then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  const tabContentList = {
    profile: <Profile data={data} />,
    teams: <Teams data={data} />,
    projects: <Projects data={data} />,
    connections: <Connections data={data} />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader />
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  onChange={handleChange}
                  aria-label='customized tabs example'
                >
                  <Tab
                    value='profile'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Iconify icon='mdi:account-outline' />
                        {!hideText && 'Profile'}
                      </Box>
                    }
                  />
                  <Tab
                    value='teams'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Iconify icon='mdi:account-multiple-outline' />
                        {!hideText && 'Teams'}
                      </Box>
                    }
                  />
                  <Tab
                    value='projects'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Iconify icon='mdi:view-grid-outline' />
                        {!hideText && 'Projects'}
                      </Box>
                    }
                  />
                  <Tab
                    value='connections'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Iconify icon='mdi:link-variant' />
                        {!hideText && 'Connections'}
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) : (
                  <TabPanel sx={{ p: 0 }} value={activeTab}>
                    {tabContentList[activeTab]}
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default UserProfile
