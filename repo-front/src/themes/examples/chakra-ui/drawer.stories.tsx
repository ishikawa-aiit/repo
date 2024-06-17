/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, DrawerContent, DrawerOverlay, Button } from '@chakra-ui/react'
import React from 'react'

export default {
  title: 'Chakra UI Components / Overlay / Drawer',
}

export const Basic = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button
        onClick={() => {
          return setOpen(!open)
        }}
      >
        Open
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => {
          return setOpen(false)
        }}
      >
        <DrawerOverlay />
        <DrawerContent></DrawerContent>
      </Drawer>
    </>
  )
}
