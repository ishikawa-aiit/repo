import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'

/**
 * モックサーバーハンドラ
 */
export const handlers = [
  rest.get('/api/ping', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json('pong'))
  }),
  rest.post('/api/weekly-reports', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.CREATED), ctx.json({
      data: {
        id: 1,
        requirement: {
          id: 14,
          targetDuration: {
            id: 14,
            startAt: '2022-07-04T00:00:00+09:00',
            endAt: '2022-07-09T00:00:00+09:00',
            createdAt: 'dummy',
            updatedAt: 'dummy',
          },
          submissionDuration: {
            id: 14,
            startAt: '2022-07-10T00:00:00+09:00',
            endAt: '2022-07-17T00:00:00+09:00',
            createdAt: 'dummy',
            updatedAt: 'dummy',
          },
          createdAt: 'dummy',
          updatedAt: 'dummy',
        },
        activityTime: 'dummy',
        doneActivity: 'dummy',
        todoActivity: 'dummy',
        solution: 'dummy',
        event: 'dummy',
        remark: 'dummy',
        createdAt: 'dummy',
        updatedAt: 'dummy',
      },
    }))
  }),
  rest.get('/api/weekly-reports', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json({
      data: [
        {
          id: 1,
          requirement: {
            id: 14,
            targetDuration: {
              id: 14,
              startAt: '2022-07-04T00:00:00+09:00',
              endAt: '2022-07-09T00:00:00+09:00',
              createdAt: '2022-05-19T16:23:29.000000Z',
              updatedAt: '2022-05-19T16:23:29.000000Z',
            },
            submissionDuration: {
              id: 14,
              startAt: '2022-07-10T00:00:00+09:00',
              endAt: '2022-07-17T00:00:00+09:00',
              createdAt: '2022-05-19T16:23:29.000000Z',
              updatedAt: '2022-05-19T16:23:29.000000Z',
            },
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          activityTime: '2時間20分',
          doneActivity: 'やったこと1',
          todoActivity: 'やること1',
          solution: '解決したこと1',
          event: '起こったこと1',
          remark: '特別なこと1',
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
        {
          id: 2,
          requirement: {
            id: 17,
            targetDuration: {
              id: 17,
              startAt: '2022-07-25T00:00:00+09:00',
              endAt: '2022-07-30T00:00:00+09:00',
              createdAt: '2022-05-19T16:23:29.000000Z',
              updatedAt: '2022-05-19T16:23:29.000000Z',
            },
            submissionDuration: {
              id: 17,
              startAt: '2022-07-31T00:00:00+09:00',
              endAt: '2022-08-07T00:00:00+09:00',
              createdAt: '2022-05-19T16:23:29.000000Z',
              updatedAt: '2022-05-19T16:23:29.000000Z',
            },
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          activityTime: '8時間50分',
          doneActivity: 'やったこと2',
          todoActivity: 'やること2',
          solution: '解決したこと2',
          event: '起こったこと2',
          remark: '特別なこと2',
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
        {
          id: 3,
          requirement: {
            id: 22,
            targetDuration: {
              id: 22,
              startAt: '2022-10-24T00:00:00+09:00',
              endAt: '2022-10-29T00:00:00+09:00',
              createdAt: '2022-05-19T16:23:29.000000Z',
              updatedAt: '2022-05-19T16:23:29.000000Z',
            },
            submissionDuration: {
              id: 22,
              startAt: '2022-10-30T00:00:00+09:00',
              endAt: '2022-11-06T00:00:00+09:00',
              createdAt: '2022-05-19T16:23:29.000000Z',
              updatedAt: '2022-05-19T16:23:29.000000Z',
            },
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          activityTime: '5時間20分',
          doneActivity: 'やったこと3',
          todoActivity: 'やること3',
          solution: '解決したこと3',
          event: '起こったこと3',
          remark: '特別なこと3',
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
      ],
    }))
  }),
  rest.post('/api/auth/redirect', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json({
      url: 'google_auth_dummy',
    }))
  }),
  rest.post('/api/auth/login', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.NO_CONTENT), ctx.json({
      token: 'dummy',
    }))
  }),
  rest.get('/api/users/me', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json({
      data: {
        id: 1,
        name: '新渡戸 稲造',
        createdAt: '2022-05-19T16:23:29.000000Z',
        updatedAt: '2022-05-19T16:23:29.000000Z',
        team: {
          id: 1,
          name: '飛田PT',
          createdAt: '2022-10-23T14:52:47.000000Z',
          updatedAt: '2022-10-23T14:52:47.000000Z'
        }
      }
    }))
  }),
  rest.post('/api/templates', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.CREATED), ctx.json({
      data: {
        id: 1,
        name: 'dummy',
        activityTime: 'dummy',
        doneActivity: 'dummy',
        todoActivity: 'dummy',
        solution: 'dummy',
        event: 'dummy',
        remark: 'dummy',
        isShared: false,
        createdAt: 'dummy',
        updatedAt: 'dummy',
      },
    }))
  }),
  rest.get('/api/templates', (req, res, ctx) => {
    const type = req.url.searchParams.get('type')
    if (type === 'self-created') {
      return res(ctx.status(StatusCodes.OK), ctx.json({
        data: [
          {
            id: 1,
            name: 'dummy1',
            activityTime: 'dummy1',
            doneActivity: 'dummy1',
            todoActivity: 'dummy1',
            solution: 'dummy1',
            event: 'dummy1',
            remark: 'dummy1',
            team: null,
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          {
            id: 2,
            name: 'dummy2',
            activityTime: 'dummy2',
            doneActivity: 'dummy2',
            todoActivity: 'dummy2',
            solution: 'dummy2',
            event: 'dummy2',
            remark: 'dummy2',
            team: {
              id: 1,
              name: 'dummy2',
              createdAt: 'dummy2',
              updatedAt: 'dummy2',
            },
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
        ],
      }))
    } else {
      return res(ctx.status(StatusCodes.OK), ctx.json({
        data: [
          {
            id: 1,
            name: 'dummy1',
            activityTime: 'dummy1',
            doneActivity: 'dummy1',
            todoActivity: 'dummy1',
            solution: 'dummy1',
            event: 'dummy1',
            remark: 'dummy1',
            team: null,
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          {
            id: 2,
            name: 'dummy2',
            activityTime: 'dummy2',
            doneActivity: 'dummy2',
            todoActivity: 'dummy2',
            solution: 'dummy2',
            event: 'dummy2',
            remark: 'dummy2',
            team: {
              id: 1,
              name: 'dummy2',
              createdAt: 'dummy2',
              updatedAt: 'dummy2',
            },
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
          {
            id: 3,
            name: 'dummy3',
            activityTime: 'dummy3',
            doneActivity: 'dummy3',
            todoActivity: 'dummy3',
            solution: 'dummy3',
            event: 'dummy3',
            remark: 'dummy3',
            team: null,
            createdAt: '2022-05-19T16:23:29.000000Z',
            updatedAt: '2022-05-19T16:23:29.000000Z',
          },
        ],
      }))
    }
  }),
  rest.get('/api/teams', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json({
      data: [
        {
          id: 1,
          name: '飛田PT',
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        },
        {
          id: 2,
          name: '嶋津PT',
          createdAt: '2022-05-19T16:23:29.000000Z',
          updatedAt: '2022-05-19T16:23:29.000000Z',
        }
      ],
    }))
  }),
  rest.patch('/api/users/my-setting', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json({
      data: {
        id: 1,
        user: {
          id: 1,
          name: "dummy",
          createdAt: "dummy",
          updatedAt: "dummy"
        },
        team: {
          id: 1,
          name: "dummy",
          createdAt: "dummy",
          updatedAt: "dummy"
        },
        createdAt: "dummy",
        updatedAt: "dummy"
      },
    }))
  }),
  rest.post('/api/users/my-setting/slack', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.NO_CONTENT))
  }),
  rest.get('/api/weekly-reports/requirements', (_req, res, ctx) => {
    return res(ctx.status(StatusCodes.OK), ctx.json({
      data: [
        {
          id: 1,
          targetDuration: {
            id: 1,
            startAt: '2022-04-04T00:00:00+09:00',
            endAt: '2022-04-09T00:00:00+09:00',
            createdAt: '2020-04-17T00:00:00+09:00',
            updatedAt: '2020-04-17T00:00:00+09:00',
          },
          submissionDuration: {
            id: 1,
            startAt: '2022-04-10T00:00:00+09:00',
            endAt: '2022-04-17T00:00:00+09:00',
            createdAt: '2020-01-01T00:00:00+09:00',
            updatedAt: '2020-01-01T00:00:00+09:00',
          },
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
        { id: 2,
          targetDuration: {
            id: 2,
            startAt: '2022-04-11T00:00:00+09:00',
            endAt: '2022-04-16T00:00:00+09:00',
            createdAt: '2020-01-01T00:00:00+09:00',
            updatedAt: '2020-01-01T00:00:00+09:00',
          },
          submissionDuration: {
            id: 2,
            startAt: '2022-04-17T00:00:00+09:00',
            endAt: '2022-04-24T00:00:00+09:00',
            createdAt: '2020-01-01T00:00:00+09:00',
            updatedAt: '2020-01-01T00:00:00+09:00',
          },
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        },
        { id: 3,
          targetDuration: {
            id: 3,
            startAt: '2022-04-18T00:00:00+09:00',
            endAt: '2022-04-23T00:00:00+09:00',
            createdAt: '2020-01-01T00:00:00+09:00',
            updatedAt: '2020-01-01T00:00:00+09:00',
          },
          submissionDuration: {
            id: 3,
            startAt: '2022-04-24T00:00:00+09:00',
            endAt: '2022-05-01T00:00:00+09:00',
            createdAt: '2020-01-01T00:00:00+09:00',
            updatedAt: '2020-01-01T00:00:00+09:00',
          },
          createdAt: '2020-01-01T00:00:00+09:00',
          updatedAt: '2020-01-01T00:00:00+09:00',
        }
      ],
    }))
  }),
]
