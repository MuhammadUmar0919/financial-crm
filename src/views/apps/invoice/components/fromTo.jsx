import React from 'react';
import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogTitle,
  FormControl,
  DialogContent,
  ListItemButton,
  DialogContentText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Iconify from '@/@core/components/iconify';
import ScrollBar from 'react-perfect-scrollbar';
import useToken from '@/Hooks/useToken';
import { SearchInput } from '@/@core/components/custom-input';
import NotFoundData from '@/Components/NotFound';
import { EmptyData } from '@/Components/EmptyData';
import instance from '@/Api/Config';

const filterData = (array, query) => {
  if (query) {
    return array.filter(
      (item) =>
        item?.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        item?.address?.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    return array;
  }
};

export const FromTo = ({ entity, setValue, errors, control }) => {
  const { token } = useToken();
  const userType = entity === 'employees';
  const field = userType ? 'createdBy' : 'billTo';
  const role = userType && token.roleName === 'employee';
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [current, setCurrent] = React.useState(null);
  const [data, setData] = React.useState([]);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleFilter = (e) => setSearch(e.target.value);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get(`/${entity}`);
        setData(response.data);
      } catch (error) {
          console.error('Error fetching admins data:', error);
      }
    };
    getData();
  }, [entity]);

  const handleClick = (value) => {
    setCurrent(value);
    setValue(field, value.id);
    handleClose();
  };

  const filteredData = filterData(data, search);
  const isNotFound = !filteredData?.length && !!search;
  return (
    <>
      <Stack
        sx={{
          height: '100%',
          display: 'grid',
          alignContent: 'space-between',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{userType ? 'From' : 'To'}:</Typography>
          <IconButton disabled={role} onClick={handleOpen}>
            <Iconify icon={`mdi:${current ? 'edit' : 'plus'}`} />
          </IconButton>
        </Stack>
        <Stack>
          {current ? (
            <>
              <Typography variant="subtitle2">{current.fullName}</Typography>
              <Typography variant="body2">{current.address}</Typography>
              <Typography variant="body2">{current.phoneNumber}</Typography>
            </>
          ) : (
            <Controller
              name={field}
              control={control}
              rules={{ required: 'Please select a value.' }}
              render={({ field: controllerField }) => (
                <Typography
                  variant="body2"
                  {...controllerField}
                  color={errors && errors[field] ? 'error' : 'inherit'}
                >
                  {errors[field] && errors[field].message}
                </Typography>
              )}
            />
          )}
        </Stack>
      </Stack>
      <Dialog
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 400, p: [4, 2] } }}
        open={open}
        onClose={handleClose}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ p: '1rem 1rem 0 1rem' }}
          justifyContent="space-between"
        >
          <DialogTitle sx={{ p: 'unset' }}>{userType ? 'Employees' : 'Customers'}</DialogTitle>
          <Button
            component={Link}
            to={`/${entity.toLowerCase()}`}
            startIcon={<Iconify icon="mdi:plus" />}
          >
            New
          </Button>
        </Box>
        <DialogContent>
          <DialogContentText mb={4}>
            <FormControl fullWidth>
              <SearchInput
                size="large"
                type={entity}
                value={search}
                setValue={setSearch}
                onChange={handleFilter}
              />
            </FormControl>
          </DialogContentText>
          <Box component="form" onSubmit={handleClick}>
            <ScrollBar>
              {filteredData.length > 0 ? (
                <Grid height="auto" container spacing={3}>
                  {filteredData.map((item, index) => (
                    <Grid key={index} item xs={12}>
                      <ListItemButton
                        onClick={() => handleClick(item)}
                        sx={{
                          borderRadius: '10px',
                          display: 'grid',
                          gap: '5px',
                        }}
                      >
                        <Typography variant="subtitle2">{item.fullName}</Typography>
                        <Typography variant="body2">{item.address}</Typography>
                        <Typography variant="body2">{item.phoneNumber}</Typography>
                      </ListItemButton>
                    </Grid>
                  ))}
                </Grid>
              ) : isNotFound ? (
                <NotFoundData text={search} />
              ) : (
                <EmptyData message="No data" />
              )}
            </ScrollBar>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
