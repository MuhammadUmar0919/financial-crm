// react import
import * as React from 'react';
// @mui import
import {
  Box,
  Dialog,
  Button,
  MenuItem,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// react redux import
import { useDispatch } from 'react-redux';
// react hooks form import
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// utils import
import { TimeSleep } from 'Utils/timeSleep';
// components import
import Iconify from 'Components/Iconify';
import ScrollBar from 'react-perfect-scrollbar';

export default function CrudForm({
  type,
  title,
  close,
  onCrud,
  schema,
  loading,
  smallWidth,
  initialState,
  FormElements,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  // ** Hook
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialState,
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
    close && close();
  };

  const onSubmit = async (value) => {
    dispatch(onCrud(value));
    await TimeSleep();
    handleClose();
    reset();
  };

  return (
    <>
      {type === 'create' ? (
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<Iconify width={20} icon="eva:plus-fill" />}
        >
          Create
        </Button>
      ) : (
        <MenuItem color="secondary" onClick={handleOpen}>
          <Iconify width={24} icon={'eva:edit-outline'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      )}
      <Dialog
        aria-labelledby="user-view-create"
        sx={{
          '& .MuiPaper-root': { width: '100%', maxWidth: smallWidth ? 450 : 650, p: [2, 4] },
        }}
        aria-describedby="user-view-create-description"
        open={open}
        onClose={handleClose}
      >
        <Box
          noValidate
          component="form"
          autoComplete="off"
          display="contents"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle
            id="user-view-create"
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              p: '16px 24px',
            }}
          >
            {type === 'create'
              ? `Create a new ${title.slice(0, -1)}`
              : `Update a ${title.slice(0, -1)}`}
          </DialogTitle>
          <DialogContentText
            variant="body2"
            id="user-view-create-description"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            {type === 'create'
              ? 'Creating user details will receive a privacy audit'
              : 'Updating user details will receive a privacy audit'}
          </DialogContentText>
          <ScrollBar>
            <DialogContent>
              <FormElements config={{ control, errors }} />
            </DialogContent>
          </ScrollBar>
          <DialogActions>
            <Button type="reset" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              loadingPosition="start"
              disabled={!isDirty || loading}
              startIcon={
                <Iconify
                  width={24}
                  icon={type === 'create' ? 'mdi:plus' : 'eva:edit-outline'}
                />
              }
            >
              {type === 'create'
                ? loading
                  ? 'Creating...'
                  : 'Create'
                : loading
                ? 'Updating...'
                : 'Update'}
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
