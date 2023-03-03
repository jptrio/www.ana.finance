import { Currency } from '@/models/currency'
import { Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

interface CurrencyInputProps {
  value: string
  onUserInput: (value: string) => void
  onMaxHit?: () => void
  currency: Currency
  isDisabled?: boolean
}

export function CurrencyInput({
  value,
  onUserInput,
  onMaxHit,
  currency,
  isDisabled,
}: CurrencyInputProps) {
  return (
    <InputGroup>
      <Input
        isDisabled={isDisabled}
        size='lg'
        type='text'
        minLength={1}
        maxLength={79}
        value={value}
        autoCorrect='off'
        spellCheck='false'
        autoComplete='off'
        inputMode='decimal'
        pattern='^[0-9]*[.,]?[0-9]*$'
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
