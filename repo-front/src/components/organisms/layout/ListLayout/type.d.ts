import { DefaultLayoutType } from '../DefaultLayout/type'

export namespace ListLayoutType {
  export type Props = DefaultLayoutType.Props & {
    /** メニュー項目  */
    menuItems: ListSidebarMenuItemType.MenusProps
  }
}
