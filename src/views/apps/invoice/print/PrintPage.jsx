// ** React Imports
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'

// ** Third Party Components
import axios from 'axios'

// ** Configs
import themeConfig from 'configs/themeConfig'
import { useSelector } from 'react-redux'
import { userProfile } from 'Utils/dataUtils'
import { Stack } from '@mui/material'
import { momentDate } from "Utils/formatTime"

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const InvoicePrint = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const { invoiceData } = useSelector((state) => state.invoiceReducer);
  const { clientsData } = useSelector((state) => state.clientsReducer);
  const client = userProfile(data?.billTo, clientsData)

  // ** Hooks
  const theme = useTheme()
  useEffect(() => {
    setTimeout(() => {
      window.print("")
    }, 100)
  }, [])
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
      <Box sx={{ p: 12, pb: 6 }}>
        <Grid container>
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <svg width={40} fill='none' height={22} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fillOpacity='0.4'
                    fill='url(#paint0_linear_7821_79167)'
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fillOpacity='0.4'
                    fill='url(#paint1_linear_7821_79167)'
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                  />
                  <defs>
                    <linearGradient
                      y1='0'
                      x1='25.1443'
                      x2='25.1443'
                      y2='143.953'
                      id='paint0_linear_7821_79167'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop />
                      <stop offset='1' stopOpacity='0' />
                    </linearGradient>
                    <linearGradient
                      y1='0'
                      x1='25.1443'
                      x2='25.1443'
                      y2='143.953'
                      id='paint1_linear_7821_79167'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop />
                      <stop offset='1' stopOpacity='0' />
                    </linearGradient>
                  </defs>
                </svg>
                <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <div>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Office 149, 450 South Brand Brooklyn
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  San Diego County, CA 91905, USA
                </Typography>
                <Typography variant='body2'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {`Invoice #${data.id}`}
              </Typography>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography variant='body2' sx={{ mr: 3 }}>
                  Date Issued:
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {momentDate(data.issuedDate)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ mr: 3 }}>
                  Date Due:
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {momentDate(data.dueDate)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                Invoice To:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {client.fullName}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {client.company}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {client.address}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {client.contact}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {client.companyEmail}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
              <div>
                <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                  Bill To:
                </Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Total Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.totalDue}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Bank name:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.bankName}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Country:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.country}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>IBAN:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.iban}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>SWIFT code:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.swiftCode}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
              </div>
            </Grid>
          </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important' }} />

        <Table sx={{mb: 6}}>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>qty</TableCell>
                <TableCell>price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {
                  data.details.map((item) => (
                    <TableRow>
                      <TableCell>{item.service}</TableCell>
                      <TableCell>
                        <Stack spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {item.invoiceTitle}
                          </Typography>
                          <Typography variant="body2" noWrap>
                            {item.invoiceDesc}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>${item.total}</TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        <Grid container>
          <Grid item xs={8} sm={7} lg={9}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2, fontWeight: 600 }}>
                Salesperson:
              </Typography>
              <Typography variant='body2'>Tommy Shelby</Typography>
            </Box>

            <Typography variant='body2'>Thanks for your business</Typography>
          </Grid>
          <Grid item xs={4} sm={5} lg={3}>
          <CalcWrapper>
                <Typography variant='body2'>Subtotal:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  ${data.subTotal}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Shipping:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  ${data.shipping}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Discount:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  ${data.discount}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Tax:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  {data.taxes}%
                </Typography>
              </CalcWrapper>
              <Divider
                sx={{ mt: theme => `${theme.spacing(5)} !important`, mb: theme => `${theme.spacing(3)} !important` }}
              />
              <CalcWrapper>
                <Typography variant='subtitle1'>Total:</Typography>
                <Typography variant='subtitle1' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  ${data.total}
                </Typography>
              </CalcWrapper>
          </Grid>
        </Grid>

        {
          data.clientNotes.note && (
            <>
              <Divider sx={{ my: theme => `${theme.spacing(4.5)} !important` }} />

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>Note:</Typography> 
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {data.clientNotes.data}
                </Typography>
              </Box>
            </>
          )
        }

      </Box>
    )
  } else if (error) {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Alert severity='error'>
              Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
              <Link href='/invoice'>Invoice List</Link>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    )
  } else {
    return null
  }
}

export default InvoicePrint
