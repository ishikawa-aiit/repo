import { Box } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { MainType } from './type'

export const Main: FC<MainType.Props> = memo(({ children, ...otherProps }) => {
  return (
    <Box data-testid="Main" data-cy="Main" as="main" w="100%" h="100%" overflow="hidden" {...otherProps}>
      {children}
    </Box>
  )
})
