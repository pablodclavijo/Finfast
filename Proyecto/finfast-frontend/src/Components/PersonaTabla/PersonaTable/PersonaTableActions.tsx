import React from 'react'
import { type ButtonProps } from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import EditPersonaDialog from './EditPersonaDialog'
import RemovePersonaDialog from './RemovePersonaDialog'
import { IconButton } from '@mui/material'
import type { PersonaType} from '../../../Types/PersonaType'
import OpenDialogOnElementClick from '../../dialogs/OpenDialogOnElementClick'

function EditButton() {
  return (
    <Tooltip title='Editar' placement='top' enterDelay={1000} leaveDelay={0} arrow>
      <span className="material-symbols-outlined">
        edit
        </span>
    </Tooltip>
  )
}

function RemoveButton() {
  return (
    <Tooltip title='Eliminar' placement='top' enterDelay={1000} leaveDelay={0} arrow>
      <span className="material-symbols-outlined">
          delete
          </span>
    </Tooltip>
  )
}

const buttonProps: ButtonProps = {
  children: <EditButton />
}

const buttonDeleteProps: ButtonProps = {
  children: <RemoveButton />
}

interface Props {
  id?: string,
  personaType?: PersonaType
  onSubmit: any
  handleRemove: any
}

const PersonaTableActions = ({ personaType, id, onSubmit, handleRemove }: Props) => {
  return (
    <div className='flex flex-row items-center gap-3 w-full h-full'>
      <OpenDialogOnElementClick
        element={IconButton}
        elementProps={buttonProps}
        dialog={EditPersonaDialog}
        dialogProps={{
          id: id,
          onSubmit,
          isNew : false
        }}
      />
      <OpenDialogOnElementClick
        element={IconButton}
        elementProps={buttonDeleteProps}
        dialog={RemovePersonaDialog}
        dialogProps={{
          persona: personaType,
          handleRemove
        }}
      />
    </div>
  )
}

export default PersonaTableActions
