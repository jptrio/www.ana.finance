import ERC20ABI from '@/../contracts/ERC20.json'
import KNOTEABI from '@/../contracts/KNOTES.json'
import { CurrencySelector } from '@/components/web3/CurrencySelector'
import { CurrencyInput } from '@/components/web3/CurrenyInput'
import DeveloperPanel from '@/components/web3/DeveloperPanel'
import { AVAILABLE_TOKENS, KNOTES_CONTRACT } from '@/config/constants'
import { useSetKnote } from '@/hooks/useSetKnote'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { Currency } from '@/models/currency'
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card'
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { MaxUint256 } from '@ethersproject/constants'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useBalance,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export default function Page() {
  const devModeEnabled = process.env.NEXT_PUBLIC_DEV_MODE

  const { address, isConnected } = useAccount()

  const [isDevPanelOpen, setIsDevPanelOpen] = useState(false)

  const [assetValue, setAssetValue] = useState('')
  const [selectedCurrency, setCurrency] = useState(AVAILABLE_TOKENS[0])

  const [formattedAssetValue, setFormattedAssetValue] = useState<BigNumber>()

  const { data: balanceData } = useBalance({
    chainId: useChainId(),
    address: address,
    token: `0x${selectedCurrency.address}`,
    watch: true,
  })

  useEffect(() => {
    if (assetValue) {
      const formattedValue = ethers.utils.parseUnits(
        assetValue,
        selectedCurrency.decimals
      )
      setFormattedAssetValue(formattedValue)
    }
  }, [assetValue])

  const allowance = useTokenAllowance(
    selectedCurrency,
    address,
    selectedCurrency.address
  )

  const { config: approveConfig } = usePrepareContractWrite({
    chainId: useChainId(),
    abi: ERC20ABI,
    address: `0x${selectedCurrency.address}`,
    functionName: 'approve',
    args: [selectedCurrency.address, MaxUint256],
    overrides: {
      from: address,
    },
  })

  const { data: approveData, write: approveAsset } =
    useContractWrite(approveConfig)

  const { isLoading: isApprovalLoading } = useWaitForTransaction({
    hash: approveData?.hash,
  })

  const handleAssetApproval = async () => {
    if (approveAsset) {
      try {
        await approveAsset()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const { setKnote, isSetKnoteLoading } = useSetKnote(
    selectedCurrency,
    assetValue,
    selectedCurrency,
    assetValue,
    address
  )

  const handleSetKnote = async () => {
    if (setKnote) {
      try {
        await setKnote()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleAssetAmountInput = (tokenAValue: string) => {
    setAssetValue(tokenAValue)
  }

  const handleCurrencySelect = (asset: Currency) => {
    setCurrency(asset)
  }

  return (
    <Center width='100vw' height='100vh'>
      <DeveloperPanel
        isOpen={isDevPanelOpen}
        onClose={() => setIsDevPanelOpen(false)}
      />
      {isConnected ? (
        <Box position='relative' width='100%' maxW='xl' borderRadius='md'>
          {devModeEnabled && (
            <Button
              position='absolute'
              top='0'
              right='0'
              zIndex='50'
              onClick={() => setIsDevPanelOpen(true)}
            >
              Dev Panel
            </Button>
          )}
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
                  isDisabled={allowance.tokenAllowance == 0}
                  value={assetValue}
                  onUserInput={handleAssetAmountInput}
                  currency={selectedCurrency}
                  balance={balanceData?.formatted}
                />
              </Flex>

              {/*<Text paddingTop='12' paddingBottom='2' fontWeight='light'>*/}
              {/*  Prices and pool share*/}
              {/*</Text>*/}
              {/*<Box*/}
              {/*  border='solid'*/}
              {/*  borderWidth='thin'*/}
              {/*  borderRadius='lg'*/}
              {/*  padding='4'*/}
              {/*  borderColor='gray.200'*/}
              {/*>*/}
              {/*  <Flex justifyContent='space-between'>*/}
              {/*    <Flex direction='column' textAlign='center'>*/}
              {/*      <Text>0.000</Text>*/}
              {/*      <Text fontSize='sm'>*/}
              {/*        {selectedCurrency.symbol} per {}*/}
              {/*      </Text>*/}
              {/*    </Flex>*/}
              {/*    <Flex direction='column' textAlign='center'>*/}
              {/*      <Text>0.0%</Text>*/}
              {/*      <Text fontSize='sm'>Fee Tier</Text>*/}
              {/*    </Flex>*/}
              {/*    <Flex direction='column' textAlign='center'>*/}
              {/*      <Text>0.000</Text>*/}
              {/*      <Text fontSize='sm'>*/}
              {/*        {} per {selectedCurrency.symbol}*/}
              {/*      </Text>*/}
              {/*    </Flex>*/}
              {/*  </Flex>*/}
              {/*</Box>*/}
            </CardBody>

            <CardFooter>
              {allowance.tokenAllowance == 0 ? (
                <Button
                  size='lg'
                  shadow='md'
                  width='100%'
                  borderRadius='lg'
                  colorScheme='orange'
                  isDisabled={isApprovalLoading}
                  onClick={handleAssetApproval}
                >
                  {isApprovalLoading
                    ? `Approving ${selectedCurrency.symbol}`
                    : `Approve ${selectedCurrency.symbol}`}
                </Button>
              ) : (
                <Button
                  size='lg'
                  shadow='md'
                  width='100%'
                  borderRadius='lg'
                  colorScheme='orange'
                  onClick={handleSetKnote}
                  isDisabled={assetValue == '' || isSetKnoteLoading}
                >
                  {isSetKnoteLoading
                    ? 'Sending Transaction'
                    : assetValue == ''
                    ? 'Enter an amount'
                    : 'Set KNOTE'}
                </Button>
              )}
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
  )
}
