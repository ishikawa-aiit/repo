import { Textarea as ChakraTextarea } from '@chakra-ui/react'
import { FC, forwardRef } from 'react'
import ResizeTextarea from 'react-textarea-autosize'

import { TextareaType } from './type'

export const Textarea: FC<TextareaType.Props> = forwardRef<HTMLTextAreaElement>((props, ref) => {
  return <ChakraTextarea overflow="hidden" resize="none" ref={ref} as={ResizeTextarea} {...props} />
})
