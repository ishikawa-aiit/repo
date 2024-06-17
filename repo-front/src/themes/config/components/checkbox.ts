import { ComponentStyleConfig } from '@chakra-ui/theme'

export const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      _focus: {
        boxShadow: '0 0 0 3px rgba(72,187,120,0.6)',
      },
    },
  },
  defaultProps: {
    colorScheme: 'primary',
  },
}
