// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import EditCard from './EditCard'
import EditActions from './EditActions'
import AddPaymentDrawer from 'views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'views/apps/invoice/shared-drawer/SendInvoiceDrawer'

// ** React Import 
import { Link  } from "react-router-dom"
import { useSelector } from 'react-redux'

const InvoiceEdit = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)
  const { invoiceData } = useSelector((state) => state.invoiceReducer);
  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  React.useEffect(() => {
    const findData = invoiceData.find(({id}) => id === id)
    if(findData) {
      setData(findData)
      setError(false)
    } else {
      setError(true)
    }
  }, [])

  if (data) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <EditCard data={data} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <EditActions
              id={id}
              toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
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

export default InvoiceEdit
