// ** MUI Imports
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import { ExportBtn } from 'Components/Export'
import { RoleManagement } from 'Utils/RoleManagement'
import { SearchInput } from '@core/components/custom-input'

const TableHeader = props => {
  // ** Props
  const { data, role, handleRoleChange, handleFilter, value, setValue } = props
  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'start', justifyContent: 'space-between' }}>
      <ExportBtn data={data} title="General staff" />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <SearchInput 
          type="Role"
          size="small"
          value={value} 
          setValue={setValue} 
          onChange={handleFilter} 
        />
        <FormControl size='small' sx={{ width: '50%' }}>
          <InputLabel id='role-select'>Select Role</InputLabel>
          <Select
            size='small'
            value={role}
            id='select-role'
            label='Select Role'
            labelId='role-select'
            onChange={handleRoleChange}
            inputProps={{ placeholder: 'Select Role' }}
          >
            <MenuItem value=''>All</MenuItem>
            {RoleManagement().map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
