import { tableAnatomy as parts } from '@chakra-ui/anatomy'
import { ComponentStyleConfig } from '@chakra-ui/theme'
import { mode } from '@chakra-ui/theme-tools'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const tableStyle = {
  padding: '12px',
  backgroundColor: 'bg.white',
  border: '1px solid',
  borderCollapse: 'separate',
  borderSpacing: '0',
  borderColor: 'gray.200',
  borderRadius: '12px',
}

const variantStripe: PartsStyleFunction<typeof parts> = (props) => {
  return {
    th: {
      borderColor: mode('gray.100', 'gray.700')(props),
    },
    td: {
      borderColor: mode('gray.100', 'gray.700')(props),
    },
    tbody: {
      tr: {
        '&:nth-of-type(odd)': {
          td: {
            backgroundColor: mode('gray.100', 'gray.700')(props),
            borderColor: mode('gray.100', 'gray.700')(props),
          },
          th: {
            borderColor: mode('gray.100', 'gray.700')(props),
          },
        },
      },
    },
  }
}

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  return {
    th: {
      borderColor: mode('gray.100', 'gray.700')(props),
    },
    td: {
      borderColor: mode('gray.100', 'gray.700')(props),
    },
  }
}

export const Table: ComponentStyleConfig = {
  baseStyle: {
    table: tableStyle,
  },
  variants: {
    striped: variantStripe,
    simple: variantSimple,
  },
}
