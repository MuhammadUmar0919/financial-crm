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
  Button,
  Grid,
  Skeleton,
} from '@mui/material';
// react
import React from 'react';
// react-redux
import { useDispatch, useSelector } from 'react-redux';
//mui lab
import TabContext from '@mui/lab/TabContext';
// components
import Scrollbar from 'Components/Scrollbar';
import { ExportBtn } from 'Components/Export';
import { StatusTabs } from 'Components/StatusTabs';
// modules
import CrudForm from './CrudForm';
import UserListHead from 'views/modules/MuiTable/user-table-head';
import UserListToolbar from 'views/modules/MuiTable/user-table-toolbar';
// utils
import { applyFilter, getComparator } from 'Utils/MuiTableUtils';
// layout
import TableNoData from 'views/modules/MuiTable/table-no-data';
import UserTableRow from 'views/modules/MuiTable/user-table-row';
import { AbilityContext } from 'Layout/components/acl/Can';
import TableEmptyRows from 'views/modules/MuiTable/table-empty-rows';
import { Link } from 'react-router-dom';
import Iconify from 'Components/Iconify';
import { userProfile } from 'Utils/dataUtils';

export default function CrudModule({ config }) {
  const {
    schema,
    columns,
    loading,
    crudForm,
    onCreate,
    onDelete,
    tableData,
    smallWidth,
    statusData,
    tableTitle,
    initialState,
  } = config;
  const dispatch = useDispatch();

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

  // ** redux data
  const { authData } = useSelector((state) => state.authReducer);
  const { clientsData } = useSelector((state) => state.clientsReducer);

  // ** Hook
  const ability = React.useContext(AbilityContext);

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

  const handleRequestSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData?.map((n) => n.fullName);
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
        selected.slice(selectedIndex + 1),
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
    authData,
    tableData,
    userProfile,
    clientsData,
    serviceValue,
    getComparator: getComparator(order, orderBy),
  };

  const filteredUsers = applyFilter(filterArgument);

  const isNotFound = !filteredUsers?.length && !!search;

  const badgeContent = (status) => {
    if (status === 'all') {
      return tableData.length;
    } else {
      return tableData.filter((item) => item.status === status).length;
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
    setDates,
    handleClear,
    endDateRange,
    serviceValue,
    handleService,
    startDateRange,
    title: tableTitle,
    statusLabel: value,
    filterName: search,
    setValue: setSearch,
    handleOnChangeRange,
    found: filteredUsers?.length,
    numSelected: selected.length,
    onFilterName: handleFilterByName,
    badgeContent: () => badgeContent(value),
  };

  // React.useEffect(() => {
  //   dispatch({ type: 'ADMIN_DISMISS' });
  // }, [])

  return (
    <>
      <Container>
        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" gutterBottom>
            {tableTitle}
          </Typography>
          <Stack spacing={3} direction="row" alignItems="center">
            <ExportBtn data={tableData} title={tableTitle} />
            {tableTitle.toLowerCase() === 'invoice' ? (
              <Button
                component={Link}
                variant="contained"
                to="/invoice/create"
                startIcon={<Iconify width={20} icon="eva:plus-fill" />}
              >
                Create
              </Button>
            ) : (
              ability.can('create', tableTitle.toLowerCase()) && (
                <CrudForm
                  type="create"
                  schema={schema}
                  onCrud={onCreate}
                  loading={loading}
                  title={tableTitle}
                  smallWidth={smallWidth}
                  FormElements={crudForm}
                  initialState={initialState}
                />
              )
            )}
          </Stack>
        </Stack>

        <Card sx={{ overflow: 'unset'}}>
          <TabContext value={value}>
            <StatusTabs
              value={value}
              data={statusData}
              total={badgeContent}
              onChange={handleChange}
            />

            <UserListToolbar toolbarArguments={toolbarArguments} />

            <Scrollbar>
              <TableContainer
                sx={{ overflow: 'hidden', display: 'inline-table' }}
              >
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={columns}
                    rowCount={tableData?.length}
                    numSelected={selected?.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <React.Suspense fallback={tableSkeleton}>
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((row, index) => {
                          const rowArguments = {
                            row,
                            config,
                            handleClick: () => handleClick(row.fullName),
                            selected: selected.indexOf(row.fullName) !== -1,
                          };
                          return (
                            <UserTableRow
                              key={index}
                              rowArguments={rowArguments}
                            />
                          );
                        })}
                      <TableEmptyRows
                        isNotFound={isNotFound}
                        tableData={filteredUsers}
                      />

                      {isNotFound && <TableNoData query={search} />}
                    </TableBody>
                  </React.Suspense>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              page={page}
              component="div"
              count={tableData?.length}
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
