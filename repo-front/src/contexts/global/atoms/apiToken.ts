import { atom, AtomEffect, DefaultValue } from 'recoil'

import { AtomKeys } from './keys'

/**
 * Atom の値を LocalStorage に保存するための Effect
 * @see {@link https://zenn.dev/longbridge/articles/0182f2dc2b801f#atomの値をローカルストレージに保存する}
 */
const localStorageEffect: <T>(key: string) => AtomEffect<T> = (key: string) => {
  return ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') {
      return
    }

    const savedValue = localStorage.getItem(key)

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }
}

export const apiToken = atom<string | undefined>({
  key: AtomKeys.API_TOKEN_ATOM,
  default: undefined,
  effects_UNSTABLE: [localStorageEffect<string | undefined>(AtomKeys.API_TOKEN_ATOM)],
})
