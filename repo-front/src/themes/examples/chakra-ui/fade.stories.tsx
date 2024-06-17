/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBoolean } from '@chakra-ui/hooks'
import { Fade, FadeProps, Button } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Transition / Fade',
}

const Example = (props: FadeProps) => {
  const [open, { toggle }] = useBoolean(false)
  return (
    <>
      <Button onClick={toggle}>Toggle Fade</Button>
      <Fade in={open} {...props}>
        <div
          style={{
            padding: 20,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
      </Fade>
    </>
  )
}

export const Basic = () => {
  return <Example />
}
