import { renderHook } from '@testing-library/react-hooks'

import { useEffectOnce } from '.'

const mockEffectCleanup = jest.fn()
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup)

describe('useEffectOnce', () => {
  it('コールバックが1回だけ実行される', () => {
    const { rerender } = renderHook(() => {
      return useEffectOnce(mockEffectCallback)
    })

    expect(mockEffectCallback).toHaveBeenCalledTimes(1)

    rerender()
    expect(mockEffectCallback).toHaveBeenCalledTimes(1)
  })

  it('アンマウント時にクリーンアップされる', () => {
    const { unmount } = renderHook(() => {
      return useEffectOnce(mockEffectCallback)
    })

    unmount()
    expect(mockEffectCleanup).toHaveBeenCalledTimes(2)
  })
})
