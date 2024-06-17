import { NextPage } from 'next'

import { CreationTemplate } from '@/components/templates/custom-templates/CreationTemplate'
import { ProductConst } from '@/constants'
import { useGetCustomTemplate } from '@/hooks/api'

const TemplatePage: NextPage = () => {
  const { customTemplates } = useGetCustomTemplate('self-created')

  return (
    <CreationTemplate
      title={`テンプレート作成 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="テンプレートを作成することができるページです。"
      customTemplates={customTemplates}
    />
  )
}

export default TemplatePage
