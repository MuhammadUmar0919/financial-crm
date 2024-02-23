import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import NotFoundData from '@/Components/NotFound';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------


export default function TableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
        <NotFoundData text={query} />
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
