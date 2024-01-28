// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { ButtonBase, FormControl, FormLabel, Select, Stack, Switch } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Iconify from 'Components/Iconify'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'configs/themeConfig'

// ** Custom Component Imports
import { RepeatCard } from '../components/RepeatCard'
import UseBgColor from '@core/hooks/useBgColor'
import Repeater from '@core/components/repeater'
import { FromTo } from 'views/apps/invoice/components/fromTo'
import { CustomInput, CalcWrapper, RepeaterWrapper, StyledLine, OptionsWrapper, StyledDivider } from './styled'

// ** React Imports
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

// ** utils import 
// import { fCurrency } from 'Utils/formatNumber'
import calculate from 'Utils/calculate'
import { servicesData, statusInvoice } from 'Data'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import DatePickerWrapper from '@core/styles/libs/react-datepicker'
import { ToastPromise } from '@core/components/Downloads/ToastPromise'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import { initialState } from 'Pages/InvoicePage'
import SendInvoiceDrawer from '../shared-drawer/SendInvoiceDrawer'

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddWrapper = () => {
  // ** States
  let [count, setCount] = React.useState(1)
  const [sendInvoiceOpen, setSendInvoiceOpen] = React.useState(false)
  const { simpleData } = useSelector((state) => state.simpleReducer);
  const { clientsData } = useSelector((state) => state.clientsReducer);
  const { invoiceData, loading } = useSelector((state) => state.invoiceReducer);
  const invoiceNumber = Math.max(0, ...invoiceData.map(i => i.id || 0)) + 1;

  // ** Hooks
  const theme = useTheme()
  const color = UseBgColor()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { 
    reset, 
    watch, 
    control, 
    setValue, 
    handleSubmit,
    formState: { errors }, 
  } = useForm({defaultValues: { ...initialState, id: invoiceNumber }});

  const total = watch('total');
  const details = watch('details');
  const subTotal = watch('subTotal');
  const taxes = Number(watch('taxes'));
  const {note, data} = watch('clientNotes');
  const shipping = Number(watch('shipping'));
  const discount = Number(watch('discount'));
  
  React.useEffect(() => {
    setValue("clientNotes.data", note ? 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!' : '')
  }, [note])

  React.useEffect(() => {
    const totalSubtotal = details.reduce((totals, currentItem) => {
      return calculate.add(totals, currentItem.total);
    }, 0);

    const totales = calculate.sub(
      calculate.add(totalSubtotal, taxes),
      calculate.add(shipping, discount)
    );

    setValue('total', totales);
    setValue('subTotal', totalSubtotal);
  }, [details, shipping, discount, taxes, watch]);

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)

  // ** Deletes form
  const deleteForm = (e, cardId) => {
    e.preventDefault();

    const updatedDetails = details.filter(item => item.id !== cardId);
    setValue('details', updatedDetails)

    const repeaterWrapper = e.target.closest('.repeater-wrapper');
    if (repeaterWrapper) {
      repeaterWrapper.remove();
    } else {
      console.error("Parent element with class 'repeater-wrapper' not found.");
    }
  };
  
  const handleDetails = React.useCallback((newValue) => {
    const existingItemIndex = details.findIndex(item => item.id === newValue.id);
  
    if (existingItemIndex !== -1) {
      // If an item with the same ID exists, update that item
      const updatedDetails = [...details];
      updatedDetails[existingItemIndex] = newValue;
      setValue("details", updatedDetails);
    } else {
      // If no item with the same ID exists, add the new item
      setValue("details", [...details, newValue]);
    }
  }, [details]);

  const onSubmit = async (data) => {
    dispatch({ type: "INVOICE_START" })
    try {
      await ToastPromise("Invoice", "onCreate", true)
      console.log(data)
      // dispatch({ type: "INVOICE_DISMISS" })
      dispatch({ type: "INVOICE_SUCCESS", data: data })
      reset(initialState)
    } catch (error) {
      dispatch({ type: "INVOICE_FAIL" })
      if (error.response?.status === 500) navigate("/server-error")
      await ToastPromise("Invoice", "onCreate", false)
    }
  };

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <Card>
              <CardContent>
                  <Grid container>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
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
                    <Grid item xl={6} xs={12}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                          <FormControl fullWidth>
                            <FormLabel htmlFor='invoice-id'>Inovoice</FormLabel>
                              <Controller
                                name="id"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size='small'
                                    labelId="invoice-id"
                                    sx={{ width: { sm: '250px', xs: '170px' } }}
                                    InputProps={{
                                      disabled: true,
                                      startAdornment: <InputAdornment position='start'>#</InputAdornment>
                                    }}
                                  />
                                )}
                              />
                          </FormControl>
                        </Box>
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                          <DemoItem label="Date Issued:">
                            <Controller
                              name="issuedDate"
                              control={control}
                              rules={{ required: 'Date issued is required' }}
                              render={({ field, fieldState }) => (
                                <>
                                  <DatePicker
                                    id='issue-date'
                                    selected={field.value}
                                    customInput={<CustomInput />}
                                  />
                                  {fieldState.error && (
                                    <Typography variant="body2" color='error'>
                                      {fieldState.error.message}
                                    </Typography>
                                  )}
                                </>
                              )}
                            />
                          </DemoItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <DemoItem label="Date Due:">
                            <Controller
                              name="dueDate"
                              control={control}
                              rules={{ required: 'Date due is required' }}
                              render={({ field, fieldState }) => (
                                <>
                                  <DatePicker
                                    id='due-date'
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    customInput={<CustomInput />}  
                                  />
                                  {fieldState.error && (
                                    <Typography variant="body2" color='error'>
                                      {fieldState.error.message}
                                    </Typography>
                                  )}
                                </>
                              )}
                            />
                          </DemoItem>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

                <CardContent sx={{ pb: 2 }}>
                  <Grid container spacing={3} justifyContent="space-between">
                    <Grid item xs={12} lg={5.5} sx={{ mb: { lg: 0, xs: 4 } }}>
                      <FromTo 
                        errors={errors} 
                        title="employee" 
                        control={control}
                        data={simpleData} 
                        setValue={setValue} 
                      />
                    </Grid>
                    <StyledDivider />
                    <Grid item xs={12} lg={5.5}>
                      <FromTo 
                        title="client" 
                        errors={errors} 
                        control={control}
                        data={clientsData} 
                        setValue={setValue} 
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider sx={{ mb: theme => `${theme.spacing(1.25)} !important` }} />

                <RepeaterWrapper>
                  <Stack mb={4} spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant='h6'>
                      Details:
                    </Typography>
                    {/* invoice status */}
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: 'Please select a status' }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          select  
                          size="small"
                          value={value}
                          onChange={onChange}
                          label="Invoice Status"
                          sx={{minWidth: '170px'}}
                          id="validation-async-status"
                          error={Boolean(errors.status)}
                          helperText={errors.status && errors.status.message}
                        >
                          {
                            statusInvoice.map(({ name, id}) => (
                              <MenuItem autoWidth key={id} value={name}>
                                {name}
                              </MenuItem>
                            ))
                          }
                        </TextField>
                      )}
                    />
                  </Stack>
                  <StyledLine sx={{
                '& .MuiDivider-wrapper': { px: 4 },
                mt: theme => `${theme.spacing(4)} !important`,
                mb: theme => `${theme.spacing(4)} !important`
              }} />
                  <Repeater count={count}>
                    {i => {
                      const Tag = i === 0 ? Box : Collapse
                      return (
                        <RepeatCard 
                          i={i}
                          key={i}
                          Tag={Tag} 
                          deleteForm={deleteForm} 
                          servicesData={servicesData} 
                          handleDetails={handleDetails}
                        />
                      )
                    }}
                  </Repeater>
                </RepeaterWrapper>

                <Divider />

                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item lg={6} md={3} xs={12} sx={{ my: { lg: 0 }, textAlign: { xs: 'end', lg: 'start', md: "start" }, mt: 2 }}>
                      <Button
                        size='small'
                        variant='text'
                        onClick={() => setCount(count + 1)}
                        startIcon={<Iconify icon='mdi:plus' fontSize={20} />}
                      >
                        Add Item
                      </Button>
                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sx={{ my: { lg: 0 }, mt: 2 }}>
                      <Controller
                        name="shipping"
                        control={control}
                        rules={{ required: 'Shipping is required' }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size='small'
                            type='number'
                            placeholder='0'
                            inputProps={{
                              min: 0,
                            }}
                            label="Shipping($)"
                            error={!!fieldState.error}
                            helperText={fieldState.error ? fieldState.error.message : null}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sx={{ my: { lg: 0 }, mt: 2 }}>
                      <Controller
                        name="discount"
                        control={control}
                        rules={{ required: 'Discount is required' }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size='small'
                            type='number'
                            placeholder='0'
                            label="Discount($)"
                            inputProps={{
                              min: 0,
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error ? fieldState.error.message : null}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sx={{ my: { lg: 0 }, mt: 2 }}>
                      <Controller
                        name="taxes"
                        control={control}
                        rules={{ required: 'Taxes is required' }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size='small'
                            type='number'
                            inputProps={{
                              min: 0,
                            }}
                            label="Taxes(%)"
                            placeholder='0'
                            error={!!fieldState.error}
                            helperText={fieldState.error ? fieldState.error.message : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <CardContent>
                  <Grid container>
                    <Grid item xs={12} sm={9} sx={{ order: { sm: 1, xs: 2 } }}>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                      <CalcWrapper>
                        <Typography variant='body2'>Subtotal</Typography>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                          {subTotal ? `$${subTotal.toFixed(2)}` : '-'}
                        </Typography>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Typography variant='body2'>Shipping</Typography>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: color.errorLight, lineHeight: '.25px' }}>
                          {shipping ? `-$${shipping}` : '-'}
                        </Typography>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Typography variant='body2'>Discount</Typography>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: color.errorLight, lineHeight: '.25px' }}>
                          {discount ? `-$${discount}` : '-'}
                        </Typography>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Typography variant='body2'>Taxes</Typography>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                          {taxes ? `${taxes}%` : '-'}
                        </Typography>
                      </CalcWrapper>
                      <StyledLine />
                      <CalcWrapper>
                        <Typography variant='subtitle1'>Total:</Typography>
                        <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                          {total > 0 ? `$${total.toFixed(2)}` : '-'}
                          {/* {total > 0 ? fCurrency(total).toFixed(2) : '-'} */}
                        </Typography>
                      </CalcWrapper>
                    </Grid>
                  </Grid>
                </CardContent>

                {
                  note && 
                  <>
                      <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

                      <CardContent sx={{ pt: 4 }}>
                        <InputLabel htmlFor='invoice-note'>Note:</InputLabel>
                        <Controller
                          control={control}
                          name='clientNotes.data'
                          render={({ field }) => (
                            <TextField
                              rows={2}
                              fullWidth
                              multiline
                              {...field}
                              id='invoice-note'
                              sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
                            />
                          )}
                        />
                      </CardContent>
                    </>
                }
            </Card>
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <LoadingButton 
                      fullWidth 
                      sx={{ mb: 4 }} 
                      variant='contained'
                      onClick={toggleSendInvoiceDrawer}
                      startIcon={<Iconify icon='mdi:send' />}
                    >
                      {loading ? "Sending" : "Send Invoice"}
                    </LoadingButton>
                    {/* <ButtonBase fullWidth component={Link} sx={{ mb: 3.5 }} variant='outlined' to={`/invoice/preview/${invoiceNumber}`}>
                      Preview
                    </Button> */}
                    <LoadingButton 
                      fullWidth
                      type='submit'
                      loading={loading}     
                      variant='outlined' 
                      loadingPosition="start" 
                      startIcon={<Iconify icon='mdi:create' />}
                    >
                      {loading ? "Saving..." : "Save Invoice"}
                    </LoadingButton>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='payment-select'>Accept payments via</InputLabel>
                  <Controller
                    control={control}
                    name='paymentMethod'
                    render={({ field }) => (
                      <Select
                        fullWidth
                        label='Accept payments via'
                        labelId='payment-select'
                        {...field}
                        sx={{ mb: 4 }}
                      >
                        <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
                        <MenuItem value='Debit Card'>Debit Card</MenuItem>
                        <MenuItem value='Credit Card'>Credit Card</MenuItem>
                        <MenuItem value='Paypal'>Paypal</MenuItem>
                        <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                  <OptionsWrapper sx={{ mb: 1 }}>
                  <InputLabel
                    htmlFor='invoice-add-payment-terms'
                    sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
                  >
                    Payment Terms
                  </InputLabel>
                  <Controller
                    control={control}
                    name='paymentTerms'
                    render={({ field }) => <Switch {...field} />}
                  />
                </OptionsWrapper>

                <OptionsWrapper sx={{ mb: 1 }}>
                  <InputLabel
                    htmlFor='invoice-add-client-notes'
                    sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
                  >
                    Client Notes
                  </InputLabel>
                  <Controller
                    control={control}
                    name="clientNotes.note"
                    render={({ field }) => <Switch {...field} checked={note} />}
                  />
                </OptionsWrapper>

                <OptionsWrapper>
                  <InputLabel
                    htmlFor='invoice-add-payment-stub'
                    sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
                  >
                    Payment Stub
                  </InputLabel>
                  <Controller
                    control={control}
                    name='paymentStub'
                    render={({ field }) => <Switch {...field} />}
                  />
                </OptionsWrapper>
              </Grid>
            </Grid>
          </Grid>
          <SendInvoiceDrawer onSubmit={handleSubmit(onSubmit)} open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
          {/* <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} /> */}
        </Grid>
      </form>
    </DatePickerWrapper>
  )
}

export default AddWrapper
