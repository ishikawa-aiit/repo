import { Button as ChakraButton } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { ButtonType } from './type'

export const Button: FC<ButtonType.Props> = memo(({ children, ...props }) => {
  return (
    <ChakraButton data-testid="Button" data-cy="Button" {...props}>
      {children}
    </ChakraButton>
  )
})

Button.defaultProps = {
  colorScheme: 'primary',
  isDisabled: false,
}
