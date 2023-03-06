import { Currency } from '@/models/currency'
import {
  Badge,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { FetchBalanceResult } from '@wagmi/core'
import { ChangeEvent } from 'react'

interface CurrencyInputProps {
  value: string
  onUserInput: (value: string) => void
  onMaxHit?: () => void
  currency: Currency
  isDisabled?: boolean
  balance?: FetchBalanceResult | undefined
}

export function CurrencyInput({
  value,
  onUserInput,
  onMaxHit,
  currency,
  isDisabled,
  balance,
}: CurrencyInputProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (balance && e.target.value > balance.formatted) {
      onMaxHit && onMaxHit()
    }

    onUserInput(e.target.value)
  }

  return (
    <InputGroup>
      <Input
        size='lg'
        height='4.5rem'
        type='number'
        minLength={1}
        maxLength={79}
        value={value}
        autoCorrect='off'
        spellCheck='false'
        autoComplete='off'
        inputMode='decimal'
        isDisabled={isDisabled}
        focusBorderColor='green.600'
        pattern='^[0-9]*[.,]?[0-9]*$'
        placeholder='Deposit Amount'
        onChange={handleInput}
      ></Input>
      <InputRightElement
        paddingRight='1'
        flexDirection='column'
        height='100%'
        justifyContent='space-evenly'
      >
        <Image
          alignSelf='center'
          boxSize='29'
          border='solid'
          borderWidth='thin'
          borderRadius='full'
          alt={currency.name}
          borderColor='gray.300'
          src={currency.logoURI}
        />
        <Badge
          fontWeight='semibold'
          colorScheme='gray'
          fontSize='xs'
          color='gray.500'
          alignSelf='end'
          isTruncated
        >
          Balance: {balance?.formatted || 0} {balance?.symbol}
        </Badge>
      </InputRightElement>
    </InputGroup>
  )
}
