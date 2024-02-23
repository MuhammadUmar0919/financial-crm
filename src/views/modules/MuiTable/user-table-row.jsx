// mui import
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// react import
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// components import
import Label from '@/@core/components/label';
import Iconify from '@/@core/components/iconify';
import StatusForm from '@/@core/components/status-form';
import { AbilityContext } from '@/Layout/components/acl/Can';
import { StyledMenuItem } from '@/Components/StyledMenuItem/Style';
// modules import
import CrudForm from '@/Modules/CrudModule/CrudForm';
// change case import
import { sentenceCase } from 'change-case';
// utils import
import { fDate } from '@/Utils/formatTime';
import { statusIcons } from '@/Utils/statusIcons';
import { statusColors } from '@/Utils/statusColors';
import { NumberOfStatuses } from '@/Utils/numberOfStatuses';
import { contactedFunc } from '@/Utils/dataUtils';

// ** Custom Components Imports
import CustomAvatar from '@/@core/components/mui/avatar';
import { Box, MenuItem, Tooltip } from '@mui/material';
import { crud } from '@/Redux/crud/actions';
import { selectDeletedItem } from '@/Redux/crud/selectors';
import { useData } from '@/Hooks/useData';
import { updateConfig } from '@/Redux/configSlice';

// ---------------------------------------------------------------------- //

