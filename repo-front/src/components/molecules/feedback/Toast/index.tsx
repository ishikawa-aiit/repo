import { chakra, createStandaloneToast } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { ToastType } from './type'

import { theme } from '@/themes'

const { ToastContainer, toast: chakraToast } = createStandaloneToast({ theme })

export const Toast: FC<ToastType.ContainerProps> = memo(({ children, ...props }) => {
  return (
    <chakra.div data-testid="Toast" data-cy="Toast" {...props}>
      {children}
      <ToastContainer />
    </chakra.div>
  )
})

export const toast: ToastType.FunctionProps = (args) => {
  chakraToast.closeAll()
  chakraToast({
    duration: 10000,
    variant: 'subtle',
    isClosable: true,
    ...args,
  })
}

export const showToastOutOfService = () => {
  toast({
    status: 'error',
    title: '現在サービスはご利用いただけません',
    description: '時間をおいて、再度お試しください',
  })
}

export const showToastUnauthorized = () => {
  toast({
    status: 'error',
    title: 'ユーザーの認証に失敗しました',
    description: '再度ログインをお試しください',
  })
}

export const showToastSettingSuccess = () => {
  toast({
    status: 'success',
    title: '設定に成功しました',
  })
}

export const showToastCancelSetting = () => {
  toast({
    status: 'success',
    title: '設定をキャンセルしました',
  })
}
