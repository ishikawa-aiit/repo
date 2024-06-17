import { MenuAlt2Icon, PencilIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Sidebar } from '.'

export default {
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

const menuItems = [
  {
    link: '/sample1',
    name: 'リンク1',
    icon: <PencilIcon />,
  },
  {
    link: '/sample2',
    name: 'リンク2',
    icon: <MenuAlt2Icon />,
  },
]

export const SidebarUsage: ComponentStoryObj<typeof Sidebar> = {
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
        component: 'サイドバーのコンポーネントです（asideタグに相当）',
      },
      source: {
        code: `
import { MenuAlt2Icon, PencilIcon } from '@heroicons/react/outline'

const menuItems = [
  {
    /** リンクパス(hrefに相当) */
    link: '/sample1',
    /** リンク名 */
    name: 'リンク1',
    /** リンクのアイコン */
    icon: <PencilIcon />,
  },
  {
    link: '/sample2',
    name: 'リンク2',
    icon: <MenuAlt2Icon />,
  },
]

<Sidebar menuItems={menuItems} />
        `,
        language: 'tsx',
      },
    },
  },
}
