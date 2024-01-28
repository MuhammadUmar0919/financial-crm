import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField, MenuItem } from '@mui/material';

function StatusForm({ config }) {
  const { control, errors } = config;
  const appNames = ['Invoice', 'Service', 'Admin', 'Client', 'Employee'];
  return (
    <>
      <Grid container spacing={4}>
        {/* category name */}
        <Grid item xs={12}>
          <Controller
            name="categoryName"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextField
                select
                fullWidth
                value={value}
                label="Category Name"
                onChange={onChange}
                error={Boolean(errors.categoryName)}
                labelId="validation-async-categoryName"
                helperText={errors.categoryName && errors.categoryName.message}
                selectProps={{
                  placeholder: 'Select Address',
                }}
              >
                {appNames.map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {/* status name */}
        <Grid item xs={12}>
          <Controller
            name="statusName"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                label="Status name"
                variant="outlined"
                onChange={onChange}
                placeholder="Active"
                id="outlined-statusName"
                error={Boolean(errors.statusName)}
                helperText={errors.statusName && errors.statusName.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default StatusForm;
