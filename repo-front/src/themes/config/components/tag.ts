import { ComponentStyleConfig } from '@chakra-ui/theme'

const containerStyle = {
  borderRadius: 'full',
}

export const Tag: ComponentStyleConfig = {
  baseStyle: {
    container: containerStyle,
  },
  variants: {
    subtle: containerStyle,
    solid: containerStyle,
    outline: containerStyle,
  },
  sizes: {
    sm: {
      container: containerStyle,
    },
    md: {
      container: containerStyle,
    },
    lg: {
      container: containerStyle,
    },
  },
  defaultProps: {
    variant: 'solid',
  },
}
