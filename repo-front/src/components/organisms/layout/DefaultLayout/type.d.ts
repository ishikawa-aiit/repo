import { LayoutProps } from '@chakra-ui/react'

import { ReactType, MetaType } from '@/components/types'

export namespace DefaultLayoutType {
  export type Props = ReactType.ChildProps &
    MetaType.Props & {
      /** ページ見出し */
      heading: string
      /** インナーコンテナの幅 */
      innerWidth?: LayoutProps['w']
    }
}
