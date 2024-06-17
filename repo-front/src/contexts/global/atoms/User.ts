import { atom } from 'recoil'

import { AtomKeys } from './keys'

import { UserTypes } from '@/components/types/user'

export const user = atom<UserTypes.User | undefined>({
  key: AtomKeys.USER_ATOM,
  default: undefined,
})
