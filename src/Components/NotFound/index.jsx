import React from 'react'
import { Paper, Typography } from '@mui/material'

function NotFoundData({ text }) {
  return (
    <Paper
          sx={{
            boxShadow: 'unset',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Not found
          </Typography>

          <Typography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{text}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Paper>
  )
}

export default NotFoundData