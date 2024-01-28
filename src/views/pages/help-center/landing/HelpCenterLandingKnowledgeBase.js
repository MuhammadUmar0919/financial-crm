// ** Next Import
import { Link } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Iconify from 'Components/Iconify'

// ** Custom Components Import
import CustomAvatar from '@core/components/mui/avatar'

const HelpCenterLandingKnowledgeBase = ({ categories }) => {
  const renderCategories = () => {
    if (categories && categories.length) {
      return categories.map(category => {
        const totalArticles = category.subCategories
          .map(subCategory => subCategory.articles.length)
          .reduce((partialSum, a) => partialSum + a, 0)

        return (
          <Grid item xs={12} sm={6} md={4} key={category.slug}>
            <Box
              sx={{
                p: 5,
                boxShadow: 6,
                height: '100%',
                display: 'flex',
                borderRadius: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: 'background.paper'
              }}
            >
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={category.avatarColor}
                  sx={{ mr: 3, height: 34, width: 34 }}
                >
                  <Iconify icon={category.icon} />
                </CustomAvatar>
                <Typography
                  variant='h6'
                  component={Link}
                  to={`/general-settings/help-center/${category.slug}/${category.subCategories[0].slug}`}
                  sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {category.title}
                </Typography>
              </Box>
              <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {category.subCategories.map(subcategory => (
                  <Box
                    component={Link}
                    key={subcategory.title}
                    to={`/general-settings/help-center/${category.slug}/${subcategory.slug}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      '&:not(:last-of-type)': { mb: 2 },
                      '& svg': { color: 'primary.main' }
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Iconify icon='mdi:circle-small' />
                    </Box>
                    <Typography sx={{ color: 'primary.main' }}>{subcategory.title}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography
                component={Link}
                to={`/general-settings/help-center/${category.slug}/${category.subCategories[0].slug}`}
                sx={{ mt: 'auto', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {`${totalArticles} Articles`}
              </Typography>
            </Box>
          </Grid>
        )
      })
    } else {
      return null
    }
  }

  return (
    <Grid container spacing={6}>
      {renderCategories()}
    </Grid>
  )
}

export default HelpCenterLandingKnowledgeBase
