import { ComponentStyleConfig } from '@chakra-ui/theme'

export const Stat: ComponentStyleConfig = {
  baseStyle: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '24px',
      gap: '4px',
      backgroundColor: 'bg.white',
      border: '1px solid',
      borderColor: 'gray.200',
      borderRadius: '12px',
    },
  },
}
