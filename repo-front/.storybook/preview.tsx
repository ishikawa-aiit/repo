import * as NextImage from 'next/image'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

import { ThemeProvider } from '../src/themes'

const withChakra = (StoryFn: Function) => {
  return (
    <ThemeProvider>
      <MemoryRouterProvider>
        <StoryFn />
      </MemoryRouterProvider>
    </ThemeProvider>
  )
}

export const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} placeholder={undefined} unoptimized />,
})

export const decorators = [withChakra]

export const parameters = {
  options: {
    storySort: {
      order: ['components', 'chakra-ui-components', 'chakra-ui-system'],
    },
  },
  viewport: {
    viewports: {
      iphone_x: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
        type: 'mobile',
      },
      ipad: {
        name: 'iPad',
        styles: {
          width: '768px',
          height: '1024px',
        },
        type: 'tablet',
      },
      macbook_air: {
        name: 'MacBook Air',
        styles: {
          width: '1280px',
          height: '800px',
        },
        type: 'desktop',
      },
    },
  },
}
