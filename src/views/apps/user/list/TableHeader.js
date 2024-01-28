// ** MUI Imports
import { Stack, Typography } from '@mui/material'
import { ExportBtn } from 'Components/Export'
import { AbilityContext } from 'Layouts/layout/components/acl/Can'
import CreateForm from 'Modules/CrudModule/CrudForm'
import React from 'react'

const TableHeader = props => {
  // ** Props
  const { data, onCreate, initialState, loading, title } = props
  // ** Hook
  const ability = React.useContext(AbilityContext)
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={3} direction="row" alignItems="center">
        <ExportBtn data={data} title={title} />
        {ability.can("create", title.toLowerCase()) && (
          <CreateForm
            title={title}
            loading={loading}
            onCreate={onCreate}
            initialState={initialState}
          />
        )}
      </Stack>
    </Stack>
  )
}

export default TableHeader
