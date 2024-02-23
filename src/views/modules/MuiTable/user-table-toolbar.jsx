import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Box,
  Stack,
  Button,
  Chip,
  MenuItem,
  Grid,
  TextField,
} from '@mui/material';
// component
import Iconify from '@/@core/components/iconify';
import { SearchInput } from '@/@core/components/custom-input';
import { regionsData, servicesData } from '@/Data';
import React from 'react';
// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
// ** Styled Components
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker';
import { selectSearchedItems } from '@/Redux/crud/selectors';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '@/Hooks/useDebounce';
import { crud } from '@/Redux/crud/actions';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  // height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.spacing(6)} !important`,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  gap: '8px',
  display: 'flex',
  padding: '8px',
  overflow: 'hidden',
  borderRadius: '8px',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundImage: 'none',
  color: 'rgb(33, 43, 54)',
  border: '1px dashed rgba(145, 158, 171, 0.16)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
}));

// ---------------------------------------------------------------------- //

/* eslint-disable */
const CustomDateInput = React.forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return (
    <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
  );
});

/* eslint-enable */

export default function UserListToolbar({ toolbarArguments }) {
  const {
    dates,
    found,
    entity,
    setValue,
    setDates,
    filterName,
    handleClear,
    statusLabel,
    numSelected,
    endDateRange,
    searchConfig,
    onFilterName,
    serviceValue,
    handleService,
    startDateRange,
    handleOnChangeRange,
  } = toolbarArguments;
  const dispatch = useDispatch();
  const { result, isLoading, isSuccess } = useSelector(selectSearchedItems);
  const { displayLabels, searchFields, outputValue = '_id' } = searchConfig;
  const [selectOptions, setOptions] = React.useState([]);
  const [currentValue, setCurrentValue] = React.useState(undefined);

  const isSearching = React.useRef(false);

  const [searching, setSearching] = React.useState(false);

  const [valToSearch, setValToSearch] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const companyTerm = entity === 'clients';
  const invoiceTerm = entity === 'invoice';
  const addressTerm = entity === 'employees' || entity === 'admins';
  const tabCheck = statusLabel.toLowerCase() !== 'all' && (found || true);
  const shouldShowResults = tabCheck || filterName || serviceValue || dates.length > 0;
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(valToSearch);
    },
    500,
    [valToSearch]
  );

  React.useEffect(() => {
    if (debouncedValue != '') {
      const options = {
        q: debouncedValue,
        fields: searchFields,
      };
      dispatch(crud.search({ entity, options }));
    }
    return () => {
      cancel();
    };
  }, [debouncedValue]);

  React.useEffect(() => {
    if (isSearching.current) {
      if (isSuccess) {
        setOptions(result);
      } else {
        setSearching(false);
        setCurrentValue(undefined);
        setOptions([]);
      }
    }
  }, [isSuccess, result]);

  return (
    <DatePickerWrapper>
      <StyledRoot
        sx={{
          ...(numSelected > 0 && {
            bgcolor: 'primary.mains',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Grid container spacing={6} justifyContent="space-between">
            {invoiceTerm && (
              <>
                <Grid item xs={12} md={4} lg={2.5}>
                  <TextField
                    select
                    fullWidth
                    value={serviceValue}
                    label="Invoice service"
                    onChange={handleService}
                  >
                    <MenuItem value="">none</MenuItem>
                    {servicesData.map((option, index) => (
                      <MenuItem key={index} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={8} lg={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomDateInput
                        dates={dates}
                        setDates={setDates}
                        label="Invoice Date"
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </Grid>
              </>
            )}
            {companyTerm && (
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  select
                  fullWidth
                  value={serviceValue}
                  label="Invoice company"
                  onChange={handleService}
                >
                  {servicesData.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            {addressTerm && (
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  select
                  fullWidth
                  value={serviceValue}
                  label="Employee region"
                  onChange={handleService}
                >
                  {regionsData.map(({ id, name_uz }) => (
                    <MenuItem key={id} value={name_uz}>
                      {name_uz}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              md={!invoiceTerm && 6}
              lg={!invoiceTerm ? (companyTerm || addressTerm ? 8 : 3.5) : 3.5}
            >
              <SearchInput
                fullWidth
                type="User"
                size="large"
                value={filterName}
                setValue={setValue}
                onChange={onFilterName}
              />
            </Grid>
          </Grid>
        )}
        {
          numSelected > 0 && (
            <Tooltip title="Delete">
              <IconButton>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
          )
          // <Tooltip title="Filter list">
          //   <IconButton>
          //     <Iconify icon="ic:round-filter-list" />
          //   </IconButton>
          // </Tooltip>
        }
      </StyledRoot>
      {shouldShowResults && (
        <Stack sx={{ mb: 2.5, mx: 6 }} direction="column" spacing={2}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography
              sx={{
                color: 'text.primary',
                fontWeight: 'fontWeightBold',
              }}
              gutterBottom
              variant="subtitle1"
            >
              {found}
            </Typography>

            <Typography gutterBottom variant="subtitle1" sx={{ color: 'text.secondary' }}>
              results found
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="center">
            {tabCheck && (
              <StyledBox>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Status:
                </Typography>
                <Chip
                  size="small"
                  color="secondary"
                  label={statusLabel}
                  onDelete={() => handleClear('tab')}
                />
              </StyledBox>
            )}
            <Tooltip disableFocusListener title="Clear" display="block">
              <Button
                variant="text"
                onClick={() => handleClear()}
                startIcon={<Iconify width={20} icon="eva:trash-2-fill" />}
                sx={{
                  fontWeight: 'bold',
                  color: 'error.main',
                  textTransform: 'unset',
                }}
              >
                Clear
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      )}
    </DatePickerWrapper>
  );
}

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
