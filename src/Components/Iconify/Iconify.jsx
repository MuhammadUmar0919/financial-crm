import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 24, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} fontSize='1.5rem' sx={{ width, height: width, ...sx }} {...other} />
));

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Iconify;
