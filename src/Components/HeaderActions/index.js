// Vaqtinchalik component keyinchalik tablelar bitta tablega birlashishi kerak!
import { 
    Box, 
    Select, 
    MenuItem,
    InputLabel, 
    FormControl, 
} from '@mui/material'
import React from 'react'
import { RoleManagement } from 'Utils/RoleManagement'
import { SearchInput } from '@core/components/custom-input'

function HeaderAction({
    field
}) {
  return (
    <Box 
        sx={{ 
            p: 5, 
            pb: 3, 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'start', 
            justifyContent: 'space-between' 
        }}
    >
        <ExportBtn 
            data={data} 
            title="General staff" 
        />
        <Box 
            sx={{ 
                gap: '20px', 
                display: 'flex', 
                alignItems: 'center',
            }}
        >
            <SearchInput 
                type="Role"
                size="small"
                value={value} 
                setValue={setValue} 
                onChange={handleFilter} 
            />
            <FormControl 
                size='small' 
                sx={{ width: '50%' }}
            >
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

export default HeaderAction