export namespace ApiUsersTypes {
  export type User = {
    /** ユーザーID */
    id: number
    /** 名前 */
    name: string
    /** 作成日時 */
    createdAt: string
    /** 更新日時 */
    updatedAt: string
    /** チーム */
    team: {
      /** チームID */
      id: number
      /** チーム名 */
      name: string
      /** 作成日時 */
      createdAt: string
      /** 更新日時 */
      updatedAt: string
    } | null
    /** slack設定の有無 */
    hasSlackConnection: boolean
  }

  export type UserResponse = {
    data: User
  }
}
