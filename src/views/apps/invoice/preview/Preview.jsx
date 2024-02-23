// ** React Imports
import React from 'react'
import { Link, useParams } from 'react-router-dom'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import PreviewCard from 'views/apps/invoice/preview/PreviewCard'
import PreviewActions from 'views/apps/invoice/preview/PreviewActions'
import AddPaymentDrawer from 'views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'views/apps/invoice/shared-drawer/SendInvoiceDrawer'
import { useSelector } from 'react-redux'

const InvoicePreview = () => {
  // ** State
  const params = useParams()
  const { id} = params
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = React.useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = React.useState(false)
  const { invoiceData } = useSelector((state) => state.invoiceReducer);

  React.useEffect(() => {
    if(id) {
      const findData = invoiceData.find((item) => item.id = params.id)
      setData(findData)
      console.log(data)
      setError(false)
    } else {
      setError(true)
      setData(null)
    }
  }, [])

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)
  if (data) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={data} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={id}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
            />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link to='/invoice'>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default InvoicePreview
