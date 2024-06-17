import { useEffect, useRef, useState } from 'react'

/**
 * 依存関係がゼロの時、useEffect（）の代わりに使用するカスタムフック
 *
 * @remarks
 * このカスタムフックはReact 18の仕様変更のため、作成しています（React 18では依存関係がゼロの時、2回レンダリングされる）
 * https://github.com/vercel/next.js/issues/35822
 */
export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>()
  const effectCalled = useRef(false)
  const renderAfterCalled = useRef(false)
  const [_val, setVal] = useState<number>(0)

  if (effectCalled.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFunc.current = effect()
      effectCalled.current = true
    }

    setVal((val) => {
      return val + 1
    })

    return () => {
      if (!renderAfterCalled.current) {
        return
      }
      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
    // マウント時に1回だけ実行するため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
