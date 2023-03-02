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

export default function Page() {
  // TODO: available pairs to be resolved from the contract instead
  const [tokenA, setTokenA] = useState(AVAILABLE_TOKENS[0])
  const [tokenB, setTokenB] = useState(AVAILABLE_TOKENS[1])

  const [tokenAValue, setTokenAValue] = useState('')
  const [tokenBValue, setTokenBValue] = useState('')

  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false)
  const [currencyModalOpenFor, setCurrencyModalOpenFor] = useState('a')

  const { address, isConnected } = useAccount()

  // const {
  //   config,
  //   error: prepareError,
  //   isError: isPrepareError,
  // } = usePrepareContractWrite({
  //   chainId: 5,
  //   address: '0x25fb0bb8d4a0c9885aa5ecf75c93fad5ac5df6f2',
  //   abi: contributorNft.abi,
  //   functionName: 'mint',
  //   args: [address, [1], [1], '0x'],
  //   overrides: {
  //     from: address
  //   }
  // })

  // const {
  //   config,
  //   error: prepareError,
  //   isError: isPrepareError,
  // } = usePrepareContractWrite({
  //   chainId: 5,
  //   address: TOKEN_B_CONTRACT,
  //   abi: erc20A.abi,
  //   functionName: 'mint',
  //   args: [address, ethers.utils.parseEther('100000000000000000000000000')],
  //   overrides: {
  //     from: address,
  //   },
  // })

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

  const handleCurrencyAInput = (tokenAValue: string) => {
    setTokenAValue(tokenAValue)
  }

  const handleCurrencyBInput = (tokenBValue: string) => {
    setTokenBValue(tokenBValue)
  }

  const handleTokenSelect = (token: Currency) => {
    if (currencyModalOpenFor === 'a') {
      setTokenA(token)
    } else {
      setTokenB(token)
    }

    setIsCurrencyModalOpen(false)
  }

  const handleCurrencySelectOpen = (currency: 'a' | 'b') => {
    setCurrencyModalOpenFor(currency)
    setIsCurrencyModalOpen(true)
  }

  return (
    <>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        top='0'
        bottom='0'
        className='parallax'
      >
        <Image
          src='parallax_bg.png'
          alt=''
          width='100%'
          height='100%'
          zIndex='0'
          opacity='.35'
        />
      </Flex>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        top='0'
        className='parallax'
      >
        <Image
          src='parallax_4.png'
          alt=''
          width='100%'
          height='auto'
          zIndex='3'
        />
      </Flex>
      <Flex
        pos='fixed'
        height='auto'
        left='0'
        right='0'
        bottom='0'
        className='parallax'
      >
        <Image
          src='parallax_3.png'
          alt=''
          width='100%'
          height='auto'
          zIndex='2'
        />
        <Image
          src='parallax_2.png'
          alt=''
          width='100%'
          height='auto'
          pos='fixed'
          zIndex='1'
        />
        <Image
          src='parallax_1.png'
          alt=''
          width='100%'
          height='auto'
          pos='fixed'
          zIndex='0'
        />
      </Flex>
      <CurrencySearchModal
        isOpen={isCurrencyModalOpen}
        onModalClose={() => setIsCurrencyModalOpen(false)}
        onTokenSelect={handleTokenSelect}
      />
      <Center width='100vw' height='100vh'>
        {isConnected ? (
          <Box width='100%' maxW='xl' borderRadius='md'>
            <Card
              shadow='md'
              borderRadius='xl'
              variant='elevated'
              bgColor='yellow.50'
            >
              <CardBody>
                <Text paddingBottom='2' fontWeight='light'>
                  Select Pair
                </Text>
                <Flex gap='2'>
                  <CurrencySelector
                    onClick={() => handleCurrencySelectOpen('a')}
                    token={tokenA}
                  />
                  <CurrencySelector
                    onClick={() => handleCurrencySelectOpen('b')}
                    token={tokenB}
                  />
                </Flex>

                <Text paddingTop='12' paddingBottom='2' fontWeight='light'>
                  Deposit Amounts
                </Text>
                <Flex gap='2'>
                  <CurrencyInput
                    value={tokenAValue}
                    onUserInput={handleCurrencyAInput}
                    currency={tokenA}
                  />
                  <CurrencyInput
                    value={tokenBValue}
                    onUserInput={handleCurrencyBInput}
                    currency={tokenB}
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
                        {tokenA.symbol} per {tokenB.symbol}
                      </Text>
                    </Flex>
                    <Flex direction='column' textAlign='center'>
                      <Text>0.0%</Text>
                      <Text fontSize='sm'>Fee Tier</Text>
                    </Flex>
                    <Flex direction='column' textAlign='center'>
                      <Text>0.000</Text>
                      <Text fontSize='sm'>
                        {tokenB.symbol} per {tokenA.symbol}
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
            <Text fontSize='lg' fontWeight='bold'>
              Connect your wallet!
            </Text>
          </>
        )}
      </Center>
    </>
  )
}
