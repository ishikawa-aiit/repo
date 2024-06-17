import { ComponentStyleConfig } from '@chakra-ui/theme'

import { Input } from './input'

const borderRadius = {
  field: {
    borderRadius: 'full',
  },
}

export const NumberInput: ComponentStyleConfig = {
  baseStyle: {
    ...borderRadius,
    stepperGroup: {
      right: '9px',
    },
    stepper: {
      border: 'none',
    },
  },
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
    ...Input.variants,
  },
}
