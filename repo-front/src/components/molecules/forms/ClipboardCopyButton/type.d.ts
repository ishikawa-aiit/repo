import { ButtonProps } from '@chakra-ui/button/dist/declarations/src/button'

export namespace ClipboardCopyButtonType {
  export type Props = ButtonProps & {
    /** コピーされるテキスト */
    copyText: string
    /** コピー後に実行したい処理 */
    onCopied: () => void
  }
}
