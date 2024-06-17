import { MenuAlt2Icon, PencilAltIcon, TemplateIcon, CogIcon } from '@heroicons/react/outline'

export const sidebarMenuItems = [
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

export const bottomSidebarMenuItems = [
  {
    link: '/setting',
    name: '設定',
    icon: <CogIcon />,
  },
]
