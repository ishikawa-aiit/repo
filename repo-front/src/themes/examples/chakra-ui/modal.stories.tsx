/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react'

import { useState } from 'react'

export default {
  title: 'Chakra UI Components / Overlay / Modal',
}

export const Basic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Welcome Home</ModalHeader>
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
            incididunt duis in sint irure nisi.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} variant="outline" colorScheme="gray">Cancel</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const alignItemsCenter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center">Welcome Home</ModalHeader>
          <ModalBody textAlign="center">
            You've offically done something really nice. Well done for making it happen, you have deserve a cookie!
          </ModalBody>
          <ModalFooter justifyContent="center">
            <SimpleGrid columns={2} spacing="5" w="100%">
              <Button onClick={onClose} variant="outline" colorScheme="gray">Cancel</Button>
              <Button onClick={onClose}>Continue</Button>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const DifferentSizes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState('md')

  const handleSizeClick = (newSize: string) => {
    setSize(newSize)
    onOpen()
  }

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full']

  return (
    <>
      <Heading>デフォルトのsizeはlgです。</Heading>
      {sizes.map((size) => (
        <Button onClick={() => handleSizeClick(size)}
        key={size}
        m={4}>{`Open ${size} Modal`}</Button>
      ))}
      <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Welcome Home</ModalHeader>
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
            incididunt duis in sint irure nisi.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} variant="outline" colorScheme="gray">Cancel</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
