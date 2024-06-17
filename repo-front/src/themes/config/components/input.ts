import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { ComponentStyleConfig } from '@chakra-ui/theme'
import { getColor, mode } from '@chakra-ui/theme-tools'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const borderRadius = {
  field: {
    borderRadius: 'full',
  },
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props
  const fc = 'primary.500'
  const ec = 'red.500'
  return {
    field: {
      bg: 'bg.white',
      _hover: {
        borderColor: mode(`${c}.300`, 'whiteAlpha.400')(props),
      },
      _focus: {
        borderColor: 'primary.500',
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
      _invalid: {
        borderColor: 'red.500',
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
        backgroundColor: 'red.50',
        _focus: {
          borderColor: 'red.500',
          boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
        },
      },
    },
    addon: {
      borderRadius: 'full',
    },
  }
}

const variantFilled = {
  field: {
    _focus: {
      borderColor: 'primary.500',
    },
    _invalid: {
      backgroundColor: 'red.50',
      _focus: {
        borderColor: 'red.500',
      },
    },
  },
  addon: {
    borderRadius: 'full',
  },
}

export const Input: ComponentStyleConfig = {
  sizes: {
    lg: {
      ...borderRadius,
    },
    md: {
      ...borderRadius,
    },
    sm: {
      ...borderRadius,
    },
    xs: {
      ...borderRadius,
    },
  },
  variants: {
    outline: variantOutline,
    filled: variantFilled,
  },
}
