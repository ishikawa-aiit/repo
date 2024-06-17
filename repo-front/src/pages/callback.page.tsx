import { NextPage } from 'next'

import { LoadingTemplate } from '@/components/templates'
import { ProductConst } from '@/constants'
import { usePostAuthLogin } from '@/hooks/api'

const Callback: NextPage = () => {
  usePostAuthLogin()

  return (
    <LoadingTemplate
      title={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
    />
  )
}

export default Callback
