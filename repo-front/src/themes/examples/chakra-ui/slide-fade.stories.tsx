/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBoolean } from '@chakra-ui/hooks'
import { SlideFade, SlideFadeProps, Button } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Transition / Slide Fade',
}

const Example = (props: SlideFadeProps) => {
  const [open, { toggle }] = useBoolean(false)

  return (
    <>
      <Button onClick={toggle}>Toggle Slide</Button>
      <SlideFade in={open} {...props}>
        <div
          style={{
            padding: 20,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
      </SlideFade>
    </>
  )
}

export const Basic = () => {
  return <Example />
}
