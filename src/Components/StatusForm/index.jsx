// mui imports
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { IconButton, InputAdornment, MenuItem } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// dayjs import
import dayjs from 'dayjs';
// react imports
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
// hooks import
import useResponsive from 'Hooks/UseResponsive';
// utils import
import { TimeSleep } from 'Utils/timeSleep';
import { statusColors } from 'Utils/statusColors';
// components imports
import Label from '../Label';
import Iconify from '../Iconify';
import { StyledMenuItem } from 'Components/StyledMenuItem/Style';
// data import

export default function StatusForm({
  onEdit,
  data,
  loading,
  statusData,
  close,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useResponsive('up', 'lg', 'sm', 'xs');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { ...data },
  });

  const status = watch('status');

  const onSubmit = async (values) => {
    const value = {
      ...values,
      modifiedDate: new Date(),
      meetingDate: values.status === 'meeting' ? values.meetingDate : '',
      meetingPlace: values.status === 'meeting' ? values.meetingPlace : '',
      rejectedReason: values.status === 'rejected' ? values.rejectedReason : '',
    };
    dispatch(onEdit(value));
    await TimeSleep();
    handleClose();
  };

  return (
    <>
      <StyledMenuItem onClick={handleClickOpen} color="success">
        <Iconify icon={'mdi:clock-edit-outline'} sx={{ mr: 2 }} />
        Status
      </StyledMenuItem>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center', m: 0, p: '1.25rem 0 0 0' }}>
          Select the status
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={4}>
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
                      {statusData
                        ?.filter(({ name }) => name !== 'all')
                        .map(({ id, name, icon }) => (
                          <MenuItem key={id} value={name}>
                            <Label
                              color={statusColors(name)}
                              startIcon={<Iconify icon={icon && icon} />}
                            >
                              {name}
                            </Label>
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>
              {status === 'meeting' && (
                <>
                  <Grid item xs={12}>
                    <DemoContainer
                      sx={{ width: '100%' }}
                      components={[
                        'DesktopDateTimePicker',
                        'MobileDateTimePicker',
                      ]}
                    >
                      {isDesktop ? (
                        <DemoItem name="DesktopDateTimePicker">
                          <Controller
                            control={control}
                            name="meetingDate"
                            rules={{ required: 'Meeting date is required' }}
                            render={({ field, fieldState }) => (
                              <DesktopDateTimePicker
                                {...field}
                                required
                                label="Meeting date"
                                onChange={(value) => {
                                  setValue('meetingDate', value, {
                                    shouldValidate: true,
                                  });
                                }}
                                error={!!fieldState.error}
                                value={field.value ? dayjs(field.value) : null}
                                helperText={
                                  fieldState.error
                                    ? fieldState.error.message
                                    : null
                                }
                              />
                            )}
                          />
                        </DemoItem>
                      ) : (
                        <DemoItem name="MobileDateTimePicker">
                          <Controller
                            control={control}
                            name="meetingDate"
                            rules={{ required: 'Meeting date is required' }}
                            render={({ field, fieldState }) => (
                              <MobileDateTimePicker
                                {...field}
                                required
                                label="Meeting date"
                                sx={{ width: '100%' }}
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(value) => {
                                  setValue('meetingDate', value, {
                                    shouldValidate: true,
                                  });
                                }}
                                error={!!fieldState.error}
                                helperText={
                                  fieldState.error
                                    ? fieldState.error.message
                                    : null
                                }
                              />
                            )}
                          />
                        </DemoItem>
                      )}
                    </DemoContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="meetingPlace"
                      control={control}
                      rules={{ required: 'This field is required' }}
                      render={({ field, fieldState }) => (
                        <TextField
                          fullWidth
                          {...field}
                          variant="outlined"
                          label="Meeting place"
                          id="outlined-location"
                          error={!!fieldState.error}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton edge="end">
                                  <Iconify
                                    icon={'mdi:map-marker-plus-outline'}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {status === 'rejected' && (
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="rejectedReason"
                    rules={{ required: 'This field is required' }}
                    render={({ field, fieldState }) => (
                      <TextField
                        multiline
                        fullWidth
                        {...field}
                        minRows={3}
                        maxRows={6}
                        variant="outlined"
                        id="rejectedReason"
                        label="Rejected reason"
                        placeholder="Enter the reason..."
                        error={!!fieldState.error}
                        InputProps={{
                          endAdornment: field.value && (
                            <InputAdornment
                              sx={{
                                right: 5,
                                bottom: 22,
                                position: 'absolute',
                              }}
                              position="end"
                            >
                              <IconButton>
                                <Iconify
                                  width={20}
                                  color="text.primary"
                                  icon="mdi:clear-outline"
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        helperText={
                          fieldState.error ? fieldState.error.message : null
                        }
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              loadingPosition="start"
              disabled={!isDirty || loading}
              startIcon={<Iconify width={24} icon={'eva:edit-outline'} />}
            >
              {loading ? 'Saving...' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
