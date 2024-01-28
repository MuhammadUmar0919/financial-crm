import { getDateRange } from '@core/utils/get-daterange';

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  const total = page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
  return total;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter(filterArgument) {
  const {
    dates,
    value,
    search,
    authData,
    tableData,
    userProfile,
    clientsData,
    serviceValue,
    getComparator,
  } = filterArgument;

  // Stabilize tableData to prevent re-ordering issues during filtering
  const stabilizedThis = tableData?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = getComparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (search || dates.length > 0 || serviceValue) {
    const queryLowered = search.toLowerCase();
    const service = serviceValue.toLowerCase();

    return tableData.filter((item) => {
      const client = userProfile(item.billTo, clientsData);
      const simple = userProfile(item.createdBy, authData);

      const isInDateRange = () => {
        if (!dates.length) return true;

        const [start, end] = dates;
        const range = getDateRange(start, end);
        const invoiceDate = new Date(item.issuedDate);

        return range.some((date) => {
          const rangeDate = new Date(date);
          return (
            invoiceDate.getFullYear() === rangeDate.getFullYear() &&
            invoiceDate.getDate() === rangeDate.getDate() &&
            invoiceDate.getMonth() === rangeDate.getMonth()
          );
        });
      };
      // item.invoiceStatus.toLowerCase() === (item.status.toLowerCase() || item.invoiceStatus.toLowerCase())

      const includesService = (str) => str && str?.toLowerCase().includes(service);
      const includesQuery = (str) => str && str?.toLowerCase().includes(queryLowered);
      const includesServices = (details) =>
        details?.some((detail) => includesService(detail.service));

      const queryMatches = [
        client?.country,
        client?.address,
        client?.fullName,
        client?.companyName,
        client?.companyEmail,
        simple?.fullName,
        simple?.email,
        simple?.username,
        item?.email,
        item?.address,
        item?.fullName,
        item?.username,
        item?.companyName,
        item?.companyEmail,
        item?.serviceName,
        item?.statusName,
        item?.categoryName,
        String(item.id),
        String(item?.total),
        String(item.balance),
        item?.dueDate,
      ].some((field) => includesQuery(field));

      const src =
        includesServices(item?.details) ||
        includesService(item?.address) ||
        includesService(item?.companyName);

      // const tengmisan = (includesQuery(item?.invoiceStatus) === (queryLowered && item?.status.toLowerCase()))

      return queryMatches && (isInDateRange() && queryMatches && src) && (queryMatches || src);
    });
  }

  // Filter based on status
  if (value) {
    if (value === 'all') {
      return tableData;
    } else {
      return tableData.filter((item) => item.status === value);
    }
  }

  return stabilizedThis.map((el) => el[0]);
}
