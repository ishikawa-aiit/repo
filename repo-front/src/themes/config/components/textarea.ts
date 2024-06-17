import { ComponentStyleConfig } from '@chakra-ui/theme'
import { getColor, mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const borderRadius = {
  borderRadius: '6px',
}

const variantOutline = (props: StyleFunctionProps) => {
  const { colorScheme: c, theme } = props
  const fc = 'primary.500'
  const ec = 'red.500'
  return {
    bg: 'bg.white',
    _hover: {
      borderColor: mode(`${c}.300`, 'whiteAlpha.400')(props),
    },
    _focus: {
      borderColor: 'primary.500',
      boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
    },
    _invalid: {
      backgroundColor: 'red.50',
      _focus: {
        borderColor: 'red.500',
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
    },
  }
}

export const Textarea: ComponentStyleConfig = {
  baseStyle: {
    ...borderRadius,
  },
  sizes: {
    md: {
      ...borderRadius,
    },
    sm: {
      ...borderRadius,
    },
  },
  variants: {
    outline: (props) => {
      return variantOutline(props)
    },
  },
}
