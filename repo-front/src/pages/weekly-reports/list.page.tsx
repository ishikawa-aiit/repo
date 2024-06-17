import { NextPage } from 'next'

import { ListTemplate } from '@/components/templates/weekly-reports/ListTemplate'
import { ProductConst } from '@/constants'
import { useGetWeeklyReports } from '@/hooks/api'

const ListPage: NextPage = () => {
  const { isLoading, isError, weeklyReportItems } = useGetWeeklyReports()

  return (
    <ListTemplate
      title={`週報一覧 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="作成した週報を一覧できるページです。"
      isLoading={isLoading}
      isError={isError}
      weeklyReportItems={weeklyReportItems}
    />
  )
}

export default ListPage
