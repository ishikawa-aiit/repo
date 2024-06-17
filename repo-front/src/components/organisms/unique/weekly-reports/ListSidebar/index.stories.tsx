import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { ListSidebar } from '.'

export default {
  component: ListSidebar,
} as ComponentMeta<typeof ListSidebar>

const menuItems = [
  {
    link: '0',
    name: '4/4 ~ 4/9',
  },
  {
    link: '1',
    name: '4/11 ~ 4/16',
  },
]

export const ListSidebarUsage: ComponentStoryObj<typeof ListSidebar> = {
  storyName: '仕様',
  argTypes: {
    menuItems: {
      defaultValue: menuItems,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'リストサイドバーのコンポーネントです（asideタグに相当）',
      },
      source: {
        code: `
          const menuItems = [
            {
              /** リンクパス(hrefに相当) */
              link: '0',
              /** リンク名 */
              name: '4/4 ~ 4/9',
            },
            {
              /** リンクパス(hrefに相当) */
              link: '1',
              /** リンク名 */
              name: '4/11 ~ 4/16',
            },
          ]

          <Sidebar menuItems={menuItems} />
        `,
        language: 'tsx',
      },
    },
  },
}
