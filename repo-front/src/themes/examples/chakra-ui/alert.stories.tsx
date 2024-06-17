/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Feedback / Alert',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  return (
    <Stack spacing={3}>
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>

      <Alert status="success">
        <AlertIcon />
        Data uploaded to the server. Fire on!
      </Alert>

      <Alert status="warning">
        <AlertIcon />
        Seems your account is about expire, upgrade now
      </Alert>

      <Alert status="info">
        <AlertIcon />
        Chakra is going live on August 30th. Get ready!
      </Alert>
    </Stack>
  )
}

export const Solid = () => {
  return (
    <Stack spacing={3}>
      <Heading>variant=&quot;solid&quot;</Heading>
      <Alert status="error" variant="solid">
        <AlertIcon />
        There was an error processing your request
      </Alert>

      <Alert status="success" variant="solid">
        <AlertIcon />
        Data uploaded to the server. Fire on!
      </Alert>

      <Alert status="warning" variant="solid">
        <AlertIcon />
        Seems your account is about expire, upgrade now
      </Alert>

      <Alert status="info" variant="solid">
        <AlertIcon />
        Chakra is going live on August 30th. Get ready!
      </Alert>
    </Stack>
  )
}

export const LeftAccent = () => {
  return (
    <Stack spacing={3}>
      <Heading>variant=&quot;left-accent&quot;</Heading>
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        There was an error processing your request
      </Alert>

      <Alert status="success" variant="left-accent">
        <AlertIcon />
        Data uploaded to the server. Fire on!
      </Alert>

      <Alert status="warning" variant="left-accent">
        <AlertIcon />
        Seems your account is about expire, upgrade now
      </Alert>

      <Alert status="info" variant="left-accent">
        <AlertIcon />
        Chakra is going live on August 30th. Get ready!
      </Alert>
    </Stack>
  )
}

export const LeftTtile = () => {
  return (
    <Stack spacing={3}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        There was an error processing your request
      </Alert>

      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Data uploaded to the server. Fire on!
      </Alert>

      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Seems your account is about expire, upgrade now
      </Alert>

      <Alert status="info">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Chakra is going live on August 30th. Get ready!
      </Alert>
    </Stack>
  )
}

export const LeftTtileSolid = () => {
  return (
    <Stack spacing={3}>
      <Heading>variant=&quot;solid&quot;</Heading>
      <Alert status="error" variant="solid">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        There was an error processing your request
      </Alert>

      <Alert status="success" variant="solid">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Data uploaded to the server. Fire on!
      </Alert>

      <Alert status="warning" variant="solid">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Seems your account is about expire, upgrade now
      </Alert>

      <Alert status="info" variant="solid">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Chakra is going live on August 30th. Get ready!
      </Alert>
    </Stack>
  )
}

export const LeftTtileLeftAccent = () => {
  return (
    <Stack spacing={3}>
      <Heading>variant=&quot;left-accent&quot;</Heading>
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        There was an error processing your request
      </Alert>

      <Alert status="success" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Data uploaded to the server. Fire on!
      </Alert>

      <Alert status="warning" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Seems your account is about expire, upgrade now
      </Alert>

      <Alert status="info" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        Chakra is going live on August 30th. Get ready!
      </Alert>
    </Stack>
  )
}

export const AlertWithCloseButton = () => {
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Stack spacing={3}>
      <Alert status="error">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>There was an error processing your request</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="success">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Data uploaded to the server. Fire on!</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="warning">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Seems your account is about expire, upgrade now</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="info">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Chakra is going live on August 30th. Get ready!</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>
    </Stack>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  )
}

export const SolidWithCloseButton = () => {
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Stack spacing={3}>
      <Heading>variant=&quot;solid&quot;</Heading>
      <Alert status="error" variant="solid">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>There was an error processing your request</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="success" variant="solid">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Data uploaded to the server. Fire on!</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="warning" variant="solid">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Seems your account is about expire, upgrade now</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="info" variant="solid">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Chakra is going live on August 30th. Get ready!</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>
    </Stack>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  )
}

export const LeftAccentWithCloseButton = () => {
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Stack spacing={3}>
      <Heading>variant=&quot;left-accent&quot;</Heading>
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>There was an error processing your request</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="success" variant="left-accent">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Data uploaded to the server. Fire on!</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="warning" variant="left-accent">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Seems your account is about expire, upgrade now</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>

      <Alert status="info" variant="left-accent">
        <AlertIcon />
        <Box w="100%">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Chakra is going live on August 30th. Get ready!</AlertDescription>
        </Box>
        <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose}></CloseButton>
      </Alert>
    </Stack>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  )
}
