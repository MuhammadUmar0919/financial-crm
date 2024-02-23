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
import { useDispatch, useSelector } from 'react-redux';
// react hooks form import
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// components import
import Iconify from '@/@core/components/iconify';
import ScrollBar from 'react-perfect-scrollbar';
import { selectCreatedItem, selectUpdatedItem } from '@/Redux/crud/selectors';
import { crud } from '@/Redux/crud/actions';
import useToken from '@/Hooks/useToken';
import uuid from 'react-uuid';

export default function CrudForm({ type, title, close, config, initialState }) {
  const dispatch = useDispatch();
  const { token } = useToken();
  const [open, setOpen] = React.useState(false);
  const { isLoading: loading, isSuccess } = useSelector(
    type === 'create' ? selectCreatedItem : selectUpdatedItem
  );
  const { crudForm: FormElements, schema, entity, smallWidth } = config;

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
    resolver: zodResolver(schema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
    close && close();
  };

  const onSubmit = async (value) => {
    let updatedData;
    try {
      updatedData = type === 'create'
        ? { ...value, createdAt: new Date(), createdBy: token.id, protId: uuid() }
        : { ...value, modifiedAt: new Date() };
  
      const crudAction = type === 'create' ? crud.create : crud.update;
      const actionParams = type === 'create' ? { entity, jsonData: updatedData } : { entity, protId: updatedData.protId, jsonData: updatedData };
  
      await dispatch(crudAction(actionParams));
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      handleClose();
      reset();
    }
  };
  
  React.useEffect(() => {
    if (isSuccess) {
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

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
            {title}
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
                <Iconify width={24} icon={type === 'create' ? 'mdi:plus' : 'eva:edit-outline'} />
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
