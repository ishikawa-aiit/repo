import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { queryClientOptions } from '@/contexts/'
import { RecoilRoot } from 'recoil'

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {}
})

/**
 * テスト用のQueryクライアントを作成
 * @returns React Queryクライアント
 */
 export const generateTestQueryClient = () => {
  return new QueryClient(queryClientOptions)
}

/**
 * React Queryプロバイダのラッパー
 *
 * @remarks
 * テスト毎に異なるReact Queryプロバイダでラップすることができます
 *
 * @param uiElement - Reactコンポーネント
 * @param client    - React Queryクライアント
 * @returns React QueryプロバイダにラップされたReactコンポーネント
 */
export const renderWithQueryClient = (uiElement: ReactElement, client?: QueryClient) => {
  const queryClient = client ?? generateTestQueryClient()

  const ui = (uiElement: ReactElement) => {
    return <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {uiElement}
      </RecoilRoot>
    </QueryClientProvider>
  }

  const { rerender, ...result } = render(ui(uiElement))

  return {
    ...result,
    rerender: (rerenderUi: ReactElement) => rerender(ui(rerenderUi)),
  }
}

// ジェネリクスの記法と JSX の記法が被るため、そのままジェネリクスを書くとパースエラーになる。
// そのため、 `extends any` を追加することでエラーになるのを回避している。

/**
 * React Queryプロバイダのラッパー（カスタムフック用）
 *
 * @remarks
 * テスト毎に異なるReact Queryプロバイダでラップすることができます
 *
 * @param client - React Queryクライアント
 * @param hook   - カスタムフック
 */
 export const renderHookWithQueryClient = <TResult extends any = any>(hook: Function, client?: QueryClient) => {
  const queryClient = client ?? generateTestQueryClient()

  const wrapper = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </QueryClientProvider>
  }

  return renderHook<any, TResult>(() => {
      return hook()
    },
    { wrapper },
  )
}
