/**
 * 所属PT設定
 */
export namespace SettingTypes {
  export type DisplayTeam = {
    id: number | null
    name: string
  }
  export type ProjectTeamProps = Pick<DisplayTeam, 'id' | 'name'>
  export type ProjectTeamsProps = ProjectTeamProps[]
}
