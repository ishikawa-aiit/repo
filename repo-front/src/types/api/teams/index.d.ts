export namespace ApiTeamsTypes {
  export type Team = {
    /** チームID */
    id: number
    /** 名前 */
    name: string
    /** 作成日時 */
    createdAt: string
    /** 更新日時 */
    updatedAt: string
  }

  export type Teams = Team[]
}
