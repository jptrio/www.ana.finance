import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { ModalContent } from '@chakra-ui/react'

interface DeveloperPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeveloperPanel({
  isOpen,
  onClose,
}: DeveloperPanelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Developer Panel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Coming soon...</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
