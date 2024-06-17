/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Data Display / Stat',
}

/**
 * Default Stat component
 */

export const Basic = () => {
  return (
    <Stack spacing="5">
      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>Feb 12 - Feb 28</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          23.36%
        </StatHelpText>
      </Stat>
    </Stack>
  )
}
