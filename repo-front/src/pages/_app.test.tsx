import { rest } from 'msw'

import { server } from '../../.jest/__mocks__/server'

import { getPing } from './_app.page'

describe('getPing', () => {
  it('APIコールが成功したら、正常にレスポンスが返ってくる', async () => {
    expect(await getPing()).toEqual('pong')
  })

  it('APIコールが失敗したら、レスポンスが返ってこない', async () => {
    server.use(
      rest.get('/api/ping', (_req, res, ctx) => {
        return res.once(ctx.status(500))
      }),
    )

    expect(await getPing()).toBeUndefined()
  })
})
