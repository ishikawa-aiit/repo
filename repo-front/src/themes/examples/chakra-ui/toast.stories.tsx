/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Feedback / Toast',
}

export const Basic = () => {
  const toast = useToast()
  const id = 'login-error-toast'

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          if (toast.isActive(id)) return
          toast({
            id,
            position: 'top-left',
            title: 'Error Connecting...',
            description: 'You do not have permissions to perform this action.',
            status: 'error',
            duration: null,
            isClosable: true,
            onCloseComplete: () => {
              console.log('hello')
            },
          })
        }}
      >
        Show Toast
      </Button>
    </ButtonGroup>
  )
}

export const ErrorDifferentVariants = () => {
  const toast = useToast()
  const variants = ['solid', 'subtle', 'left-accent', 'top-accent']

  return (
    <ButtonGroup>
      {variants.map((variant) => {
        return (
          <Button
            key={variant}
            onClick={() => {
              toast({
                position: 'bottom-left',
                title: 'Error Connecting...',
                description: 'You do not have permissions to perform this action.',
                status: 'error',
                variant: variant,
                isClosable: true,
              })
            }}
          >
            Show Toast
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export const SuccessDifferentVariants = () => {
  const toast = useToast()
  const variants = ['solid', 'subtle', 'left-accent', 'top-accent']

  return (
    <ButtonGroup>
      {variants.map((variant) => {
        return (
          <Button
            key={variant}
            onClick={() => {
              toast({
                position: 'bottom-left',
                title: 'Error Connecting...',
                description: 'You do not have permissions to perform this action.',
                status: 'success',
                variant: variant,
                isClosable: true,
              })
            }}
          >
            Show Toast
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export const WarningDifferentVariants = () => {
  const toast = useToast()
  const variants = ['solid', 'subtle', 'left-accent', 'top-accent']

  return (
    <ButtonGroup>
      {variants.map((variant) => {
        return (
          <Button
            key={variant}
            onClick={() => {
              toast({
                position: 'bottom-left',
                title: 'Error Connecting...',
                description: 'You do not have permissions to perform this action.',
                status: 'warning',
                variant: variant,
                isClosable: true,
              })
            }}
          >
            Show Toast
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export const InfoDifferentVariants = () => {
  const toast = useToast()
  const variants = ['solid', 'subtle', 'left-accent', 'top-accent']

  return (
    <ButtonGroup>
      {variants.map((variant) => {
        return (
          <Button
            key={variant}
            onClick={() => {
              toast({
                position: 'bottom-left',
                title: 'Error Connecting...',
                description: 'You do not have permissions to perform this action.',
                status: 'info',
                variant: variant,
                isClosable: true,
              })
            }}
          >
            Show Toast
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
