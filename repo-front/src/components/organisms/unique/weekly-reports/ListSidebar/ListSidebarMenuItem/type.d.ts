export namespace ListSidebarMenuItemType {
  export type MenuProps = {
    /** リンクパス(`href`に相当) */
    link: string
    /** リンク名 */
    name: string
  }

  export type MenusProps = MenuProps[]

  export type RootProps = MenuProps & {
    /** カレントページかどうか */
    isCurrent: boolean
  }
}
