export namespace TemplateModalType {
  export type Props = {
    /** モーダルの開閉状態 */
    isOpen: boolean
    /** モーダルを閉じる際の処理 */
    onClose: () => void
    /** テンプレート反映時の処理 */
    onApply: () => void
  }
}
