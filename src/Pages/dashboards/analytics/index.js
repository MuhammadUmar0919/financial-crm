// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Iconify from 'Components/Iconify'

// ** Custom Component Import
import CardStatisticsVertical from '@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsSessions from 'views/dashboards/analytics/AnalyticsSessions'
import AnalyticsOverview from 'views/dashboards/analytics/AnalyticsOverview'
import AnalyticsPerformance from 'views/dashboards/analytics/AnalyticsPerformance'
import AnalyticsWeeklySales from 'views/dashboards/analytics/AnalyticsWeeklySales'
import AnalyticsVisitsByDay from 'views/dashboards/analytics/AnalyticsVisitsByDay'
import AnalyticsTotalRevenue from 'views/dashboards/analytics/AnalyticsTotalRevenue'
import AnalyticsSalesCountry from 'views/dashboards/analytics/AnalyticsSalesCountry'
import AnalyticsCongratulations from 'views/dashboards/analytics/AnalyticsCongratulations'
import AnalyticsActivityTimeline from 'views/dashboards/analytics/AnalyticsActivityTimeline'
import AnalyticsTotalTransactions from 'views/dashboards/analytics/AnalyticsTotalTransactions'
import AnalyticsProjectStatistics from 'views/dashboards/analytics/AnalyticsProjectStatistics'
import AnalyticsTopReferralSources from 'views/dashboards/analytics/AnalyticsTopReferralSources'

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={8}>
          <AnalyticsCongratulations />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='155k'
            color='primary'
            trendNumber='+22%'
            title='Total Orders'
            chipText='Last 4 Month'
            icon={<Iconify icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <AnalyticsSessions />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTotalTransactions />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsPerformance />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsProjectStatistics />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <AnalyticsTotalRevenue />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVertical
                stats='$13.4k'
                color='success'
                trendNumber='+38%'
                title='Total Sales'
                chipText='Last Six Month'
                icon={<Iconify icon='mdi:currency-usd' />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVertical
                color='info'
                stats='142.8k'
                trendNumber='+62%'
                chipText='Last One Year'
                title='Total Impressions'
                icon={<Iconify icon='mdi:link' />}
              />
            </Grid>
            <Grid item xs={6}>
              <AnalyticsOverview />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsSalesCountry />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTopReferralSources />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsWeeklySales />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsVisitsByDay />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsActivityTimeline />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
