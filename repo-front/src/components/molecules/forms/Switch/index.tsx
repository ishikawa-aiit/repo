import { Switch as ChakraSwitch } from '@chakra-ui/react'
import { FC, forwardRef } from 'react'

import { SwitchType } from './type'

export const Switch: FC<SwitchType.Props> = forwardRef<HTMLInputElement>((props, ref) => {
  return <ChakraSwitch ref={ref} {...props} />
})
