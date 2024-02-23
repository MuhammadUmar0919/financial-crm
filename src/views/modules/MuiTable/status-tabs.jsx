// @mui import
import { TabList } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
// components import
import Label from '@/@core/components/label';
// change case import
import { sentenceCase } from 'change-case';
// utils import
import { statusColors } from '@/Utils/statusColors';

export const StatusTabs = ({ data, total, value, onChange }) => {
  const labelValue = (label) => {
    return (
      <>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Typography pr={1} noWrap variant="subtitle2" sx={{ color: 'inherit' }}>
            {sentenceCase(label)}
          </Typography>
          <Label
            color={statusColors(label)}
            variantMode={label === 'all' && 'all'}
            variant={label === value ? 'filled' : 'soft'}
            sx={{
              display: `${total(label) >= 0 ? 'flex' : 'none'}`,
            }}
          >
            {total(label)}
          </Label>
        </Box>
      </>
    );
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label={labelValue('All')} value="all" />

        {data?.map(({ statusName }, idx) => (
          <Tab key={idx} label={labelValue(statusName)} value={statusName} />
        ))}
      </TabList>
    </Box>
  );
};
