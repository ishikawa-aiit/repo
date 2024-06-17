/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTooltip, Button, Tooltip } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Overlay / Tooltip',
  decorators: [
    (story: Function) => {
      return (
        <chakra.div mx="auto" h={100}>
          {story()}
        </chakra.div>
      )
    },
  ],
}

const HookTooltip = ({ children }: any) => {
  const { getTriggerProps, getTooltipPositionerProps, getTooltipProps, isOpen } = useTooltip({
    openDelay: 100,
    arrowSize: 8,
    placement: 'bottom',
  })

  return (
    <>
      <Button {...getTriggerProps()}>Hover me</Button>
      <div {...getTooltipPositionerProps()}>
        <div
          {...getTooltipProps({
            style: {
              background: 'tomato',
              color: 'white',
              borderRadius: '4px',
              padding: '0.5em 1em',
              visibility: isOpen ? 'visible' : 'hidden',
              '--popper-arrow-bg': 'tomato',
            },
          })}
        >
          {children}
          <div data-popper-arrow>
            <div data-popper-arrow-inner />
          </div>
        </div>
      </div>
    </>
  )
}

export const BasicByStorybook = () => {
  return <HookTooltip>This is me</HookTooltip>
}

export const Basic = () => {
  return (
    <Tooltip hasArrow label="This is me">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
