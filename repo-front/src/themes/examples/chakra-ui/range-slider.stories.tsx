/* eslint-disable @typescript-eslint/no-explicit-any */
import { RangeSlider, RangeSliderFilledTrack, RangeSliderTrack, RangeSliderThumb } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Range Slider',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  return (
    <RangeSlider onChangeEnd={console.log}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
