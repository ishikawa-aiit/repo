import { ApiTeamsTypes } from '@/types'
import { ApiUsersTypes } from '@/types/api/users/me'

/**
 * ユーザー
 */
export namespace UserTypes {
  export type User = Pick<ApiUsersTypes.User, 'name' | 'hasSlackConnection'> & {
    team: Pick<ApiTeamsTypes.Team, 'id' | 'name'> | null
  }
}
