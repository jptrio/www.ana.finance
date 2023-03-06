import knotes from '@/../contracts/KNOTES.json'
import CurrencySearchModal from '@/components/web3/CurrencySearchModal'
import { CurrencySelector } from '@/components/web3/CurrencySelector'
import { CurrencyInput } from '@/components/web3/CurrenyInput'
import {
  AVAILABLE_TOKENS,
  KNOTES_CONTRACT,
  TOKEN_A_CONTRACT,
  TOKEN_B_CONTRACT,
} from '@/config/constants'
import { useApproval } from '@/hooks/useApproval'
import { Currency } from '@/models/currency'
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import Parallax from '../components/ui/Parallax'
import PhuqingGuy from '../components/ui/PhuqingGuy'

export default function Page() {
  const [selectedCurrency, setCurrency] = useState(AVAILABLE_TOKENS[0])

  const [assetValue, setAssetValue] = useState('')

  const { address, isConnected } = useAccount()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    chainId: 5,
    address: KNOTES_CONTRACT,
    abi: knotes.abi,
    functionName: 'setKNOTE',
    args: [TOKEN_A_CONTRACT, '100000000000', TOKEN_B_CONTRACT, '100000000000'],
    overrides: {
      from: address,
    },
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const [approvalState, approveCallback] = useApproval(
    selectedCurrency,
    assetValue,
    address
  )

  const handleAssetAmountInput = (tokenAValue: string) => {
    setAssetValue(tokenAValue)
  }

  const handleCurrencySelect = (asset: Currency) => {
    setCurrency(asset)
  }

  return (
    <>
      <Center width='100vw' height='100vh'>
        {isConnected ? (
          <Box width='100%' maxW='xl' borderRadius='md' zIndex='10'>
            <Card
              shadow='md'
              borderRadius='xl'
              variant='elevated'
              bgColor='yellow.50'
            >
              <CardHeader>
                <Heading size='md' textAlign='center' fontWeight='semibold'>
                  Add Liquidity
                </Heading>
              </CardHeader>
              <CardBody>
                <Text paddingBottom='2' fontWeight='light'>
                  Select Asset
                </Text>
                <CurrencySelector
                  value={selectedCurrency}
                  onTokenSelect={asset => handleCurrencySelect(asset)}
                />

                <Text paddingTop='12' paddingBottom='2' fontWeight='light'>
                  Deposit Amount
                </Text>
                <Flex gap='2'>
                  <CurrencyInput
                    value={assetValue}
                    onUserInput={handleAssetAmountInput}
                    currency={selectedCurrency}
                  />
                </Flex>

                <Text paddingTop='12' paddingBottom='2' fontWeight='light'>
                  Prices and pool share
                </Text>
                <Box
                  border='solid'
                  borderWidth='thin'
                  borderRadius='lg'
                  padding='4'
                  borderColor='gray.200'
                >
                  <Flex justifyContent='space-between'>
                    <Flex direction='column' textAlign='center'>
                      <Text>0.000</Text>
                      <Text fontSize='sm'>
                        {selectedCurrency.symbol} per {}
                      </Text>
                    </Flex>
                    <Flex direction='column' textAlign='center'>
                      <Text>0.0%</Text>
                      <Text fontSize='sm'>Fee Tier</Text>
                    </Flex>
                    <Flex direction='column' textAlign='center'>
                      <Text>0.000</Text>
                      <Text fontSize='sm'>
                        {} per {selectedCurrency.symbol}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </CardBody>

              <CardFooter>
                <Button
                  size='lg'
                  shadow='md'
                  isDisabled
                  width='100%'
                  borderRadius='lg'
                  colorScheme='orange'
                >
                  Enter an amount
                </Button>
              </CardFooter>
            </Card>
          </Box>
        ) : (
          <>
            <Image
              src='heart.png'
              alt=''
              width='50%'
              height='auto'
              zIndex='5'
              display='block'
            />
            <PhuqingGuy/>
          </>
        )}
      </Center>
      <Parallax/>
    </>
  )
}
