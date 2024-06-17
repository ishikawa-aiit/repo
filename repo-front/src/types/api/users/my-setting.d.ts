export namespace ApiPatchMySettingTypes {
  export type Request = {
    /** チームID */
    teamId: number | null
  }

  export type Response = {
    data: {
      id: number
      user: {
        id: number
        name: string
        createdAt: string
        updatedAt: string
      }
      team: {
        id: number
        name: string
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    }
  }
}
