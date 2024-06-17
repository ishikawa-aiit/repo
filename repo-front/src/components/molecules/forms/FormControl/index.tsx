import { FormControl as ChakraFormControl, FormLabel, Text, Stack } from '@chakra-ui/react'
import React, { FC, memo } from 'react'

import { FormControlType } from './type'

import { ValidationErrorMessage } from '@/components/molecules'

export const FormControl: FC<FormControlType.Props> = memo(
  ({ children, label, isRequired = true, isInline = false, error, ...controlProps }) => {
    return (
      <ChakraFormControl data-testid="FormControl" isInvalid={!!error} {...controlProps}>
        <FormLabel>
          <Stack
            direction={isInline ? 'row' : 'column'}
            spacing={4}
            alignItems={isInline ? 'center' : 'left'}
            shouldWrapChildren={true}
          >
            <LabelString isRequired={isRequired}>{label}</LabelString>
            {React.cloneElement(children, { mt: 2, required: isRequired })}
          </Stack>
        </FormLabel>
        {error && <ValidationErrorMessage message={`${error.message as string}`} />}
      </ChakraFormControl>
    )
  },
)

const LabelString: FC<FormControlType.LabelProps> = ({ children, isRequired }) => {
  const requiredSymbolProps = isRequired ? { _after: { content: '"*"', color: 'accent.500', ml: 2 } } : {}

  return (
    <Text as="span" {...requiredSymbolProps}>
      {children}
    </Text>
  )
}
