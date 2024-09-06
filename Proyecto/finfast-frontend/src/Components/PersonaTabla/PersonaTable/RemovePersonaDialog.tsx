import React, {useEffect} from 'react'
import Dialog from '@mui/material/Dialog'

import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import DialogCloseButton from '../../dialogs/DialogCloseButton'
import type { PersonaType} from '../../../Types/PersonaType'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  persona: PersonaType
  handleRemove: any
}

const RemovePersonaDialog = ({ open, setOpen, persona, handleRemove }: Props) => {
  const handleClose = () => {
    setOpen(false)
  }

  

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h6' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        ¿Eliminar a<br/>{persona?.nombre}?
      </DialogTitle>
      <DialogContent className='overflow-visible pbs-2 sm:pli-16'></DialogContent>

      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button
          variant='contained'
          type='button'
          onClick={e => {
            e.preventDefault()
            handleRemove(persona.id)
            handleClose()
          }}
        >
          Eliminar
        </Button>
        <Button variant='outlined' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemovePersonaDialog
