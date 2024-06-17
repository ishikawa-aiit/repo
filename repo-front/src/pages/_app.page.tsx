import { AxiosResponse } from 'axios'
import { AppProps } from 'next/app'

import { showToastOutOfService } from '@/components/molecules'
import { axiosClient, ClientStateProvider, ServerStateProvider } from '@/contexts'
import { useEffectOnce } from '@/hooks/react'
import { ThemeProvider } from '@/themes'
import { ApiPingTypes } from '@/types'

/**
 * APIとの通信確認
 */
export const getPing = async () => {
  const res = await axiosClient.get<ApiPingTypes.Response>('/api/ping').catch(() => {
    showToastOutOfService()
    return {}
  })
  const { data } = res as AxiosResponse<ApiPingTypes.Response>

  return data
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffectOnce(() => {
    ;(async () => {
      await getPing()
    })()
  })

  return (
    <ClientStateProvider>
      <ServerStateProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ServerStateProvider>
    </ClientStateProvider>
  )
}

export default App
