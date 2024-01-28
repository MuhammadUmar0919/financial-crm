// ** React Import
import React from 'react'
import { Link } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
// context import
import { AbilityContext } from 'Layouts/layout/components/acl/Can'
import Iconify from 'Components/Iconify'
import { SearchInput } from '@core/components/custom-input'

const TableHeader = props => {
  // ** Props
  const { value, setValue, selectedRows, handleFilter } = props
  // ** Hook
  const ability = React.useContext(AbilityContext)
  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Select
        size='small'
        // displayEmpty
        sx={{ mr: 4, mb: 2 }}
        disabled={selectedRows && selectedRows.length === 0}
        renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
      >
        <MenuItem disabled>Actions</MenuItem>
        <MenuItem value='Delete'>Delete</MenuItem>
        <MenuItem value='Edit'>Edit</MenuItem>
        <MenuItem value='Send'>Send</MenuItem>
      </Select>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchInput 
          size="small"
          value={value} 
          type="Invoice"
          setValue={setValue} 
          onChange={handleFilter} 
          sx={{ mr: 4, mb: 2, maxWidth: '220px' }}
        />
        
        {ability.can("create", "invoice") && (
          <Button 
            sx={{ mb: 2 }} 
            component={Link} 
            variant='contained' 
            to='/invoice/create'
            startIcon={<Iconify width={20} icon="eva:plus-fill" />}
          >
            Create Invoice
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
