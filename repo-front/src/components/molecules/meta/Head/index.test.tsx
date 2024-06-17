import { render, waitFor } from '@testing-library/react'
import initHeadManager from 'next/dist/client/head-manager'
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context'
import { FC, ReactNode, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'

import { Head } from '.'

const HeadWrapper: FC<{
  children: ReactNode
}> = ({ children }) => {
  const manager = initHeadManager()

  useEffect(() => {
    global.document.head.insertAdjacentHTML(
      'afterbegin',
      ReactDOMServer.renderToString(<meta name="next-head-count" content="0" />),
    )
  })

  return <HeadManagerContext.Provider value={manager}>{children}</HeadManagerContext.Provider>
}
const title = 'サンプルタイトル'
const description = 'サンプルディスクリプション'

describe('props:title', () => {
  it('タイトルがheadに反映されている', async () => {
    render(<Head title={title} description={description} />, { wrapper: HeadWrapper })

    await waitFor(() => {
      expect(document.title).toBe(title)
    })
  })
})

describe('props:description', () => {
  it('ディスクリプションがheadに反映されている', async () => {
    render(<Head title={title} description={description} />, { wrapper: HeadWrapper })

    await waitFor(() => {
      // head内のDOMにアクセスする必要があるため
      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector("meta[name='description']")?.attributes.getNamedItem('content')?.value).toBe(
        description,
      )
    })
  })
})
