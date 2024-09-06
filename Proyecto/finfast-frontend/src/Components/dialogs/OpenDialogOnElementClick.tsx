import React from 'react'
import { useState } from 'react'


const OpenDialogOnElementClick = (props: any) => {
  const { element: Element, dialog: Dialog, elementProps, dialogProps } = props

  const [open, setOpen] = useState(false)

  const { onClick: elementOnClick, ...restElementProps } = elementProps

  const handleOnClick = (e: MouseEvent) => {
    elementOnClick && elementOnClick(e)
    setOpen(true)
  }

  return (
    <>
      <Element onClick={handleOnClick} {...restElementProps} />
      <Dialog open={open} setOpen={setOpen} {...dialogProps} />
    </>
  )
}

export default OpenDialogOnElementClick
