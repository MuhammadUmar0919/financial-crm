import React from "react";
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Iconify from "@/@core/components/iconify";
import uuid from "react-uuid";
import calculate from "@/Utils/calculate";
import instance from "@/Api/Config";

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}));

export const RepeatCard = ({ i, Tag, deleteForm, handleDetails }) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      price: '',
      total: '',
      id: uuid(),
      service: '',
      quantity: 1,
      invoiceDesc: '',
      invoiceTitle: ''
    }
  });

  const cardId = watch('id');
  const total = watch('total');
  const serviceId = watch("service");
  const price = Number(watch('price'));
  const invoiceDesc = watch('invoiceDesc');
  const invoiceTitle = watch('invoiceTitle');
  const quantity = Number(watch("quantity"));
  const [serviceData, setService] = React.useState([])

  React.useEffect(() => {
    if (serviceId) {
      const selectedService = serviceData.find(item => item.id === serviceId);
      const subtotal = calculate.multiply(price, quantity);

      setValue('price', selectedService.price);
      setValue('id', cardId);
      setValue('total', subtotal);
      handleDetails(getValues());
    }
  }, [serviceId, quantity, price, invoiceTitle, invoiceDesc]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get(`/services`);
        setService(response.data);
      } catch (error) {
          console.error('Error fetching admins data:', error);
      }
    };
    getData();
  }, []);

  return (
    <Tag className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
      <form noValidate autoComplete="off">
        <Grid container>
          <RepeatingContent item xs={12} sx={{ flexDirection: { xs: 'column', lg: "unset" } }}>
            <form>
              <Grid container sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Grid item lg={5} xs={12} sx={{ my: { lg: 0, xs: 3 } }}>
                  <Stack spacing={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel
                        id="validation-basic-service"
                        error={Boolean(errors.service)}
                        htmlFor="validation-basic-service"
                      >
                        Service
                      </InputLabel>
                      <Controller
                        name="service"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value}
                            label="Service"
                            onChange={onChange}
                            labelId="validation-async-service"
                            aria-describedby="validation-async-service"
                            inputProps={{ placeholder: "Select service" }}
                          >
                            {serviceData.map((option, index) => (
                              <MenuItem key={index} value={option.id}>
                                {option.serviceName}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.service && (
                        <FormHelperText
                          sx={{ color: "error.main" }}
                          id="validation-async-service"
                        >
                          {errors.service.message}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <Controller
                      control={control}
                      name="invoiceTitle"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size='small'
                          id="invoiceTitle"
                          label="Invoice title"
                          placeholder="Enter the invoice title..."
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="invoiceDesc"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          multiline
                          fullWidth
                          minRows={3}
                          maxRows={6}
                          size='small'
                          id="invoiceDesc"
                          label="Invoice desc"
                          placeholder="Enter the invoice desc..."
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item lg={6} xs={12} sx={{ my: { lg: 0, xs: 3 } }}>
                  <Grid container spacing={4}>
                    <Grid item lg={4} xs={12}>
                      <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            {...field}
                            size='small'
                            type="number"
                            label="Quantity"
                            placeholder='0.00'
                            id="number-quantity"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              min: 0,
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <TextField
                        disabled
                        fullWidth
                        size='small'
                        type='number'
                        label="Price"
                        value={price}
                        placeholder='0'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          min: 0,
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <TextField
                        fullWidth
                        size='small'
                        type='number'
                        label="Total"
                        value={total}
                        placeholder='0'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>$</InputAdornment>
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  lg={4}
                  xs={12}
                  sx={{
                    mt: { xs: 2 },
                    textAlign: 'end',
                    ml: { lg: "auto" },
                  }}
                >
                  <Button
                    color="error"
                    sx={{ fontWeight: 'bold' }}
                    startIcon={
                      <Iconify
                      width={20}
                      icon="eva:trash-2-fill"
                      />
                    }
                    onClick={(e) => deleteForm(e, cardId)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </form>
          </RepeatingContent>
        </Grid>
      </form>
    </Tag>
  );
};
