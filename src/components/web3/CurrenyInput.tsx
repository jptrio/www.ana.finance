import { Currency } from '@/models/currency'
import { Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

interface CurrencyInputProps {
  value: string
  onUserInput: (value: string) => void
  onMaxHit?: () => void
  currency: Currency
}

export function CurrencyInput({
  value,
  onUserInput,
  onMaxHit,
  currency,
}: CurrencyInputProps) {
  return (
    <InputGroup>
      <Input
        size='lg'
        type='text'
        value={value}
        placeholder='Deposit Amount'
        onChange={e => onUserInput(e.target.value)}
      ></Input>
      <InputRightElement marginTop='1'>
        <Image
          boxSize='30'
          border='solid'
          borderWidth='thin'
          borderRadius='full'
          alt={currency.name}
          borderColor='gray.300'
          src={currency.logoURI}
        />
      </InputRightElement>
    </InputGroup>
  )
}
