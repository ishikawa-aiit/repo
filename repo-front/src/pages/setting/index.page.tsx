import { NextPage } from 'next'

import { SettingTemplate } from '@/components/templates/setting'
import { ProductConst } from '@/constants'
import { useGetProjectTeams } from '@/hooks/api'

const SettingPage: NextPage = () => {
  const { projectTeams } = useGetProjectTeams()

  return (
    <SettingTemplate
      title={`設定 | ${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="Repo内の各種設定ができるページです。"
      projectTeams={projectTeams}
    />
  )
}
export default SettingPage
