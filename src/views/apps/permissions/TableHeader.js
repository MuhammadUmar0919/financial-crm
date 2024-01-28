import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TimeSleep } from 'Utils/timeSleep';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import Scrollbar from 'Components/Scrollbar';
import { FormControl, FormHelperText } from '@mui/material';
import { SearchInput } from '@core/components/custom-input';
import { ExportBtn } from 'Components/Export';

const TableHeader = (props) => {
  const { permissionData, filterValue, setValue, loading, handleFilter } = props;

  const {
    reset,
    control,
    formState,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [coreValue, setCoreValue] = React.useState(false)
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset(); // Reset the form
  };
  
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: "" })
    }
  }, [formState, reset])
  const onSubmit = async (data) => {
    dispatch({ type: 'PERMISSION_START' });

    const values = {
      id: uuid(),
      assignedTo: [],
      createdDate: new Date(),
      corePermission: coreValue,
      name: data.permissionName,
    };
    
    try {
      await TimeSleep();
      dispatch({ type: 'PERMISSION_SUCCESS', data: values });
      toast.success("Ruxsat muvaffaqiyatli qo'shildi");
      handleClose(); // Close the dialog
    } catch (error) {
      dispatch({ type: 'PERMISSION_FAIL' });
      if (error.response?.status === 500) navigate('/server-error');
      toast.error("Ruxsatni qo'shishda muammo bo'ldi");
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ExportBtn 
          data={permissionData} 
          title="General staff permissions" 
        />
        <Box 
          sx={{ 
            gap: '20px', 
            display: 'flex', 
            alignItems: 'center',
          }}
        >
          <SearchInput 
            size='small'
            type="Permission"
            value={filterValue} 
            setValue={setValue} 
            onChange={handleFilter} 
          />
          <Button sx={{ width: '60%'}} disable variant='contained' onClick={handleOpen}>
            Add Permission
          </Button>
        </Box>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleClose} open={open}>
        
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Add New Permission
          </Typography>
          <Typography variant='body2'>Permissions you may use and assign to your users.</Typography>
        </DialogTitle>
         {/* <Scrollbar> */}
        <DialogContent sx={{ pb: 12, mx: 'auto' }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
               <FormControl fullWidth>
                  <Controller
                    name="permissionName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        name="permissionName"
                        label="Permission Name"
                        id="outlined-name"
                        variant="outlined"
                        onChange={onChange}
                        placeholder="Management"
                        error={Boolean(errors.permissionName)}
                        aria-describedby="validation-async-permissionName"
                      />
                    )}
                  />
                  {errors.permissionName && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="validation-async-permissionName"
                    >
                      {errors.permissionName.message}
                    </FormHelperText>
                  )}
              </FormControl>
              <FormControlLabel 
                control={<Checkbox 
                  onChange={(e) => 
                  setCoreValue(e.target.checked)} 
                  />} 
                label='Set as core permission' />
              <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
                <LoadingButton disabled={!isDirty || loading} loading={loading} size='large' type='submit' variant='contained'>
                  Create Permission
                </LoadingButton>
                <Button
                  type='reset'
                  size='large'
                  variant='outlined'
                  color='secondary'
                  onClick={handleClose}
                >
                  Discard
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
            {/* </Scrollbar> */}
      </Dialog>
    </>
  );
};

export default TableHeader;
