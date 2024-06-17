export namespace ApiRequirementTypes {
  /** 報告要件 */
  export type Requirement = {
    /** ID */
    id: number
    /** 対象報告週 */
    targetDuration: {
      /** ID */
      id: number
      /** 開始日時 */
      startAt: string
      /** 終了日時 */
      endAt: string
      /** 作成日時 */
      createdAt: string
      /** 更新日時 */
      updatedAt: string
    }
    /** 受付期間 */
    submissionDuration: {
      /** ID */
      id: number
      /** 開始日時 */
      startAt: string
      /** 終了日時 */
      endAt: string
      /** 作成日時 */
      createdAt: string
      /** 更新日時 */
      updatedAt: string
    }
    /** 作成日時 */
    createdAt: string
    /** 更新日時 */
    updatedAt: string
  }

  export type Requirements = Requirement[]
}
