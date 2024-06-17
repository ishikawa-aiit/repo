/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Stack } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Typography / Text',
}

// see https://github.com/chakra-ui/chakra-ui/issues/2464
export const Basic = () => {
  return (
    <Stack spacing="3">
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.</Text>
      <Text as="i">Italic</Text>
      <Text as="u">Underline</Text>
      <Text as="abbr">I18N</Text>
      <Text as="cite">Citation</Text>
      <Text as="del">Deleted</Text>
      <Text as="em">Emphasis</Text>
      <Text as="ins">Inserted</Text>
      <Text as="kbd">Ctrl + C</Text>
      <Text as="mark">Highlighted</Text>
      <Text as="s">Strikethrough</Text>
      <Text as="samp">Sample</Text>
      <Text as="sub">sub</Text>
      <br />
      <Text as="sup">sup</Text>
    </Stack>
  )
}
