import { AVAILABLE_TOKENS } from '@/config/constants'
import { Currency } from '@/models/currency'
import { Modal, ModalBody, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Box, Flex, Image, List, ModalContent, Text } from '@chakra-ui/react'

interface CurrencySearchModalProps {
  isOpen: boolean
  onModalClose: () => void
  onTokenSelect: (token: Currency) => void
}

export default function CurrencySearchModal({
  isOpen,
  onModalClose,
  onTokenSelect,
}: CurrencySearchModalProps) {
  const availableTokens = AVAILABLE_TOKENS

  const handleCurrencySelect = (token: any) => {
    alert(`Selected ${JSON.stringify(token)}`)

    onTokenSelect(token)
  }

  return (
    <Modal size='sm' isOpen={isOpen} onClose={onModalClose} isCentered>
      <ModalOverlay />
      <ModalContent paddingBottom='6'>
        <ModalHeader>Select a token</ModalHeader>
        <ModalBody>
          <List spacing={2}>
            {availableTokens.map(token => (
              <Box
                padding='2'
                border='solid'
                borderColor='lightgray'
                borderWidth='thin'
                borderRadius='lg'
                key={token.name}
                onClick={() => handleCurrencySelect(token)}
                _hover={{ backgroundColor: 'gray.200', cursor: 'pointer' }}
              >
                <Flex alignItems='center'>
                  <Image
                    borderRadius='full'
                    boxSize='50px'
                    alt={token.symbol}
                    src={token.logoURI ?? ''}
                    marginRight='6'
                  ></Image>
                  <Flex direction='column'>
                    <Text>{token.name}</Text>
                    <Text fontSize='xs'>{token.symbol}</Text>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
