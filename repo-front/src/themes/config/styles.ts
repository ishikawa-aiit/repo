import { Styles, mode } from '@chakra-ui/theme-tools'

export const styles: Styles = {
  global: (props) => {
    return {
      body: {
        fontFamily:
          '"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "游ゴシック体", "YuGothic", "游ゴシック", "Yu Gothic", "メイリオ", "Meiryo", sans-serif',
        color: mode('text.black', 'text.white')(props),
      },
    }
  },
}
