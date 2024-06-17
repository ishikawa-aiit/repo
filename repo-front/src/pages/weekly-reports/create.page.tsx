import { NextPage } from 'next'
import { useQueryClient } from 'react-query'

import { CreationTemplate } from '@/components/templates/weekly-reports/CreationTemplate'
import { ProductConst } from '@/constants'
import { useClientWithToken } from '@/hooks'
import { getWeeklyReports, useGetCustomTemplate, useGetRequirements } from '@/hooks/api'
import { QueryKeys } from '@/types'

const CreatePage: NextPage = () => {
  const queryClient = useQueryClient()
  const client = useClientWithToken()
  const { customTemplates } = useGetCustomTemplate()
  const { requirements } = useGetRequirements()

  if (typeof window !== 'undefined') {
    ;(async () => {
      await queryClient.prefetchQuery(QueryKeys.GET_WEEKLY_REPORTS, async () => {
        return await getWeeklyReports(client)
      })
    })()
  }

  return (
    <CreationTemplate
      title={`週報作成 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="週報を作成することができるページです。"
      customTemplates={customTemplates}
      requirements={requirements}
    />
  )
}

export default CreatePage
