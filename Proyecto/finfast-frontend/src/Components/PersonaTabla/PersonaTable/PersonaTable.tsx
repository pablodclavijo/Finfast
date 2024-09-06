import React from 'react'
import type { DataGridProps, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { esES } from '@mui/x-data-grid/locales'
import Grid from '@mui/material/Grid'
import PersonaTableActions from './PersonaTableActions'
import type { PersonaType } from '../../../Types/PersonaType'
import QuickSearchToolbar from '../../SearchBar/Searchbar'

interface Props {
  data: PersonaType[]
  isLoading: boolean
  onSubmit: (data: PersonaType) => void
  handleRemove: (id: string) => void
}

const PersonaTable = ({ data, isLoading, onSubmit, handleRemove }: Props) => {
  const columns: GridColDef[] = [
    { 
      field: 'nombre', 
      headerName: 'Nombre', 
      flex: 2, 
      minWidth: 300 
    },
    { 
      field: 'run', 
      headerName: 'RUT', 
      flex: 1, 
      minWidth: 150 
    },
    {
      field: '_',
      headerName: 'Acciones',
      width: 160,
      renderCell: (params: GridRenderCellParams<PersonaType>) => (
        <PersonaTableActions
          personaType={params.row}
          id = {params.row.id}
          onSubmit={onSubmit}
          handleRemove={handleRemove}
        />
      ),
    },
  ]

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        loading={isLoading}
        getRowId={(row) => row.id}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
        density="standard"
        disableRowSelectionOnClick
        autoHeight
        rows={data}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              markup: false,
            },
          },
        }}
        slots={{ toolbar: QuickSearchToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        sx={{
          '& .MuiDataGrid-root': {
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              overflow: 'visible',
              whiteSpace: 'normal',
              lineHeight: 'normal',
              textAlign: 'center',
            },
          },
          '@media (max-width: 600px)': {
            '& .MuiDataGrid-root': {
              fontSize: '0.75rem',
            },
            '& .MuiDataGrid-cell': {
              padding: '8px',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '0.85rem',
            },
          },
        }}
      />
    </div>
  )
}

export default PersonaTable
