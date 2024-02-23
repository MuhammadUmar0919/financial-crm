// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Iconify from '@core/components/iconify'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip'
import CustomAvatar from '@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from '@core/utils/get-initials'

// ** Actions Imports
// import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import TableHeader from 'views/apps/roles/TableHeader'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { contactedFunc } from 'Utils/dataUtils'

// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
const renderClient = row => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
        <Iconify icon={row.roleIcon} fontSize={20} />
      </CustomAvatar>
    )
  }
}

const UserList = () => {
  // ** State
  const [role, setRole] = React.useState('')
  const [value, setValue] = React.useState('')
  const [pageData, setPageData] = React.useState([])
  const [pageSize, setPageSize] = React.useState({pageSize: 10, page: 0})
  
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authData, loading } = useSelector((state) => state.authReducer)
  const { viewData } = useSelector((state) => state.authReducer)

  
  const getResponse = () => {
    const filteredData = authData.filter((item) => {
      if(role) {
        return item.roleName === role
      } else {
        return item.roleName !== "super-admin"
      }
    })
    try {
      setPageData(filteredData)
    } catch (error) {
      if (error.response?.status === 500) navigate("/server-error")
      toast.error("Adminlarni yuklashda muammo bo'ldi")
    }
  }

  React.useEffect(() => {
    try {
      getResponse();
    } catch (error) {
      if (error.response?.status === 500) navigate("/server-error");
      toast.error("Adminlarni yuklashda muammo bo'ldi");
    }
  }, [role]);

  // const handleFilter = React.useCallback(val => {
  //   setValue(val)
  // }, [])

  const handleFilter = (e) => {
    setValue(e.target.value)
  }

  const handleRoleChange = React.useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handleViewData = (profile, allData) => {
    const data = {
      ...viewData,
      allData,
      profile,
    }
    dispatch({ type: "VIEW_SUCCESS", data: data })
  }
  
  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'fullName',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { fullName, username, id } = row
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                // component={Link}
                // to={`/view/${id}`}
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
                // onClick={() => handleViewData(row, contactedFunc(row.id, authData))}
              >
                {fullName}
              </Typography>
              <Typography noWrap variant='caption'>
                {`@${username}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }) => {
        return (
          <Typography variant='body2' noWrap>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'roleName',
      minWidth: 150,
      headerName: 'Role',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, } }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.roleName}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Plan',
      field: 'currentPlan',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
            {row.currentPlan}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <IconButton 
          // onClick={() => handleViewData(row, contactedFunc(row.id, authData))}
          // component={Link} to={`/view/${row.id}`}
        >
          <Iconify icon='mdi:eye-outline' />
        </IconButton>
      )
    }
  ]
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader 
            plan={role} 
            value={value} 
            data={pageData} 
            setValue={setValue}
            handleFilter={handleFilter} 
            handleRoleChange={handleRoleChange} />
          <DataGrid
            autoHeight
            pagination
            rows={pageData}
            loading={loading}
            columns={columns}
            // checkboxSelection
            disableSelectionOnClick
            paginationModel={pageSize}
            pageSizeOptions={[5, 10, 20]}
            onPaginationModelChange={setPageSize}
            sx={{'& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
