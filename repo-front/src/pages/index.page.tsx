import { NextPage } from 'next'

import { HomeTemplate } from '@/components/templates'
import { ProductConst } from '@/constants'

const Home: NextPage = () => {
  return (
    <HomeTemplate
      title={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
      description="AIIT（東京都立産業技術大学院大学）学生のPBL週報作成を効率化。manaba上での週報作成を最短時間で完了できます。"
    />
  )
}

export default Home
