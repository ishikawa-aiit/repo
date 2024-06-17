export namespace SidebarMenuItemType {
  export type MenuItem = {
    /** リンクパス(`href`に相当) */
    link: string
    /** リンク名 */
    name: string
    /** リンクのアイコン */
    icon: ReactElement
  }

  export type MenuItems = MenuItem[]

  export type RootProps = MenuItem & {
    /** カレントページかどうか */
    isCurrent: boolean
  }
}
