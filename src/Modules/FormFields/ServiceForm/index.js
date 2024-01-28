import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, MenuItem, TextField } from '@mui/material';
import Label from 'Components/Label';
import { statusColors } from 'Utils/statusColors';
import Iconify from 'Components/Iconify';

function ServiceForm({ config }) {
  const { control, errors } = config;
  const statusData = ['active', 'inactive'];
  return (
    <>
      <Grid container spacing={6}>
        {/* service name */}
        <Grid item xs={12}>
          <Controller
            name="serviceName"
            control={control}
            // rules={{
            //   required: true,
            // }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                label="Service name"
                variant="outlined"
                onChange={onChange}
                placeholder="App Template"
                id="outlined-serviceName"
                error={Boolean(errors.serviceName)}
                helperText={errors.serviceName && errors.serviceName.message}
              />
            )}
          />
        </Grid>
        {/* status */}
        <Grid item xs={12}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                select
                required
                fullWidth
                {...field}
                label="Status"
                id="outlined-select-status"
              >
                <MenuItem disabled value="no status yet">
                  <Label
                    startIcon={<Iconify icon="mdi:no" />}
                    color={statusColors('no status yet')}
                  >
                    No Status Yet
                  </Label>
                </MenuItem>
                {statusData.map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    <Label
                      color={statusColors(option)}
                      // startIcon={<Iconify icon={icon && icon} />}
                    >
                      {option}
                    </Label>
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

export default ServiceForm;
