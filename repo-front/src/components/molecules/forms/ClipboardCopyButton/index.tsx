import { Text, useClipboard } from '@chakra-ui/react'
import { ClipboardCopyIcon } from '@heroicons/react/outline'
import { FC, memo } from 'react'

import { ClipboardCopyButtonType } from './type'

import { Button } from '@/components/molecules'

export const ClipboardCopyButton: FC<ClipboardCopyButtonType.Props> = memo(({ copyText, onCopied, ...props }) => {
  const { onCopy } = useClipboard(copyText)

  const handleOnClick = () => {
    onCopy()
    onCopied()
  }

  return (
    <Button
      width="max-content"
      variant="outline"
      onClick={handleOnClick}
      data-testid="ClipboardCopyButton"
      data-cy="ClipboardCopyButton"
      {...props}
    >
      <Text as="span" w={5}>
        <ClipboardCopyIcon />
      </Text>
    </Button>
  )
})
