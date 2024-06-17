import { NextPage } from 'next'

import { LoadingTemplate } from '@/components/templates'
import { ProductConst } from '@/constants'
import { usePostMySettingSlack } from '@/hooks/api'

const SlackCallback: NextPage = () => {
  usePostMySettingSlack()

  return (
    <LoadingTemplate
      title={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
    />
  )
}

export default SlackCallback
