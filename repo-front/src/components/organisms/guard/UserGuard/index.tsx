import { FC, memo, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { UserGuardTypes } from './types'

import { LoadingTemplate } from '@/components/templates'
import { ProductConst } from '@/constants'
import { user as userAtom } from '@/contexts/global/atoms/User'
import { useGetMe } from '@/hooks/api'

export const UserGuard: FC<UserGuardTypes.Props> = memo(({ children }) => {
  const query = useGetMe()
  const [user, setUser] = useRecoilState(userAtom)

  useEffect(() => {
    if (!query.isLoading) {
      setUser(query.me)
    }
  }, [query.isLoading, query.me, setUser])

  if (user) {
    return <>{children}</>
  } else {
    return (
      <LoadingTemplate
        title={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
        description={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      />
    )
  }
})
