/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCounter, Button, Stack } from '@chakra-ui/react'
import * as React from 'react'

export default {
  title: 'Chakra UI System / Counter',
}

export const Basic = () => {
  const [val, setVal] = React.useState<any>('8...4,.4')
  const counter = useCounter({
    value: val,
    // defaultValue: "8...4,.4",
    max: 10,
    min: 0,
    // step: 0.1,
    keepWithinRange: false,
    precision: 4,
    onChange: (next) => {
      return setVal(next)
    },
  })

  return (
    <div>
      <div>
        <pre>
          {JSON.stringify(
            {
              value: counter.value,
              valueAsNumber: counter.valueAsNumber,
              outOfRange: counter.isOutOfRange,
            },
            null,
            2,
          )}
        </pre>
      </div>
      <br />
      <Stack direction="row" spacing="3">
        <Button
          colorScheme="teal"
          onClick={() => {
            return counter.increment()
          }}
        >
          Increment
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            return counter.decrement()
          }}
        >
          Decrement
        </Button>
        <input
          value={counter.value}
          style={{ background: 'transparent' }}
          onChange={(e) => {
            return counter.update(e.target.value)
          }}
        />
      </Stack>
    </div>
  )
}
