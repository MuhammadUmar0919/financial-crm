// import React from 'react';
// import { useForm } from 'react-hook-form';

// function YourFormComponent() {
//   const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  
//   const onSubmit = (data) => {
//     // Access the input field value
//     const inputValue = data.inputFieldName;

//     // Access the values of all checkboxes
//     const checkboxValues = Object.keys(data)
//       .filter(key => key.startsWith('checkbox')) // Filter checkbox fields
//       .map(key => data[key]);

//     // Perform validation or other actions
//     console.log('Input Value:', inputValue);
//     console.log('Checkbox Values:', checkboxValues);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="inputFieldName">Input Field:</label>
//         <input
//           type="text"
//           id="inputFieldName"
//           {...register('inputFieldName', { required: 'This field is required' })}
//         />
//         {errors.inputFieldName && <p>{errors.inputFieldName.message}</p>}
//       </div>

//       <div>
//         <label>Checkboxes:</label>
//         {[...Array(20)].map((_, index) => (
//           <div key={index}>
//             <input
//               type="checkbox"
//               id={`checkbox${index}`}
//               {...register(`checkbox${index}`)}
//             />
//             <label htmlFor={`checkbox${index}`}>{`Checkbox ${index + 1}`}</label>
//           </div>
//         ))}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default YourFormComponent;
// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

// function YourFormComponentd() {
//   const { control, handleSubmit, formState: { errors }, getValues } = useForm();
  
//   const onSubmit = (data) => {
//     console.log('Form Data:', data);

//     // Ma'lumotlarni tekshirish yoki boshqa amallar
//     // ...

//     // Ma'lumotlarni qayta boshlash
//     // formni qayta boshlash uchun ishlatilishi mumkin
//     // reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <TextField
//           label="Kiritish maydoni"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           {...{
//             ...register('inputFieldName', { required: 'Bu maydon to\'ldirilishi shart' }),
//           }}
//           error={!!errors.inputFieldName}
//           helperText={errors.inputFieldName ? errors.inputFieldName.message : ''}
//         />
//       </div>

//       <div>
//         <label>Katakchalar:</label>
//         {[...Array(20)].map((_, index) => (
//           <div key={index}>
//             <Controller
//               name={`checkbox${index}`}
//               control={control}
//               defaultValue={false}
//               render={({ field }) => (
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       {...field}
//                       color="primary"
//                     />
//                   }
//                   label={`Katakcha ${index + 1}`}
//                 />
//               )}
//             />
//           </div>
//         ))}
//       </div>

//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// }

// export default YourFormComponentd;
// ... (previous imports and code)

// const RolesCards = () => {
//     // ... (previous state and variable definitions)
  
//     // State variable to track the checked state of "Select All" checkbox
//     const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  
//     // Function to handle "Select All" checkbox change event
//     const handleSelectAllCheckboxChange = () => {
//       setSelectAllChecked(!selectAllChecked); // Toggle the state
//       const newSelectedCheckbox = [];
  
//       if (!selectAllChecked) {
//         // If "Select All" is checked, select all other checkboxes
//         permissionData?.forEach(({ id, name }) => {
//           const key = name.toLowerCase().split(' ').join('-');
//           togglePermission(`${key}-read`, id, key, 'read');
//           togglePermission(`${key}-write`, id, key, 'write');
//           togglePermission(`${key}-create`, id, key, 'create');
//           newSelectedCheckbox.push(`${key}-read`, `${key}-write`, `${key}-create`);
//         });
//       }
  
//       setSelectedCheckbox(newSelectedCheckbox);
//     };
  
//     // ... (rest of the code)
  
