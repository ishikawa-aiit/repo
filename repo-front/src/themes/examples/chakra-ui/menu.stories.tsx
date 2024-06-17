/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@chakra-ui/button'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import * as React from 'react'

const words = [
  'About Visual Studio Code',
  'Check for updates',
  'Preferences',
  'Services',
  'Hide Visual Studio Code',
  'Show All',
]

const logEvents = (e: React.MouseEvent | React.KeyboardEvent | undefined) => {
  if (e && e.persist) {
    // Stop React from complaining about non-persisting events.
    e.persist()
  }
  console.log(e)
}

export const Basic = () => {
  return (
    <div style={{ minHeight: 4000, paddingTop: 500 }}>
      <Menu>
        <MenuButton as={Button}>Open Wakanda menu</MenuButton>
        <MenuList>
          {words.map((word) => {
            return (
              <MenuItem key={word} onClick={logEvents}>
                {word}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
    </div>
  )
}
