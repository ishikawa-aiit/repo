import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { FC, ReactNode } from 'react'

import { theme } from './config'

type Props = {
  children: ReactNode
}

const { ToastContainer } = createStandaloneToast()

/**
 * Chakra UI テーマプロバイダ
 */
export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
      <ToastContainer />
    </ChakraProvider>
  )
}
