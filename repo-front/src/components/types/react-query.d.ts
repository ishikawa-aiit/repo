/**
 * useQueryのプロパティ
 */
export namespace UseQueryTypes {
  export type ReturnProps = {
    /** データを取得中かどうか  */
    isLoading: boolean
    /** 状態がエラーかどうか  */
    isError: boolean
  }
}