//     return (
//       <Grid container spacing={6} className='match-height'>
//         {renderCards()}
//         <Grid item xs={12} sm={6} lg={4}>
//           <Card
//             sx={{ cursor: 'pointer' }}
//             onClick={() => {
//               handleClickOpen();
//               setDialogTitle('Add');
//             }}
//           >
//             <Grid container sx={{ height: '100%' }}>
//               <Grid item xs={5}>
//                 <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
//                   <img width={65} height={130} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
//                 </Box>
//               </Grid>
//               <Grid item xs={7}>
//                 <CardContent>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Button
//                       variant='contained'
//                       sx={{ mb: 2.5, whiteSpace: 'nowrap' }}
//                       onClick={() => {
//                         handleClickOpen();
//                         setDialogTitle('Add');
//                       }}
//                     >
//                       Add Role
//                     </Button>
//                     <Typography variant='body2'>Add role, if it doesn't exist.</Typography>
//                   </Box>
//                 </CardContent>
//               </Grid>
//             </Grid>
//           </Card>
//         </Grid>
//         <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             <DialogTitle sx={{ textAlign: 'center' }}>
//               <Typography variant='h5' component='span'>
//                 {`${dialogTitle} Role`}
//               </Typography>
//               <Typography variant='body2'>Set Role Permissions</Typography>
//             </DialogTitle>
//             <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
//               {/* ... (rest of the code) */}
//               <TableBody>
//                 {permissionData?.map(({ id, name }, index) => {
//                   const key = name.toLowerCase().split(' ').join('-');
//                   return (
//                     <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
//                       <TableCell
//                         sx={{
//                           fontWeight: 600,
//                           whiteSpace: 'nowrap',
//                           color: (theme) => `${theme.palette.text.primary} !important`,
//                         }}
//                       >
//                         {name}
//                       </TableCell>
//                       <TableCell>
//                         <Controller
//                           name={`${key}-read`}
//                           control={control}
//                           defaultValue={false}
//                           render={({ field }) => (
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   {...field}
//                                   size='small'
//                                   onChange={(e) => {
//                                     field.onChange(e);
//                                     togglePermission(`${key}-read`, id, key, 'read');
//                                   }}
//                                   checked={selectedCheckbox.includes(`${key}-read`)}
//                                 />
//                               }
//                             />
//                           )}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Controller
//                           name={`${key}-write`}
//                           control={control}
//                           defaultValue={false}
//                           render={({ field }) => (
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   {...field}
//                                   size='small'
//                                   onChange={(e) => {
//                                     field.onChange(e);
//                                     togglePermission(`${key}-write`, id, key, 'write');
//                                   }}
//                                   checked={selectedCheckbox.includes(`${key}-write`)}
//                                 />
//                               }
//                             />
//                           )}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Controller
//                           name={`${key}-create`}
//                           control={control}
//                           defaultValue={false}
//                           render={({ field }) => (
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   {...field}
//                                   size='small'
//                                   onChange={(e) => {
//                                     field.onChange(e);
//                                     togglePermission(`${key}-create`, id, key, 'create');
//                                   }}
//                                   checked={selectedCheckbox.includes(`${key}-create`)}
//                                 />
//                               }
//                             />
//                           )}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//               {/* ... (rest of the code) */}
//             </DialogContent>
//           </Box>
//         </Dialog>
//       </Grid>
//     );
//   };
  
//   export default RolesCards;
  // ... (previous imports and code)
// ... (import statements)

