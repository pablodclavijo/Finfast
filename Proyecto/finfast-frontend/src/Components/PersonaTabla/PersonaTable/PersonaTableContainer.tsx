import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Grid from '@mui/material/Grid'
import Button, { ButtonProps } from '@mui/material/Button'
import { Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import { getPersonas, createPersona, updatePersona, deletePersona } from '../../../Services/apiService'
import PersonaTable from './PersonaTable'
import type { PersonaType } from '../../../Types/PersonaType'
import OpenDialogOnElementClick from '../../dialogs/OpenDialogOnElementClick'
import EditPersonaDialog from './EditPersonaDialog'

const buttonProps: ButtonProps = {
  variant: 'contained',
  children: 'Cargar Persona',
}

const PersonasTableContainer = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['personas'],
    queryFn: () => getPersonas(),
  })

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updatePersona,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['personas'] })
      toast.success('Se ha actualizado exitosamente')
    },
    onError: () => {
      toast.error('Ha ocurrido un error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePersona,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['personas'] })
      toast.success('Se ha eliminado exitosamente')
    },
    onError: () => {
      toast.error('Ha ocurrido un error')
    },
  })

  const createMutation = useMutation({
    mutationFn: createPersona,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['personas'] })
      toast.success('Se ha creado exitosamente')
    },
    onError: () => {
      toast.error('Ha ocurrido un error')
    },
  })

  if (error) return 'invalid error'

  const handleEdit = (values: PersonaType) => {
    updateMutation.mutate(values)
  }

  const onSubmit = (values: PersonaType) => {
    createMutation.mutate(values)
  }

  const handleRemove = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className="p-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className="uppercase">
                {`Mantenedor Personas`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={EditPersonaDialog}
                dialogProps={{
                  room: null,
                  isNew: true,
                  onSubmit: onSubmit,
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <PersonaTable
              data={data!}
              isLoading={isLoading}
              onSubmit={handleEdit}
              handleRemove={handleRemove}
            />
            <ToastContainer limit={1} />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PersonasTableContainer
