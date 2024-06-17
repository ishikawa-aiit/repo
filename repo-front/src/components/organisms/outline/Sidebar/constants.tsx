import { MenuAlt2Icon, PencilAltIcon, TemplateIcon, CogIcon } from '@heroicons/react/outline'

import { SidebarMenuItemType } from './SidebarMenuItem/type'

/** サイドバー項目 */
export const menuItems: SidebarMenuItemType.MenuItems = [
  {
    link: '/weekly-reports/create',
    name: '週報作成',
    icon: <PencilAltIcon />,
  },
  {
    link: '/weekly-reports/list',
    name: '週報一覧',
    icon: <MenuAlt2Icon />,
  },
  {
    link: '/custom-templates/create',
    name: 'テンプレート作成・編集',
    icon: <TemplateIcon />,
  },
]

/** 画面下部に表示するサイドバー項目  */
export const bottomMenuItems: SidebarMenuItemType.MenuItems = [
  {
    link: '/setting',
    name: '設定',
    icon: <CogIcon />,
  },
]