const RolesCards = () => {
    const [open, setOpen] = React.useState(false);
    const [roleName, setRoleName] = React.useState("");
    const [dialogTitle, setDialogTitle] = React.useState('Add');
    const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
    const [selectedData, setSelected] = React.useState([]);
    const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = React.useState(false);
    
    // Initialize react-hook-form
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue, // Add setValue from react-hook-form
      getValues,
    } = useForm();
    
    // ... (other code)
  
    const togglePermission = (key, id, subject, action) => {
      let arr = selectedCheckbox;
      let newArray = selectedData;
      if (selectedCheckbox.includes(key)) {
        arr.splice(arr.indexOf(key), 1);
        setSelectedCheckbox([...arr]);
        newArray.splice(newArray.indexOf(id), 1);
        setSelected([...newArray]);
      } else {
        arr.push(key);
        setSelectedCheckbox([...arr]);
        const existingItemIndex = newArray.findIndex(item => item.id === id);
        if (existingItemIndex === -1) {
          newArray.push({ id, subject, actions: [action] });
        } else {
          newArray[existingItemIndex] = {
            ...newArray[existingItemIndex],
            actions: [...newArray[existingItemIndex]?.actions, action]
          };
        }
        setSelected([...newArray]);
      }
      
      // Update the form value for the checkbox
      setValue(key, !selectedCheckbox.includes(key));
    }
  
    const handleSelectAllCheckbox = () => {
      if (isIndeterminateCheckbox) {
        setSelectedCheckbox([]);
      } else {
        permissionData?.forEach(({ id, name }) => {
          const key = name.toLowerCase().split(' ').join('-');
          togglePermission(`${key}-read`, id, key, "read");
          togglePermission(`${key}-write`, id, key, "write");
          togglePermission(`${key}-create`, id, key, "create");
        });
      }
    }
  
    // ... (other code)
  
    return (
      <Grid container spacing={6} className='match-height'>
        {/* ... (other code) */}
        
        {/* Dialog content */}
        <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography variant='h5' component='span'>
                {`${dialogTitle} Role`}
              </Typography>
              <Typography variant='body2'>Set Role Permissions</Typography>
            </DialogTitle>
            <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
              <Box sx={{ my: 4 }}>
                <FormControl fullWidth>
                  <Controller
                    name="roleName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        name="roleName"
                        label="Full Name"
                        id="outlined-roleName"
                        variant="outlined"
                        onChange={onChange}
                        placeholder="Enter role name"
                        error={Boolean(errors.roleName)}
                        aria-describedby="validation-async-roleName"
                      />
                    )}
                  />
                  {errors.roleName && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="validation-async-roleName"
                    >
                      {errors.roleName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Typography variant='h6'>Role Permissions</Typography>
              <TableContainer>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: '0 !important' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' }
                          }}
                        >
                          Administrator Access
                          <Tooltip placement='top' title='Allows a full access to the system'>
                            <Box sx={{ display: 'flex' }}>
                              <Iconify icon='mdi:information-outline' fontSize='1rem' />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell colSpan={3}>
                        <FormControlLabel
                          label='Select All'
                          sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                          control={
                            <Checkbox
                              size='small'
                              onChange={handleSelectAllCheckbox}
                              indeterminate={isIndeterminateCheckbox}
                              checked={selectedCheckbox.length === permissionData?.length * 3}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissionData?.map(({ id, name }, index) => {
                      const key = name.toLowerCase().split(' ').join('-');
                      return (
                        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              color: theme => `${theme.palette.text.primary} !important`
                            }}
                          >
                            {name}
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`${key}-read`}
                              control={control}
                              defaultValue={false}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      size='small'
                                      onChange={(e) => {
                                        field.onChange(e);
                                        togglePermission(`${key}-read`, id, key, "read");
                                      }}
                                      checked={selectedCheckbox.includes(`${key}-read`)}
                                    />
                                  }
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`${key}-write`}
                              control={control}
                              defaultValue={false}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      size='small'
                                      onChange={(e) => {
                                        field.onChange(e);
                                        togglePermission(`${key}-write`, id, key, "write");
                                      }}
                                      checked={selectedCheckbox.includes(`${key}-write`)}
                                    />
                                  }
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`${key}-create`}
                              control={control}
                              defaultValue={false}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      size='small'
                                      onChange={(e) => {
                                        field.onChange(e);
                                        togglePermission(`${key}-create`, id, key, "create");
                                      }}
                                      checked={selectedCheckbox.includes(`${key}-create`)}
                                    />
                                  }
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
              <Box className='demo-space-x'>
                <LoadingButton loading={loading} size='large' type='submit' variant='contained'>
                  Submit
                </LoadingButton>
                <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    )
  }
  
  export default RolesCards;
  