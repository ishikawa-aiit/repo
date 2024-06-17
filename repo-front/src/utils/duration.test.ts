import { DateTime } from 'luxon'

import { isInSubmissionDuration, convertTargetDurationStartEndToReportWeekString } from './duration'

describe('convertTargetDurationStartEndToReportWeekString', () => {
  it('requirementの対象報告週開始及び終了を加工した文字列が返される', async () => {
    const defaultValue = convertTargetDurationStartEndToReportWeekString(
      '2022-04-04T00:00:00+09:00',
      '2022-04-09T00:00:00+09:00',
    )
    expect(defaultValue).toEqual('04/04 ~ 04/09')
  })
})

describe('isInSubmissionDuration', () => {
  afterAll(() => {
    jest.useRealTimers()
  })
  const submissionDurationStartAt = '2022-04-10T00:00:00+09:00'
  const submissionDurationEndAt = '2022-04-17T00:00:00+09:00'

  it('週報受付期間内（日付の上限）の場合trueが返される', async () => {
    const expectBool = isInSubmissionDuration(
      submissionDurationStartAt,
      submissionDurationEndAt,
      DateTime.fromISO('2022-04-10T00:00:00+09:00'),
    )
    expect(expectBool).toBeTruthy()
  })

  it('週報受付期間内（日付の下限）の場合trueが返される', async () => {
    const expectBool = isInSubmissionDuration(
      submissionDurationStartAt,
      submissionDurationEndAt,
      DateTime.fromISO('2022-04-17T23:59:59+09:00'),
    )
    expect(expectBool).toBeTruthy()
  })

  it('週報受付期間外（期間前）の場合falseが返される', async () => {
    const expectBool = isInSubmissionDuration(
      submissionDurationStartAt,
      submissionDurationEndAt,
      DateTime.fromISO('2022-04-09T23:59:59+09:00'),
    )
    expect(expectBool).not.toBeTruthy()
  })

  it('週報受付期間外（期間後）の場合falseが返される', async () => {
    const expectBool = isInSubmissionDuration(
      submissionDurationStartAt,
      submissionDurationEndAt,
      DateTime.fromISO('2022-04-18T00:00:00+09:00'),
    )
    expect(expectBool).not.toBeTruthy()
  })
})
