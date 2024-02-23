// @mui
import {
  Card,
  Table,
  Stack,
  TableBody,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  Button,
  Skeleton,
  Backdrop,
  CircularProgress,
} from '@mui/material';
// react
import React from 'react';
// react-redux
import { useDispatch, useSelector } from 'react-redux';
//mui lab
import TabContext from '@mui/lab/TabContext';
// components
// import Scrollbar from '@/Components/Scrollbar';
import { ExportBtn } from '@/@core/components/export';
import { StatusTabs } from '@/views/modules/MuiTable/status-tabs';
// modules
import CrudForm from './CrudForm';
import UserListHead from '@/views/modules/MuiTable/user-table-head';
import UserListToolbar from '@/views/modules/MuiTable/user-table-toolbar';
// utils
import { applyFilter, getComparator } from '@/Utils/MuiTableUtils';
// layout
import TableNoData from '@/views/modules/MuiTable/table-no-data';
import UserTableRow from '@/views/modules/MuiTable/user-table-row';
// import { AbilityContext } from '@/Layout/components/acl/Can';
import TableEmptyRows from '@/views/modules/MuiTable/table-empty-rows';
import { crud } from '@/Redux/crud/actions';
import { selectListItems } from '@/Redux/crud/selectors';
import { Link } from 'react-router-dom';
import Iconify from '@/@core/components/iconify';
import { useData } from '@/Hooks/useData';
import { updateConfig } from '@/Redux/configSlice';

export default function CrudModule({ config }) {
  const {
    entity,
    columns,
    statusData,
    // PANEL_TITLE,
    ENTITY_NAME,
    initialState,
    // CREATE_ENTITY,
    // dataTableTitle,
    ADD_NEW_ENTITY,
    searchConfig,
    DATATABLE_TITLE,
  } = config;

  const dispatch = useDispatch();
  const { getUserData } = useData();
  const [page, setPage] = React.useState(0);
  const [dates, setDates] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [value, setValue] = React.useState('all');
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orderBy, setOrderBy] = React.useState('fullName');
  const [serviceValue, setServiceValue] = React.useState('');
  const [endDateRange, setEndDateRange] = React.useState(null);
  const [startDateRange, setStartDateRange] = React.useState(null);
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items: dataSource } = listResult;

  // const handelDataTableLoad = React.useCallback((pagination) => {
  //   const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
  //   dispatch(crud.list({ entity, options }));
  // }, []);

  const dispatcher = () => {
    dispatch(crud.list({ entity }));
  };

  React.useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  // ** Hook
  // const ability = React.useContext(AbilityContext);

  const handleClear = () => {
    setDates([]);
    setSearch('');
    setValue('all');
    setServiceValue('');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleService = (e) => {
    setServiceValue(e.target.value);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const handleRequestSort = (event, protId) => {
    const isAsc = orderBy === protId && order === 'asc';
    if (protId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(protId);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataSource?.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (fullName) => {
    const selectedIndex = selected.indexOf(fullName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, fullName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setSearch(event.target.value);
  };

  const filterArgument = {
    dates,
    value,
    search,
    dataSource,
    getUserData,
    serviceValue,
    getComparator: getComparator(order, orderBy),
  };

  const filteredUsers = applyFilter(filterArgument);
  const isNotFound = !filteredUsers?.length && !!search;

  const handleViewData = () => {
    const data = {
      ...config,
    };
    dispatch(updateConfig(data));
    // dispatch(crud.currentItem({ data: record }));
  };

  const badgeContent = (status) => {
    if (status?.toLowerCase() === 'all') {
      return dataSource.length;
    } else {
      return dataSource.filter((item) => item.status || item.categoryName === status).length || 0;
    }
  };

  const tableSkeleton = (
    <Grid container spacing={6}>
      <Grid item xl={9} md={8} xs={12}>
        <Skeleton animation="wave" height={400} />
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        {/* You can add another Skeleton here if needed */}
        <Skeleton animation="wave" height={400} />
      </Grid>
    </Grid>
  );

  const toolbarArguments = {
    dates,
    entity,
    setDates,
    handleClear,
    endDateRange,
    searchConfig,
    serviceValue,
    handleService,
    startDateRange,
    statusLabel: value,
    filterName: search,
    setValue: setSearch,
    handleOnChangeRange,
    found: filteredUsers?.length,
    numSelected: selected.length,
    onFilterName: handleFilterByName,
  };

  if (listIsLoading) {
    <CircularProgress color="inherit" />;
  }

  return (
    <>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={listIsLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Container>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            {DATATABLE_TITLE}
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <ExportBtn data={dataSource} title={DATATABLE_TITLE} />
            {ENTITY_NAME === 'invoice' ? (
              <Button
                component={Link}
                variant="contained"
                to={`/invoice/${'create'}`}
                onClick={handleViewData}
                startIcon={<Iconify width={20} icon="eva:plus-fill" />}
              >
                Create
              </Button>
            ) : (
              // ability.can('create', ENTITY_NAME) && (
              <CrudForm
                type="create"
                config={config}
                title={ADD_NEW_ENTITY}
                initialState={initialState}
              />
              // )
            )}
          </Stack>
        </Stack>

        <Card>
          <TabContext value={value}>
            <StatusTabs
              value={value}
              data={statusData}
              total={badgeContent}
              onChange={handleChange}
            />

            <UserListToolbar toolbarArguments={toolbarArguments} />

            {/* <Scrollbar> */}
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={columns}
                  rowCount={dataSource?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <React.Suspense fallback={tableSkeleton}>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const rowArguments = {
                            row,
                            config,
                            handleClick: () => handleClick(row.fullName),
                            selected: selected.indexOf(row.fullName) !== -1,
                          };
                          return <UserTableRow key={index} rowArguments={rowArguments} />;
                        })
                    ) : isNotFound ? (
                      <TableNoData query={search} />
                    ) : (
                      <TableEmptyRows />
                    )}
                  </TableBody>
                </React.Suspense>
              </Table>
            </TableContainer>
            {/* </Scrollbar> */}

            <TablePagination
              page={page}
              component="div"
              count={dataSource?.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabContext>
        </Card>
      </Container>
    </>
  );
}
