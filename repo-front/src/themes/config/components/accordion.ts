import { ComponentStyleConfig } from '@chakra-ui/theme'
import { SystemStyleObject } from '@chakra-ui/theme-tools'

const baseStyleButton: SystemStyleObject = {
  padding: '16px',
  _focus: {
    boxShadow: '0 0 0 3px rgba(72,187,120,0.6)',
  },
}

export const Accordion: ComponentStyleConfig = {
  baseStyle: {
    button: baseStyleButton,
  },
}
