import { DateTime } from 'luxon'

/**
 * 対象報告週開始日時、終了日時を「xx/xx ~ xx/xx」という文字列に変換する関数）
 *
 * @params targetDurationStartAt 報告週開始日時
 * @params targetDurationEndAt 報告週開始日時
 * @returns 日付の期間を表した文字列
 */
export const convertTargetDurationStartEndToReportWeekString = (
  targetDurationStartAt: string,
  targetDurationEndAt: string,
): string => {
  const reportWeekStr = (dateStr: string): string => {
    return DateTime.fromISO(dateStr).toFormat('MM/dd')
  }

  return `${reportWeekStr(targetDurationStartAt)} ~ ${reportWeekStr(targetDurationEndAt)}`
}

/**
 * 週報受付開始、終了日時と現在日時を参照し、現在日時が受付期間内であるかを返す
 *
 * @param submissionDurationStartAt 週報受付開始日時
 * @param submissionDurationEndAt 週報受付終了日時
 * @param nowDate 現在日時
 * @returns 受付期間内であるならばtrue
 */
export const isInSubmissionDuration = (
  submissionDurationStartAt: string,
  submissionDurationEndAt: string,
  nowDate: DateTime,
): boolean => {
  const durationStartAt = DateTime.fromISO(submissionDurationStartAt)
  const durationEndAt = DateTime.fromISO(submissionDurationEndAt).plus({
    // 受付期間の最終日時は、週報受付終了日時の翌日の零時とするので、1を足す
    days: 1,
  })
  return durationStartAt <= nowDate && durationEndAt > nowDate
}
