// ** React Imports
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Select from '@mui/material/Select'

// ** Icon Imports
import Iconify from '@core/components/Iconify'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
// import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Utils Import
import { MomentDate } from 'Utils/momenDate';
import { getInitials } from '@core/utils/get-initials'
import { getDateRange } from '@core/utils/get-daterange';

// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
import CustomAvatar from '@core/components/mui/avatar'
import OptionsMenu from '@core/components/option-menu'
import TableHeader from 'views/apps/invoice/list/TableHeader'

import { Link } from 'react-router-dom'
// ** Styled Components
import DatePickerWrapper from '@core/styles/libs/react-datepicker'
// context import
import { AbilityContext } from 'Layouts/layout/components/acl/Can'
import { userProfile } from 'Utils/userProfile';
import { fDate } from 'Utils/formatTime';
import { ToastPromise } from '@core/components/Downloads/ToastPromise';
import { statusInvoice } from 'Data';
import { statusColors } from 'Utils/statusColors';

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const invoiceStatusObj = {
  Sent: { icon: 'mdi:send' },
  Paid: { icon: 'mdi:check' },
  Draft: { icon: 'mdi:content-save-outline' },
  Downloaded: { icon: 'mdi:arrow-down' }
}

// ** renders client column
const renderClient = row => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

