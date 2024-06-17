import { UseQueryTypes } from '@/components/types'

export namespace ListNoneType {
  export type Props = Pick<UseQueryTypes.ReturnProps, 'isError'>
}
