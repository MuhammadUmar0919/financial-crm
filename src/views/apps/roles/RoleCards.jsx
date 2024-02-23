// ** MUI Imports
import {  
Box,
 Grid,
 Card,
 Link,
 Table,
 Button,
 Avatar,
 Dialog,
 Tooltip,
 Checkbox,
 TableRow,
 TableBody,
 TableCell,
 TableHead,
 TextField,
 Typography,
 FormControl,
 DialogTitle,
 AvatarGroup,
 CardContent,
 DialogContent,
 FormHelperText,
 TableContainer,
 FormControlLabel } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
// yup import
import * as yup from "yup";
// ** React Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
// components import
import Iconify from '@core/components/iconify';
// data import
import { PPM } from "Data";
// uuid import
import { v4 as uuid } from 'uuid';
import ScrollBar from "react-perfect-scrollbar";
import { CopiedBtn } from "@core/components/copied-btn";
import { ToastPromise } from "@core/components/Downloads/ToastPromise";

const RolesCards = () => {
  // ** States
  const [roles, setRoles] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  // const [ editData, setEdit ] = React.useState([]);
  const [ nameRole, setRoleName ] = React.useState('');
  const [ selectedData, setSelected ] = React.useState([]);
  const [dialogTitle, setDialogTitle] = React.useState('Add');
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = React.useState(false);
  // ** Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => setOpen(true);
  const { authData } = useSelector((state) => state.authReducer);
  const { roleData, loading } = useSelector((state) => state.roleReducer);
  const { permissionData } = useSelector((state) => state.permissionReducer);
  
  const schema = yup.object().shape({
    roleName: yup.string().required(),
  })
  const {
    reset,
    control,
    formState,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ mode: "onBlur", defaultValues: nameRole, resolver: yupResolver(schema),});
  const formValues = getValues()

  const togglePermission = (key, id, subject, roleName, action) => {
    let arr = selectedCheckbox
    let newArray = selectedData;
    if (selectedCheckbox.includes(key)) {
      arr.splice(arr.indexOf(key), 1)
      setSelectedCheckbox([...arr])
      newArray.splice(newArray.indexOf(key), 1)
      setSelected([...newArray]);
    } else {
      arr.push(key)
      setSelectedCheckbox([...arr])
      const existingItemIndex = newArray.findIndex(item => item.subject === subject);
      if (existingItemIndex === -1) {
        newArray.push({ id, key, roleName, subject, actions: [action], createdDate: new Date() });
      } else {
        newArray[existingItemIndex] = {
          ...newArray[existingItemIndex],
          actions: [...newArray[existingItemIndex]?.actions, action]
        };
      }
      setSelected([...newArray]);
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      PPM.forEach(({subject, id}) => {
        const key = subject.toLowerCase().split(' ').join('-')
        togglePermission(`${key}-create`, id, key, formValues.roleName, "create")
        togglePermission(`${key}-read`, id, key, formValues.roleName, "read")
        togglePermission(`${key}-update`, id, key, formValues.roleName, "update")
        togglePermission(`${key}-remove`, id, key, formValues.roleName, "remove")
      })
    }
  }
  
  const handleFilter = (roleName) => {
    let updatedPermissionData = [...permissionData];
  
    if (updatedPermissionData.length === 0) {
      updatedPermissionData = selectedData.map((selectedItem) => {
        const key = selectedItem.subject?.toLowerCase().split(' ').join('-');
        return {
          id: uuid(), // Generate a unique ID for the new item
          subject: key,
          assignedTo: [roleName],
          createdDate: new Date(),
          actions: [...selectedItem.actions],
        };
      });
    } else {
      selectedData.forEach((secondItem) => {
        const matchingItemIndex = updatedPermissionData.findIndex((firstItem) => {
          const areSubjectsEqual = firstItem.subject === secondItem.subject;
        
          // Create sorted copies of actions arrays for comparison
          const sortedFirstActions = [...firstItem.actions].sort();
          const sortedSecondActions = [...secondItem.actions].sort();
        
          const areActionsEqual = JSON.stringify(sortedFirstActions) === JSON.stringify(sortedSecondActions);
        
          return areSubjectsEqual && areActionsEqual;
        });
  
        if (matchingItemIndex !== -1) {
          // If actions are the same, merge them
          updatedPermissionData[matchingItemIndex] = {
            ...updatedPermissionData[matchingItemIndex],
            assignedTo: [
              ...new Set([...updatedPermissionData[matchingItemIndex].assignedTo, roleName])
            ]
          };
        } else {
          // If not found, add the new item
          updatedPermissionData.push({
            ...secondItem,
            id: uuid(), // Generate a unique ID for the new item
            assignedTo: [roleName],
            modifiedDate: new Date(),
          });
        }
      });
    }
    return updatedPermissionData;
  };

  React.useEffect(() => {
    const uniqueRoles = Array.from(new Set(roleData.map(role => role?.roleName)));
    setRoles(uniqueRoles);
  }, [roleData]);
  
  React.useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < PPM?.length * 4) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const handleClose = () => {
    setOpen(false)
    setSelected([])
    setRoleName('')
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }
  
  const onSubmit = async (value) => {
    dispatch({ type: "ROLE_START" })
    try {
      await ToastPromise("Role", "onCreate", true)
      const filteredData = handleFilter(value.roleName)
      dispatch({ type: "PERMISSION_SUCCESS_ASSIGNED", data: filteredData })
      dispatch({ type: "ROLE_SUCCESS", data: selectedData })
      handleClose()
      reset({ roleName: '' })
    } catch (error) {
      dispatch({ type: "ROLE_FAIL"})
      if (error.response?.status === 500) navigate("/server-error")
      await ToastPromise("Role", "onCreate", false)
    }
  }

  const onEdit = (roleName) => {
    setRoleName(roleName)
  }
  
  const handleDelete = async () => {
    dispatch({ type: "ROLE_START" })
    try {
      await ToastPromise("Role", "onDelete", true)
      dispatch({ type: "ROLE_DELETE", data: nameRole})
      dispatch({ type: "PERMISSION_DELETE_ASSIGNED", role: nameRole })
      handleClose()
    } catch (error) {
      dispatch({ type: "ROLE_FAIL"})
      if (error.response?.status === 500) navigate("/server-error")
      await ToastPromise("Role", "onDelete", false)
    }
  }

  const calculateTotal = (role) => {
    return authData?.filter((i) => i.roleName === role).length
  };

  const renderCards = () =>
  roles?.map((roleName, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body2'>{`Total ${calculateTotal(roleName)} users`}</Typography>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 40, height: 40, fontSize: '0.875rem' } }}>
                <Avatar key={index} alt={roleName} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=20" />
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6'>{roleName}</Typography>
                <Typography
                  to='/'
                  variant='body2'
                  component={Link}
                  onClick={() => {
                    onEdit(roleName)
                    handleClickOpen()
                    setDialogTitle('Edit')
                  }}
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                  >
                  Edit Role
                </Typography>
              </Box>
              <CopiedBtn title={roleName} text={roleName} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img width={65} height={130} alt='add-role' src='images/pages/add-new-role-illustration.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 2.5, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add Role
                  </Button>
                  <Typography variant='body2'>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 650,
            p: [2, 10],
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="role-dialog-submit"
        aria-describedby="role-dialog-header"
      >
          <DialogTitle 
            id="role-dialog-title" 
            sx={{ textAlign: 'center' }}
          >
            <Typography variant='h5' component='span'>
              {`${dialogTitle} Role`}
            </Typography>
            <Typography variant='body2'>Set Role Permissions</Typography>
          </DialogTitle>
          <ScrollBar>
            <DialogContent>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box 
                  variant="body2" 
                  id="role-dialog-header" 
                  sx={{ my: 4 }}
                >
                  <FormControl fullWidth>
                    <Controller
                      name="roleName"
                      control={control}
                      rules={{ required: true }}
                      defaultValue={nameRole}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Role Name"
                          id="outlined-role-name"
                          variant="outlined"
                          onChange={onChange}
                          placeholder="Management"
                          error={Boolean(errors.roleName)}
                          aria-describedby="validation-async-role-name"
                        />
                      )}
                    />
                    {errors.roleName && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-async-role-name"
                      >
                        {errors.roleName.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Typography variant='h6'>Role Permissions</Typography>
                <ScrollBar>
                  <TableContainer sx={{ overflow: "hidden", display: "inline-table", userSelect: 'none' }}>
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
                                  disabled={!isDirty}
                                  onChange={handleSelectAllCheckbox}
                                  indeterminate={isIndeterminateCheckbox}
                                  checked={selectedCheckbox.length === PPM?.length * 4}
                                />
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {PPM?.map(({subject, id}, index) => {
                          const key = subject?.toLowerCase().split(' ').join('-')
                          return (
                            <TableRow 
                              key={index} 
                              sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  color: theme => `${theme.palette.text.primary} !important`
                                }}
                              >
                                {subject} Management
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  label='Create'
                                  control={
                                    <Checkbox
                                      size='small'
                                      disabled={!isDirty}
                                      id={`${key}-create`}
                                      checked={selectedCheckbox.includes(`${key}-create`)}
                                      onChange={(e) => {
                                        if(e.target.checked) {
                                          togglePermission(`${key}-create`, id, key, formValues.roleName, "create")
                                        }
                                      }}
                                    />
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  label='Read'
                                  control={
                                    <Checkbox
                                      size='small'
                                      id={`${key}-read`}
                                      disabled={!isDirty}
                                      checked={selectedCheckbox.includes(`${key}-read`)}
                                      onChange={(e) => {
                                        if(e.target.checked) {
                                          togglePermission(`${key}-read`, id, key, formValues.roleName, "read");
                                        }
                                      }}
                                    />
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  label='Update'
                                  control={
                                    <Checkbox
                                      size='small'
                                      disabled={!isDirty}
                                      id={`${key}-update`}
                                      checked={selectedCheckbox.includes(`${key}-update`)}
                                      onChange={(e) => {
                                        if(e.target.checked) {
                                          togglePermission(`${key}-update`, id, key, formValues.roleName, "update")
                                        }
                                      }}
                                    />
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  label='Remove'
                                  control={
                                    <Checkbox
                                      size='small'
                                      disabled={!isDirty}
                                      id={`${key}-remove`}
                                      checked={selectedCheckbox.includes(`${key}-remove`)}
                                      onChange={(e) => {
                                        if(e.target.checked) {
                                          togglePermission(`${key}-remove`, id, key, formValues.roleName, "remove")
                                        }
                                      }}
                                    />
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ScrollBar>
                <Box sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
              <Box className='demo-space-x'>
                <LoadingButton 
                  size='large' 
                  type="submit"
                  loading={loading} 
                  variant='contained'
                  disabled={!isDirty || loading} 
                >
                  {dialogTitle === "Add" ? "Create" : "Edit"}
                </LoadingButton>
                {dialogTitle === "Edit" ? (
                  <LoadingButton 
                    size='large' 
                    loading={loading} 
                    variant='contained'
                    color="error"
                    disabled={loading} 
                    onClick={handleDelete}
                >
                  Delete
                </LoadingButton>
                ) : (
                <Button size='large' type="reset" variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
                )}
              </Box>
            </Box>
              </Box>
            </DialogContent>
          </ScrollBar>
          {/* <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
            <Box className='demo-space-x'>
              <LoadingButton 
                size='large' 
                loading={loading} 
                variant='contained'
                disabled={!isDirty || loading} 
                onClick={() => handleSubmit(onSubmit)}
              >
                {dialogTitle === "Add" ? "Create" : "Edit"}
              </LoadingButton>
              {dialogTitle === "Edit" ? (
                <LoadingButton 
                  size='large' 
                  loading={loading} 
                  variant='contained'
                  color="error"
                  disabled={loading} 
                  onClick={handleDelete}
              >
                Delete
              </LoadingButton>
              ) : (
              <Button size='large' type="reset" variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
              )}
            </Box>
          </DialogActions> */}
      </Dialog>
    </Grid>
  )
}

export default RolesCards;
