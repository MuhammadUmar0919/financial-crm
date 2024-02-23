import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, MenuItem, TextField } from '@mui/material';
import Label from '@/@core/components/label';
import { statusColors } from '@/Utils/statusColors';
import Iconify from '@/@core/components/iconify';
import { useData } from '@/Hooks/useData';
import { statusIcons } from '@/Utils/statusIcons';

function ServiceForm({ config }) {
  const { control, errors } = config;
  const { statusData, getStatusData } = useData();

  React.useEffect(() => {
    getStatusData('Service')
  }, []);
  
  return (
    <>
      <Grid container spacing={6}>
        {/* service name */}
        <Grid item xs={12}>
          <Controller
            name="serviceName"
            control={control}
            rules={{
              required: true,
            }}
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
         {/* service price */}
         <Grid item xs={12}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                type='number'
                variant="outlined"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  min: 0,
                  // startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
                id="outlined-price"
                label="Service price"
                placeholder="1200$"
                error={Boolean(errors.price)}
                helperText={errors.price && errors.price.message}
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
                {statusData.map(({ statusName }, idx) => (
                  <MenuItem key={idx} value={statusName}>
                    <Label
                      color={statusColors(statusName.toLowerCase())}
                      startIcon={<Iconify icon={statusIcons(statusName)} />}
                    >
                      {statusName}
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
