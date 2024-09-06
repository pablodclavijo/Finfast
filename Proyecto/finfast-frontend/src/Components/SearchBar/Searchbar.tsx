import React from 'react'
import { Box } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'

export default function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        m: 4
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  )
}
