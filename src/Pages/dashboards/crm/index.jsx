// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Iconify from '@/@core/components/iconify'

// ** Custom Component Import
import CardStatisticsVertical from '@/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmAward from '@/views/dashboards/crm/CrmAward'
import CrmTable from '@/views/dashboards/crm/CrmTable'
import CrmTotalGrowth from '@/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from '@/views/dashboards/crm/CrmTotalProfit'
import CrmMonthlyBudget from '@/views/dashboards/crm/CrmMonthlyBudget'
import CrmExternalLinks from '@/views/dashboards/crm/CrmExternalLinks'
import CrmWeeklyOverview from '@/views/dashboards/crm/CrmWeeklyOverview'
import CrmPaymentHistory from '@/views/dashboards/crm/CrmPaymentHistory'
import CrmOrganicSessions from '@/views/dashboards/crm/CrmOrganicSessions'
import CrmProjectTimeline from '@/views/dashboards/crm/CrmProjectTimeline'
import CrmMeetingSchedule from '@/views/dashboards/crm/CrmMeetingSchedule'
import CrmSocialNetworkVisits from '@/views/dashboards/crm/CrmSocialNetworkVisits'
import CrmMostSalesInCountries from '@/views/dashboards/crm/CrmMostSalesInCountries'

const CrmDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={4}>
          <CrmAward />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CardStatisticsVertical
            stats='155k'
            color='primary'
            trendNumber='+22%'
            title='Total Orders'
            chipText='Last 4 Month'
            icon={<Iconify icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CardStatisticsVertical
            stats='$13.4k'
            color='success'
            trendNumber='+38%'
            title='Total Sales'
            chipText='Last Six Month'
            icon={<Iconify icon='mdi:currency-usd' />}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CrmTotalProfit />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CrmTotalGrowth />
        </Grid>
        <Grid item xs={12} md={4}>
          <CrmOrganicSessions />
        </Grid>
        <Grid item xs={12} md={8}>
          <CrmProjectTimeline />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmWeeklyOverview />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmSocialNetworkVisits />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmMonthlyBudget />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmMeetingSchedule />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmExternalLinks />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CrmPaymentHistory />
        </Grid>
        <Grid item xs={12} md={4}>
          <CrmMostSalesInCountries />
        </Grid>
        <Grid item xs={12} md={8}>
          <CrmTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CrmDashboard
