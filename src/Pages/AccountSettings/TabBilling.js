// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import CurrentPlanCard from 'Pages/AccountSettings/billing/CurrentPlanCard'
import PaymentMethodCard from 'Pages/AccountSettings/billing/PaymentMethodCard'
import BillingAddressCard from 'Pages/AccountSettings/billing/BillingAddressCard'
import BillingHistoryTable from 'Pages/AccountSettings/billing/BillingHistoryTable'

const TabBilling = ({ apiPricingPlanData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard data={apiPricingPlanData} />
      </Grid>

      <Grid item xs={12}>
        <PaymentMethodCard />
      </Grid>

      <Grid item xs={12}>
        <BillingAddressCard />
      </Grid>

      <Grid item xs={12}>
        <BillingHistoryTable />
      </Grid>
    </Grid>
  )
}

export default TabBilling
