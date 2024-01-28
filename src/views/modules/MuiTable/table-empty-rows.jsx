import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { EmptyData } from 'Components/EmptyData';

// ---------------------------------------------------------------------- //

export default function TableEmptyRows({ height, emptyRows, tableData, isNotFound }) {
  if (isNotFound || tableData?.length) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9}>
        <EmptyData message="No columns" />
      </TableCell>
    </TableRow>
  );
}

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};
