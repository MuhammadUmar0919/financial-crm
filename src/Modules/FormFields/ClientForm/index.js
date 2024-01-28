import React from 'react';
import { regionsData } from 'Data';
import { Controller } from 'react-hook-form';
import { Grid, MenuItem, TextField } from '@mui/material';

function ClientForm({ config }) {
  const { control, errors } = config;
  return (
    <>
      <Grid container spacing={6}>
        {/* full name */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                label="Full Name"
                variant="outlined"
                onChange={onChange}
                placeholder="Leonard"
                id="outlined-fullName"
                error={Boolean(errors.fullName)}
                helperText={errors.fullName && errors.fullName.message}
              />
            )}
          />
        </Grid>
        {/* company email*/}
        <Grid item xs={12} sm={6}>
          <Controller
            name="companyName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                label="Company name"
                variant="outlined"
                onChange={onChange}
                placeholder="Hall-Robbins PLC"
                id="outlined-companyName"
                error={Boolean(errors.companyName)}
                helperText={errors.companyName && errors.companyName.message}
              />
            )}
          />
        </Grid>
        {/* country */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="companyEmail"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                type="email"
                label="Company email"
                variant="outlined"
                id="outlined-companyEmail"
                onChange={onChange}
                error={Boolean(errors.companyEmail)}
                placeholder="carterleonard@gmail.com"
                helperText={errors.companyEmail && errors.companyEmail.message}
              />
            )}
          />
        </Grid>
        {/* phone number */}
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: true }}
            defaultValue="+998"
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                type="tel"
                name="phoneNumber"
                variant="outlined"
                label="Phone number"
                id="outlined-phoneNumber"
                placeholder="99-000-00-00"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber && errors.phoneNumber.message}
              />
            )}
          />
        </Grid>
        {/* company name */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                label="Country"
                variant="outlined"
                onChange={onChange}
                placeholder="USA"
                id="outlined-country"
                error={Boolean(errors.country)}
                helperText={errors.country && errors.country.message}
              />
            )}
          />
        </Grid>
        {/* address */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                select
                fullWidth
                value={value}
                label="Address"
                onChange={onChange}
                error={Boolean(errors.address)}
                labelId="validation-async-address"
                helperText={errors.address && errors.address.message}
                selectProps={{ placeholder: 'Select Address' }}
              >
                {regionsData.map((option) => (
                  <MenuItem key={option.id} value={option.name_uz}>
                    {option.name_uz}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ClientForm;
