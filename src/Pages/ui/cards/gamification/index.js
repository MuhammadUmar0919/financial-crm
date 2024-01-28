// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import CardAward from 'views/ui/cards/gamification/CardAward'
import CardUpgradeAccount from 'views/ui/cards/gamification/CardUpgradeAccount'
import CardCongratulationsJohn from 'views/ui/cards/gamification/CardCongratulationsJohn'
import CardCongratulationsDaisy from 'views/ui/cards/gamification/CardCongratulationsDaisy'

const CardGamification = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} md={4}>
        <CardAward />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardCongratulationsJohn />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardCongratulationsDaisy />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardUpgradeAccount />
      </Grid>
    </Grid>
  )
}

export default CardGamification
