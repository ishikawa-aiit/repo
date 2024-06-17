/**
 * 報告要件
 */
export namespace RequirementTypes {
  export type Requirement = {
    /** id */
    id: number
    /** 対象報告週 */
    targetDuration: TargetDurationProps
    /** 受付期間 */
    submissionDuration: SubmissionDurationProps
  }

  export type RequirementProps = Pick<Requirement, 'id' | 'targetDuration' | 'submissionDuration'>
  /**
   * 対象報告週
   */
  type TargetDuration = {
    /** 開始日時 */
    startAt: string
    /** 終了日時 */
    endAt: string
  }

  type TargetDurationProps = Pick<TargetDuration, 'startAt' | 'endAt'>
  /**
   * 受付期間
   */
  type SubmissionDuration = {
    /** 開始日時 */
    startAt: string
    /** 終了日時 */
    endAt: string
  }
  type SubmissionDurationProps = Pick<SubmissionDuration, 'startAt' | 'endAt'>
}
