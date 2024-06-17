/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider, SliderThumb, SliderTrack, SliderFilledTrack, Stack, Heading } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Slider',
  decorators: [
    (story: Function) => {
      return <chakra.div>{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  return (
    <Stack spacing="5">
      <Slider defaultValue={10} min={0} max={60} step={5} onChangeStart={console.log} onChangeEnd={console.log}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Heading>orientation=&quot;vertical&quot; (minHが必要があるかもしれない)</Heading>
      <Slider defaultValue={30} min={0} max={60} step={5} orientation="vertical" minH="60">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Stack>
  )
}
