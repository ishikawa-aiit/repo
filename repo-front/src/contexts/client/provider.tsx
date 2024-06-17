import { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

type Props = {
  children: ReactNode
}

/**
 * recoilクライアントステートプロバイダ
 *
 * @returns recoilのルートコンポーネントを返す
 */
export const ClientStateProvider: FC<Props> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
