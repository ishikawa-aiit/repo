import { Text } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { ValidationErrorMessageType } from './type'

export const ValidationErrorMessage: FC<ValidationErrorMessageType.Props> = memo(({ message }) => {
  return (
    <Text color="red" mb={4} data-testid="ValidationErrorMessage" data-cy="ValidationErrorMessage">
      {message}
    </Text>
  )
})