export default function UserTableRow({ rowArguments }) {
  const { row, config, selected, handleClick } = rowArguments;
  const {
    age,
    email,
    protId,
    status,
    billTo,
    country,
    address,
    dueDate,
    balance,
    roleIcon,
    fullName,
    createdAt,
    createdBy,
    issuedDate,
    statusName,
    companyName,
    phoneNumber,
    serviceName,
    categoryName,
    companyEmail,
  } = row;
  const { entity, endpoint, tableCell, tableTitle, statusData, UPDATE_ENTITY } = config;
  const dispatch = useDispatch();
  const { getUserData } = useData();

  const [open, setOpen] = React.useState(null);
  const [itemSet, setItem] = React.useState(null);
  const { isSuccess } = useSelector(selectDeletedItem);
  const authData = [];
  const clientsData = [];

  const handleOpenMenu = (event, value) => {
    setOpen(event.currentTarget);
    setItem(value);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // ** Hook
  // const ability = React.useContext(AbilityContext);

  const handleViewData = (currentData) => {
    const data = {
      entity,
      endpoint,
      currentData,
      tableCell,
      create: false
    };
    dispatch(updateConfig(data));
    handleCloseMenu();
    // dispatch(crud.currentItem({ data: record }));
  };

  const handleDelete = (currentItem) => {
    dispatch(crud.delete({ entity, id: currentItem }));
    dispatch(crud.list({ entity }));
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(crud.list({ entity }));
      dispatch(crud.resetAction({ actionType: 'delete' }));
    }
  }, [isSuccess]);

  React.useEffect(() => {
    const data = {
      entity,
      endpoint,
      tableCell,
    };
    dispatch({ type: 'VIEW_SUCCESS', data: data });
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        {tableCell?.tooltipData && (
          <TableCell align="center">
            <Tooltip
              title={
                <div>
                  <Typography variant="caption" sx={{ color: 'common.white', fontWeight: 600 }}>
                    {status}
                  </Typography>
                  <br />
                  <Typography variant="caption" sx={{ color: 'common.white', fontWeight: 600 }}>
                    Balance:
                  </Typography>
                  {balance}
                  <br />
                  <Typography variant="caption" sx={{ color: 'common.white', fontWeight: 600 }}>
                    Due Date:
                  </Typography>
                  {fDate(dueDate)}
                </div>
              }
            >
              <CustomAvatar
                skin="light"
                color={statusColors(status)}
                sx={{ width: 34, height: 34 }}
              >
                <Iconify icon={statusIcons(status)} fontSize="1.25rem" />
              </CustomAvatar>
            </Tooltip>
          </TableCell>
        )}

        <TableCell align="left">
          <Stack direction="row" alignItems="center" spacing={2}>
            {roleIcon && (
              <CustomAvatar skin="light">
                <Iconify icon={roleIcon} />
              </CustomAvatar>
            )}
            {tableCell?.fullName && (
              <Typography variant="subtitle2" noWrap>
                {fullName}
              </Typography>
            )}
            {tableCell?.statusName && (
              <Typography variant="subtitle2" noWrap>
                {statusName}
              </Typography>
            )}
            {tableCell?.billTo && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  variant="subtitle2"
                  sx={{
                    fontWeight: 500,
                    lineHeight: '22px',
                    color: 'text.primary',
                    letterSpacing: '.1px',
                  }}
                >
                  {getUserData(billTo)?.fullName}
                </Typography>
                <Typography noWrap variant="caption">
                  {getUserData(billTo)?.companyEmail}
                </Typography>
              </Box>
            )}
            {tableCell?.serviceName && (
              <Typography variant="subtitle2" noWrap>
                {serviceName}
              </Typography>
            )}
          </Stack>
        </TableCell>

        {tableCell?.categoryName && <TableCell align="left">{categoryName}</TableCell>}

        {tableCell?.email && <TableCell align="left">{email}</TableCell>}

        {tableCell?.companyEmail && <TableCell align="left">{companyEmail}</TableCell>}

        {tableCell?.numberOfSales && (
          <TableCell align="center">
            <Label color={'info'}>{NumberOfStatuses(protId, clientsData, 'sale')}</Label>
          </TableCell>
        )}
        {tableCell?.numberOfMeeting && (
          <TableCell align="center">
            <Label color={'success'}>{NumberOfStatuses(protId, clientsData, 'meeting')}</Label>
          </TableCell>
        )}

        {tableCell?.numberOfRejections && (
          <TableCell align="center">
            <Label color={'warning'}>{NumberOfStatuses(protId, clientsData, 'rejected')}</Label>
          </TableCell>
        )}

        {tableCell?.companyName && <TableCell align="left">{companyName}</TableCell>}

        {tableCell?.phoneNumber && <TableCell align="left">{phoneNumber}</TableCell>}

        {tableCell?.age && <TableCell align="left">{age}</TableCell>}

        {tableCell?.createdBy && (
          <TableCell align="left">
            <Stack>
              <Typography variant="subtitle2" noWrap>
                {getUserData(createdBy)?.fullName}
              </Typography>
              <Typography noWrap variant="caption">
                {getUserData(createdBy)?.roleName?.replace('-', ' ')}
              </Typography>
            </Stack>
          </TableCell>
        )}

        {tableCell?.createdAt && <TableCell align="left">{fDate(createdAt)}</TableCell>}

        {tableCell?.issuedDate && <TableCell align="left">{fDate(issuedDate)}</TableCell>}

        {tableCell?.dueDate && <TableCell align="left">{fDate(dueDate)}</TableCell>}

        {tableCell?.balance && <TableCell align="left">{balance}</TableCell>}

        {tableCell?.country && <TableCell align="left">{country}</TableCell>}

        {tableCell?.address && <TableCell align="left">{address}</TableCell>}

        {tableCell?.status && (
          <TableCell align="left">
            <Label color={statusColors(status)}>{sentenceCase(status || '')}</Label>
          </TableCell>
        )}

        <TableCell align="right">
          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
            <Iconify icon={'eva:more-vertical-fill'} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {entity === 'invoices' ? (
          <MenuItem
            component={Link}
            color="secondary"
            to={`/invoice/${'edit'}`}
            onClick={() => handleViewData(itemSet)}
          >
            <Iconify width={24} icon={'eva:edit-outline'} sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        ) : (
          // ability.can('update', tableTitle.toLowerCase()) && (
          <CrudForm
            type="update"
            config={config}
            title={UPDATE_ENTITY}
            initialState={itemSet}
            close={handleCloseMenu}
          />
          // )
        )}

        {tableCell?.statusBtn && (
          <StatusForm
            data={itemSet}
            config={config}
            close={handleCloseMenu}
          />
        )}

        {tableCell?.viewBtn &&
          (tableTitle === 'invoice' ? (
            <StyledMenuItem color="warning" component={Link} to={`/invoice/preview/${itemSet?.protId}`}>
              <Iconify width={24} sx={{ mr: 2 }} icon={'mdi:account-eye-outline'} />
              View
            </StyledMenuItem>
          ) : (
            <StyledMenuItem
              color="warning"
              onClick={() => handleViewData(itemSet, contactedFunc(itemSet?.protId, authData))}
              component={Link}
              // to={`/${tableTitle}/view/${itemSet?.protId}`}
            >
              <Iconify width={24} sx={{ mr: 2 }} icon={'mdi:account-eye-outline'} />
              View
            </StyledMenuItem>
          ))}

        {/* {ability.can('remove', tableTitle) && ( */}
        <StyledMenuItem onClick={() => handleDelete(itemSet.id)} color="error">
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </StyledMenuItem>
        {/* )} */}
      </Popover>
    </>
  );
}
