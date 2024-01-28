import React from 'react';
import { regionsData } from 'Data';
import { Controller } from 'react-hook-form';
import { Grid, MenuItem, TextField } from '@mui/material';

function StaffForm({ config }) {
  const { control, errors } = config;
  return (
    <>
      <Grid container spacing={6}>
        {/* full name */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="fullName"
            control={control}
            rules={{
              required: true,
            }}
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
        {/* email*/}
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                type="email"
                label="Email"
                variant="outlined"
                id="outlined-email"
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder="carterleonard@gmail.com"
                helperText={errors.email && errors.email.message}
              />
            )}
          />
        </Grid>
        {/* age */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="age"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={value}
                placeholder="21"
                onChange={onChange}
                error={Boolean(errors.age)}
                helperText={errors.age && errors.age.message}
              />
            )}
          />
        </Grid>
        {/* phone number */}
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: true,
            }}
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
        {/* username*/}
        <Grid item xs={12} sm={6}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                label="User name"
                variant="outlined"
                onChange={onChange}
                placeholder="Leonard"
                id="outlined-username"
                error={Boolean(errors.username)}
                helperText={errors.username && errors.username.message}
              />
            )}
          />
        </Grid>
        {/* address */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="address"
            control={control}
            rules={{
              required: true,
            }}
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
                selectProps={{
                  placeholder: 'Select Address',
                }}
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

export default StaffForm;
