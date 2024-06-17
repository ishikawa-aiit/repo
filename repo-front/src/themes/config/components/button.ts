import { ComponentStyleConfig } from '@chakra-ui/theme'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
    _focus: {
      boxShadow: '0 0 0 3px rgba(72,187,120,0.6)',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
}
