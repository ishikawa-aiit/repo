import { ComponentStyleConfig } from '@chakra-ui/theme'

import { Input } from './input'

const borderRadius = {
  field: {
    borderRadius: 'full',
  },
}

export const Select: ComponentStyleConfig = {
  baseStyle: {
    ...borderRadius,
  },
  sizes: Input.sizes,
  variants: Input.variants,
}