/* eslint-disable */
const CustomDateInput = React.forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const InvoiceList = () => {
  // ** State
  const dispatch = useDispatch()
  const [data, setData] = React.useState([])
  const [dates, setDates] = React.useState([])
  const [value, setValue] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)
  const [statusValue, setStatusValue] = React.useState('')
  const [selectedRows, setSelectedRows] = React.useState([])
  const [endDateRange, setEndDateRange] = React.useState(null)
  const [startDateRange, setStartDateRange] = React.useState(null)
  const { simpleData } = useSelector((state) => state.simpleReducer);
  const { invoiceData } = useSelector((state) => state.invoiceReducer);
  const { clientsData } = useSelector((state) => state.clientsReducer);

  // ** Hooks
  const ability = React.useContext(AbilityContext)
  React.useEffect(() => {
    const filtereData = invoiceData.filter(invoice => {
      const queryLowered = value.toLowerCase()
      const client = userProfile(invoice.billTo, clientsData)
      const simple = userProfile(invoice.createdBy, simpleData)
      
      if (dates.length) {
        const [start, end] = dates
        const filtered = []
        const range = getDateRange(start, end)
        const invoiceDate = new Date(invoice.issuedDate)
        range.filter(date => {
          const rangeDate = new Date(date)
          if (
            invoiceDate.getFullYear() === rangeDate.getFullYear() &&
            invoiceDate.getDate() === rangeDate.getDate() &&
            invoiceDate.getMonth() === rangeDate.getMonth()
          ) {
            filtered.push(invoice.id)
          }
        })
        if (filtered.length && filtered.includes(invoice.id)) {
          return (
            (
              client.companyEmail.toLowerCase().includes(queryLowered) ||
              client.fullName.toLowerCase().includes(queryLowered) ||
              client.companyName.toLowerCase().includes(queryLowered) ||
              client.country.toLowerCase().includes(queryLowered) ||
              client.address.toLowerCase().includes(queryLowered) ||
              simple.fullName.toLowerCase().includes(queryLowered) ||
              simple.username.toLowerCase().includes(queryLowered) ||
              simple.email.toLowerCase().includes(queryLowered) ||
              String(invoice.id).toLowerCase().includes(queryLowered) ||
              String(invoice.total).toLowerCase().includes(queryLowered) ||
              String(invoice.balance).toLowerCase().includes(queryLowered) ||
              invoice.dueDate.toLowerCase().includes(queryLowered)) &&
              invoice.invoiceStatus.toLowerCase() === (statusValue.toLowerCase() || invoice.invoiceStatus.toLowerCase())
          )
        }
      } else {
        return (
          (
            client.companyEmail.toLowerCase().includes(queryLowered) ||
            client.fullName.toLowerCase().includes(queryLowered) ||
            client.companyName.toLowerCase().includes(queryLowered) ||
            client.country.toLowerCase().includes(queryLowered) ||
            client.address.toLowerCase().includes(queryLowered) ||
            simple.fullName.toLowerCase().includes(queryLowered) ||
            simple.username.toLowerCase().includes(queryLowered) ||
            simple.email.toLowerCase().includes(queryLowered) ||
            String(invoice.id).toLowerCase().includes(queryLowered) ||
            String(invoice.total).toLowerCase().includes(queryLowered) ||
            String(invoice.balance).toLowerCase().includes(queryLowered) ||
            invoice.dueDate.toLowerCase().includes(queryLowered)) &&
            invoice.invoiceStatus.toLowerCase() === (statusValue.toLowerCase() || invoice.invoiceStatus.toLowerCase())
        )
      }
    })
    setData(filtereData)
  }, [statusValue, value, dates])

  // React.useEffect(() => {
  // const filteredData = invoiceData.filter((invoice) => {
  //   const queryLowered = value.toLowerCase();
  //   const client = userProfile(invoice.billTo, clientsData);
  //   const simple = userProfile(invoice.createdBy, simpleData);

  //   const isInDateRange = () => {
  //     if (!dates.length) return true;

  //     const [start, end] = dates;
  //     const range = getDateRange(start, end);
  //     const invoiceDate = new Date(invoice.issuedDate);

  //     return range.some((date) => {
  //       const rangeDate = new Date(date);
  //       return (
  //         invoiceDate.getFullYear() === rangeDate.getFullYear() &&
  //         invoiceDate.getDate() === rangeDate.getDate() &&
  //         invoiceDate.getMonth() === rangeDate.getMonth()
  //       );
  //     });
  //   };

  //   const includesQuery = (str) => str.toLowerCase().includes(queryLowered);

  //   // Invoking both functions
  //   const dateInRange = isInDateRange();
  //   const queryMatches = (
  //     includesQuery(client.companyEmail) ||
  //     includesQuery(client.fullName) ||
  //     includesQuery(client.companyName) ||
  //     includesQuery(client.country) ||
  //     includesQuery(client.address) ||
  //     includesQuery(simple.fullName) ||
  //     includesQuery(simple.username) ||
  //     includesQuery(simple.email) ||
  //     String(invoice.id).toLowerCase().includes(queryLowered) ||
  //     String(invoice.total).toLowerCase().includes(queryLowered) ||
  //     String(invoice.balance).toLowerCase().includes(queryLowered) ||
  //     includesQuery(invoice.dueDate) ||
  //     invoice.invoiceStatus.toLowerCase() === (statusValue.toLowerCase() || invoice.invoiceStatus.toLowerCase())
  //   );

  //   return dateInRange ? queryMatches : queryMatches;
  // });

  //   setData(filteredData);
  // }, [statusValue, value, dates]);

  const handleFilter = (e) => {
    setValue(e.target.value)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

   const onDelete = async (id) => {
      dispatch({ type: "INVOICE_START" })
      try {
        await ToastPromise("Invoice", "onDelete", true)
        dispatch({ type: "INVOICE_DELETE", id: id })
        dispatch({ type: "AUTH_DELETE", id: id })
      } catch (error) {
        dispatch({ type: "INVOICE_FAIL" })
        await ToastPromise("Invoice", "onDelete", false)
      }
   }
   
  const defaultColumns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: '#',
      renderCell: ({ row }) => <StyledLink href={`/invoice/preview/${row.id}`}>{`#${row.id}`}</StyledLink>
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'invoiceStatus',
      renderHeader: () => (
        <Box sx={{ display: 'flex', color: 'action.active' }}>
          <Iconify icon='mdi:trending-up' fontSize={20} />
        </Box>
      ),
      renderCell: ({ row }) => {
        const { dueDate, balance, invoiceStatus } = row
        return (
          <Tooltip
            title={
              <div>
                <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                  {invoiceStatus}
                </Typography>
                <br />
                <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                  Balance:
                </Typography>{' '}
                {balance}
                <br />
                <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                  Due Date:
                </Typography>{' '}
                {fDate(dueDate)}
              </div>
            }
          >
            <CustomAvatar skin='light' color={statusColors(invoiceStatus)} sx={{ width: 34, height: 34 }}>
              <Iconify icon={invoiceStatusObj[invoiceStatus]?.icon} fontSize='1.25rem' />
            </CustomAvatar>
          </Tooltip>
        )
      }
    },
    {
      flex: 0.25,
      field: 'fullName',
      minWidth: 300,
      headerName: 'Client',
      renderCell: ({ row }) => {
        const { fullName, companyEmail } = userProfile(row.billTo, clientsData)
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
              >
                {fullName}
              </Typography>
              <Typography noWrap variant='caption'>
                {companyEmail}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      field: 'total',
      headerName: 'Total',
      renderCell: ({ row }) => <Typography variant='body2'>{`$${row.total || 0}`}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 125,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => <Typography variant='body2'>{fDate(row.issuedDate)}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 90,
      field: 'balance',
      headerName: 'Balance',
      renderCell: ({ row }) => {
        return row.balance !== 0 ? (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row.balance}
          </Typography>
        ) : (
          <CustomChip size='small' skin='light' color='success' label='Paid' />
        )
      }
    }
  ]

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Invoice'>
            {/* <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}> */}
            <IconButton onClick={() => onDelete(row.id)} size='small' sx={{ mr: 0.5 }}>
              <Iconify icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} to={`/invoice/preview/${row.id}`}>
              <Iconify icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: 'Download',
                icon: <Iconify icon='mdi:download' fontSize={20} />
              },
              ability.can("update", "invoice") && (
                {
                  text: 'Edit',
                  href: `/invoice/edit/${row.id}`,
                  icon: <Iconify icon='mdi:pencil-outline' fontSize={20} />
                }),
              {
                text: 'Duplicate',
                icon: <Iconify icon='mdi:content-copy' fontSize={20} />
              }
            ]}
          />
        </Box>
      )
    }
  ]
  
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-status-select'>Invoice Status</InputLabel>

                    <Select
                      fullWidth
                      value={statusValue}
                      sx={{ mr: 4, mb: 2 }}
                      label='Invoice Status'
                      onChange={handleStatusValue}
                      labelId='invoice-status-select'
                      
                    >
                      <MenuItem value=''>none</MenuItem>
                      <MenuItem value='downloaded'>Downloaded</MenuItem>
                      {
                        statusInvoice.map(({ name, id}) => (
                          <MenuItem key={id} value={name}>{name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomDateInput
                        dates={dates}
                        setDates={setDates}
                        label='Invoice Date'
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader 
              value={value} 
              setValue={setValue} 
              selectedRows={selectedRows} 
              handleFilter={handleFilter} 
            />
            <DataGrid
              autoHeight
              pagination
              rows={data}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default InvoiceList
