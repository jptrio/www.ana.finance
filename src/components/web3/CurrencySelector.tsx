import CurrencySearchModal from '@/components/web3/CurrencySearchModal'
import { Currency } from '@/models/currency'
import { Card } from '@chakra-ui/card'
import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Icon, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface CurrencySelectorProps {
  value: Currency
  onTokenSelect: (token: Currency) => void
}

export function CurrencySelector({
  value,
  onTokenSelect,
}: CurrencySelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTokenSelect = (token: Currency) => {
    setIsModalOpen(false)
    onTokenSelect(token)
  }

  return (
    <>
      <CurrencySearchModal
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        onTokenSelect={handleTokenSelect}
      />

      <Card
        onClick={() => setIsModalOpen(true)}
        padding='4'
        variant='outline'
        width='100%'
        _hover={{
          borderColor: 'green',
          color: 'lightgray',
          cursor: 'pointer',
        }}
      >
        <Flex alignItems='center'>
          <Image
            borderRadius='full'
            boxSize='50px'
            alt={value.name}
            src={value.logoURI}
          ></Image>
          <Flex marginLeft='4' direction='column'>
            <Text>{value.name}</Text>
            <Text color='gray.500' fontSize='xs'>
              {value.symbol}
            </Text>
          </Flex>
          <Icon marginLeft='auto' as={SearchIcon} />
        </Flex>
      </Card>
    </>
  )
}
