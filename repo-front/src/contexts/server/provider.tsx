import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Toast } from '@/components/molecules'

/**
 * Queryクライアントのオプション
 */
export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
}

const queryClient = new QueryClient(queryClientOptions)

/**
 * サーバーステート用プロバイダ
 *
 * @returns Raect Queryのクライアントプロバイダ（Devツールを含む）
 */
export const ServerStateProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <Toast>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Toast>
  )
}
