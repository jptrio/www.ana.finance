import { CurrencySelector } from '@/components/web3/CurrencySelector'
import { CurrencyInput } from '@/components/web3/CurrenyInput'
import DeveloperPanel from '@/components/web3/DeveloperPanel'
// import UserAgreementModal from '@/components/web3/UserAgreementModal'
import { AVAILABLE_TOKENS } from '@/config/constants'
import { useApproval } from '@/hooks/useApproval'
import { useSetKnote } from '@/hooks/useSetKnote'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { Currency } from '@/models/currency'
import { Card, CardBody, CardFooter } from '@chakra-ui/card'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Address, useAccount, useBalance, useChainId } from 'wagmi'

import PhuqingGuy from '../components/ui/PhuqingGuy'
// import { useDatabase } from "reactfire";

export default function Page() {
  const { address, isConnected } = useAccount()

  const [isDevPanelOpen, setIsDevPanelOpen] = useState(false)

  const [assetValue, setAssetValue] = useState()
  const [hasMounted, setHasMounted] = useState(false)
  const [selectedCurrency, setCurrency] = useState(AVAILABLE_TOKENS[0])
  const [formattedAssetValue, setFormattedAssetValue] = useState<BigNumber>()
  const [isAssetApproved, setIsAssetApproved] = useState(false)

  const toast = useToast()

  // const db = useDatabase();

  const { data: balanceData } = useBalance({
    chainId: useChainId(),
    address: address,
    token: selectedCurrency.address as Address,
    watch: true,
  })

  const showToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const allowance = useTokenAllowance(
    selectedCurrency,
    address,
    selectedCurrency.address
  )

  const {
    approveAsset,
    isApprovalLoading,
    hash: approvalHash,
  } = useApproval(selectedCurrency, assetValue??'0', address, () =>
    showToast(
      'Success',
      `Asset approved successfully! https://goerli.etherscan.io/tx/${approvalHash}`
    )
  )

  const {
    mintNote,
    isSetKnoteLoading,
    hash: setKnoteHash,
  } = useSetKnote(
    selectedCurrency,
    assetValue ?? '0',
    selectedCurrency,
    assetValue ?? '0',
    address,
    () =>
      showToast(
        'Success',
        `Note minted successfully! https://goerli.etherscan.io/tx/${setKnoteHash}`
      )
  )

  const handleAssetApproval = async () => {
    if (approveAsset) {
      try {
        await approveAsset()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleSetKnote = async () => {
    if (mintNote) {
      try {
        await mintNote()
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

  useEffect(() => {
    setHasMounted(true)

  }, [])

  useEffect(() => {
    if (assetValue) {
      const formattedValue = ethers.utils.parseUnits(
        assetValue,
        selectedCurrency.decimals
      )
      setFormattedAssetValue(formattedValue)
    }
  }, [assetValue])

  useEffect(() => {
    if (allowance.tokenAllowance > 0) {
      setIsAssetApproved(true)
    }
  }, [allowance.tokenAllowance])

  if (!hasMounted) return null

  return (
    <Center height='100vh' width='100vw'>
      {/* TODO: If not mainnet then show dev panel and show TokenA & TokenB */}
      {isConnected && (
        <Button
          right='4'
          bottom='4'
          position='absolute'
          colorScheme='blackAlpha'
          zIndex='10'
          onClick={() => setIsDevPanelOpen(true)}
        >
          Dev Panel
        </Button>
      )}
      {isConnected ? (
        <>
          {/* <UserAgreementModal /> */}
          <DeveloperPanel
            isOpen={isDevPanelOpen}
            onClose={() => setIsDevPanelOpen(false)}
          />
          <Card width='100%' maxWidth='xl' zIndex='10' bgColor='yellow.50'>
            <CardBody>
              <Box>
                <Text marginBottom='1' fontWeight='light'>
                  Select Asset
                </Text>
                <CurrencySelector
                  value={selectedCurrency}
                  onTokenSelect={handleCurrencySelect}
                />
              </Box>
              <Box paddingTop='8'>
                <Text marginBottom='1' fontWeight='light'>
                  Deposit Amount
                </Text>
                <CurrencyInput
                  value={assetValue}
                  onUserInput={handleAssetAmountInput}
                  currency={selectedCurrency}
                  balance={balanceData}
                  isDisabled={isApprovalLoading || isSetKnoteLoading}
                />
              </Box>
            </CardBody>
            <CardFooter>
              {!isAssetApproved ? (
                <Button
                  size='lg'
                  shadow='md'
                  width='100%'
                  colorScheme='blackAlpha'
                  onClick={handleAssetApproval}
                  loadingText='Sending Transaction...'
                  isLoading={isApprovalLoading}
                  isDisabled={isApprovalLoading}
                >
                  Approve {selectedCurrency.symbol}
                </Button>
              ) : (
                <Button
                  size='lg'
                  shadow='md'
                  width='100%'
                  colorScheme='blue'
                  onClick={handleSetKnote}
                  isLoading={isSetKnoteLoading}
                  loadingText='Minting Note...'
                  isDisabled={assetValue == '' || isSetKnoteLoading}
                >
                  {assetValue == '' ? 'Enter an amount' : 'Mint Note'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          {/* <PhuqingGuy /> */}
          <Flex direction='column' alignItems='center' zIndex='9'>
            {/* <Image
              src='heart.png'
              alt='We Love Yields'
              zIndex='9'
              width='50%'
            /> */}
            <Heading>Connect your wallet!</Heading>
          </Flex>
        </>
      )}
    </Center>
  )
}
