import { Currency } from '@/models/currency'
import { Card } from '@chakra-ui/card'
import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Icon, Image, Text } from '@chakra-ui/react'

interface CurrencySelectorProps {
  onClick: () => void
  token: Currency
}

export function CurrencySelector({ onClick, token }: CurrencySelectorProps) {
  return (
    <Card
      onClick={onClick}
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
          alt={token.name}
          src={token.logoURI}
        ></Image>
        <Flex marginLeft='4' direction='column'>
          <Text>{token.name}</Text>
          <Text color='gray.500' fontSize='xs'>
            {token.symbol}
          </Text>
        </Flex>
        <Icon marginLeft='auto' as={SearchIcon} />
      </Flex>
    </Card>
  )
}
