/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBoolean } from '@chakra-ui/hooks'
import { SlideFade, Button } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Others / Transition / Offset Slide',
}

export const Basic = () => {
  const [open, { toggle }] = useBoolean(false)

  return (
    <>
      <Button onClick={toggle}>Toggle Slide</Button>
      <SlideFade in={open} offsetY={-8} reverse={false}>
        <div
          style={{
            padding: 20,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
      </SlideFade>
    </>
  )
}
