import { Portal } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Others / Portal',
}

export const Basic = () => {
  return (
    <>
      <p>Welcome</p>
      <Portal>This text has been portaled</Portal>
    </>
  )
}
