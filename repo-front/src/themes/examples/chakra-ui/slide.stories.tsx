/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from '@chakra-ui/hooks'
import { Slide, Button, Box } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Transition / Slide',
  decorators: [
    (story: Function) => {
      return <chakra.div>{story()}</chakra.div>
    },
  ],
}

const SlideExample = (_props: any) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Button onClick={onToggle}>Toggle Slide</Button>
      <Slide direction="bottom" in={isOpen}>
        <Box p="40px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.</Box>
      </Slide>
    </>
  )
}

export const Basic = () => {
  return <SlideExample />
}
