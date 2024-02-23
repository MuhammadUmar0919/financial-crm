// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Iconify from '@core/components/iconify'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
import PageHeader from '@core/components/page-header'
import TableHeader from 'views/apps/permissions/TableHeader'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'
import { TimeSleep } from 'Utils/timeSleep'
import { useNavigate } from 'react-router-dom'
import { momentDate } from 'Utils/formatTime'
import ScrollBar from 'react-perfect-scrollbar'
import { sentenceCase } from 'change-case'
// import PerfectScrollbar from 'react-perfect-scrollbar';

const actionFind = (data) => {
  const allActions = ["read", "create", "update", "remove"];
  const uniqueActions = [...new Set(data)];
  const intersection = allActions.filter(action => uniqueActions.includes(action));

  let result = "";
  if (intersection.length === allActions.length) {
    result = "all actions";
  }  else if (intersection.length === 1) {
    result = `only ${intersection[0]}`;
  }
  else if (intersection.length === 0) {
    result = "no action yet";
  } else {
    result = intersection.join(" & ");
  }

  return ` - ${result}`;
};

const defaultColumns = [
  {
    flex: 0.25,
    field: 'subject',
    width: "40%",
    headerName: 'Permission Name',
    renderCell: ({ row }) => <Typography>{sentenceCase(row.subject) + actionFind(row.actions)}</Typography>
  },
  {
    flex: 0.35,
    width: "25%",
    field: 'assignedTo',
    headerName: 'Assigned To',
    renderCell: ({ row }) => {
      return row?.assignedTo?.map((assignee, index) => (
        <CustomChip
          size='small'
          key={index}
          skin='light'
          // color={colors[assignee.roleName]}
          // label={assignee}
          label={assignee.replace('-', ' ')}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
        />
      ))
    }
  },
  {
    flex: 0.25,
    width: "20%",
    field: 'createdDate',
    headerName: 'Created Date',
    renderCell: ({ row }) => <Typography variant='body2'>{momentDate(row.createdDate)}</Typography>
  }
]

const PermissionsTable = () => {
  // ** State
  const [value, setValue] = React.useState('')
  const [pageSize, setPageSize] = React.useState({pageSize: 10, page: 0})
  const [editValue, setEditValue] = React.useState('')
  const [data, setData] = React.useState([])
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setEditValue({ ...editValue, name: e.target.value})
  }
  // ** Hooks
  const { permissionData, loading } = useSelector((state) => state.permissionReducer)
  const findData = (id) => permissionData.find((item) => item.id === id)
  const getResponse = () => {
    try {
      setData(permissionData)
    } catch (error) {
      if (error.response?.status === 500) navigate("/server-error")
      toast.error("Permissionlarni yuklashda muammo bo'ldi")
    }
  }
  React.useEffect(() => {
    dispatch({type: 'PERMISSION_START'})
    getResponse()
    dispatch({type: 'PERMISSION_FAIL'});
  }, [permissionData])

  // const handleFilter = React.useCallback((e) => {
  //   setValue(e.target.value)
  // }, [])

  const handleFilter = (e) => {
    setValue(e.target.value)
  }

  const handleEdit = (id) => {
    setEditDialogOpen(true)
    setEditValue(findData(id))
  }
  const handleDelete = (id) => {
    dispatch({ type: "PERMISSION_DELETE", id: id })
  }
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: "PERMISSION_UPDATING_START" })
    const values = {
      ...editValue,
      updatedDate: new Date(),
    }
    await TimeSleep()
    try {
      toast.success("Ruxsat muvaffaqiyatli taxrirlandi")
      dispatch({ type: "PERMISSION_UPDATING_SUCCESS", data: values })
    } catch (error) {
      dispatch({ type: "PERMISSION_FAIL"})
      if (error.response?.status === 500) navigate("/server-error")
      toast.error("Ruxsatni taxrirlashda muammo bo'ldi")
    }
    setEditDialogOpen(false)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      width: "10%",
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', }}>
          <IconButton disabled onClick={() => handleEdit(row.id)}>
            <Iconify icon='mdi:pencil-outline' />
          </IconButton>
          <IconButton disabled onClick={() => handleDelete(row.id)}>
            <Iconify icon='mdi:delete-outline' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Permissions List</Typography>}
            subtitle={
              <Typography variant='body2'>
                Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader 
              loading={loading} 
              filterValue={value} 
              setValue={setValue} 
              permissionData={data} 
              handleFilter={handleFilter} 
            />
            <ScrollBar>
              <Box sx={{
                overflow: "hidden", 
                display: "inline-table",
                width: "100%",
                height: "100%"  
              }}>
                <DataGrid
                  autoHeight
                  pagination
                  rows={data}
                  loading={loading}
                  columns={columns}
                  paginationModel={pageSize}
                  pageSizeOptions={[5, 10, 20]}
                  onPaginationModelChange={setPageSize}
                  sx={{'& .MuiDataGrid-columnHeaders': { borderRadius: 0 }}}
                />
              </Box>
            </ScrollBar>
          </Card>
        </Grid>
      </Grid>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Edit Permission
          </Typography>
          <Typography variant='body2'>Edit permission as per your requirements.</Typography>
        </DialogTitle>
        <DialogContent sx={{ mx: 'auto' }}>
          <Alert severity='warning' sx={{ maxWidth: '500px' }}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the permission name, you might break the system permissions functionality. Please ensure you're
            absolutely certain before proceeding.
          </Alert>

          <Box component='form' sx={{ mt: 8 }} onSubmit={onSubmit}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <TextField
                fullWidth
                type="text"
                size='small'
                value={editValue.name}
                label='Permission Name'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                placeholder='Enter Permission Name'
                onChange={handleChange}
              />

              <LoadingButton loading={loading} type='submit' variant='contained'>
                Update
              </LoadingButton>
            </FormGroup>
            <FormControlLabel control={<Checkbox />} label='Set as core permission' />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PermissionsTable
