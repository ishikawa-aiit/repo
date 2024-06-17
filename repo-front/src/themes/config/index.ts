import { extendTheme, withDefaultColorScheme, withDefaultSize } from '@chakra-ui/react'

import { components } from './components'
import { colorMode, colors } from './foundations'
import { styles } from './styles'

/**
 * Chakra UI テーマカスタマイズオブジェクト
 */
export const theme = extendTheme(
  {
    config: {
      colorMode,
    },
    styles,
    colors,
    ...components,
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
  withDefaultSize({ size: 'md' }),
)
