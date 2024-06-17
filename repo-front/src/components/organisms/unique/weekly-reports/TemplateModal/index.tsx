import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { FC } from 'react'

import { Button } from '@/components/molecules'
import { TemplateModalType } from '@/components/organisms/unique/weekly-reports/TemplateModal/type'

/**
 * テンプレート反映確認モーダル
 */
export const TemplateModal: FC<TemplateModalType.Props> = ({ isOpen, onClose, onApply }) => {
  const onClickApplyButton = () => {
    onApply()
    onClose()
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} autoFocus={false}>
      <ModalOverlay />
      <ModalContent textAlign="center" data-testid="TemplateModal" data-cy="TemplateModal">
        <ModalHeader fontWeight="normal" pt={10} px={10} py={2}>
          <VStack>
            <Text as="span" color="accent.400">
              <ExclamationCircleIcon width="4rem" />
            </Text>
            <Text>テンプレートを反映しますか？</Text>
          </VStack>
        </ModalHeader>
        <ModalBody px={10} py={2}>
          <Text>
            入力済みのフィールドがあります。
            <br />
            テンプレートを反映すると、すべて削除されます。
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap={4} pt={4} px={10} pb={10}>
          <Button
            size="sm"
            flexGrow={1}
            variant="outline"
            colorScheme="gray"
            onClick={onClose}
            data-testid="TemplateModalCancelButton"
            data-cy="TemplateModalCancelButton"
          >
            やめる
          </Button>
          <Button
            size="sm"
            flexGrow={1}
            onClick={onClickApplyButton}
            data-testid="TemplateModalApplyButton"
            data-cy="TemplateModalApplyButton"
          >
            反映する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
