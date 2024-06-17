import { SettingTypes, UserTypes, MetaType } from '@/components/types'

export namespace SettingType {
  export type Props = {
    projectTeams: SettingTypes.ProjectTeamProps[]
    me?: UserTypes.User
  } & MetaType.Props

  export type FormElementsPropType = {
    /** 項目名 */
    name: keyof Inputs
    /** 表示用の項目名 */
    label: string
  }

  export type Inputs = {
    /** チームID */
    teamId: number | null
  }

  export type SlackScopeType = [
    /** slack認証で認可を求めるscope */
    scope: string,
  ]
}
