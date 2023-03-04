import { CurrencySelector } from '@/components/web3/CurrencySelector'
import { CurrencyInput } from '@/components/web3/CurrenyInput'
import DeveloperPanel from '@/components/web3/DeveloperPanel'
import { AVAILABLE_TOKENS } from '@/config/constants'
import { useApproval } from '@/hooks/useApproval'
import { useSetKnote } from '@/hooks/useSetKnote'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { Currency } from '@/models/currency'
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card'
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Address, useAccount, useBalance, useChainId } from 'wagmi'

export default function Page() {
  const { address, isConnected } = useAccount()

  const devModeEnabled = process.env.NEXT_PUBLIC_DEV_MODE
  const [isDevPanelOpen, setIsDevPanelOpen] = useState(false)

  const [assetValue, setAssetValue] = useState('')
  const [hasMounted, setHasMounted] = useState(false)
  const [selectedCurrency, setCurrency] = useState(AVAILABLE_TOKENS[0])
  const [formattedAssetValue, setFormattedAssetValue] = useState<BigNumber>()
  const [isAssetApproved, setIsAssetApproved] = useState(false)

  const { data: balanceData } = useBalance({
    chainId: useChainId(),
    address: address,
    token: selectedCurrency.address as Address,
    watch: true,
  })

  const allowance = useTokenAllowance(
    selectedCurrency,
    address,
    selectedCurrency.address
  )

  const { approveAsset, isApprovalLoading } = useApproval(
    selectedCurrency,
    assetValue,
    address
  )

  const { setKnote, isSetKnoteLoading } = useSetKnote(
    selectedCurrency,
    assetValue,
    selectedCurrency,
    assetValue,
    address
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
      <Button
        right='4'
        bottom='4'
        position='absolute'
        colorScheme='blackAlpha'
        onClick={() => setIsDevPanelOpen(true)}
      >
        Dev Panel
      </Button>

      {isConnected ? (
        <>
          <DeveloperPanel
            isOpen={isDevPanelOpen}
            onClose={() => setIsDevPanelOpen(false)}
          />
          <Card width='100%' maxWidth='xl'>
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
                />
              </Box>
            </CardBody>

            <CardFooter>
              {!isAssetApproved ? (
                <Button
                  size='lg'
                  shadow='md'
                  width='100%'
                  colorScheme='orange'
                  onClick={handleAssetApproval}
                  isLoading={isApprovalLoading}
                  isDisabled={isApprovalLoading}
                >
                  {isApprovalLoading
                    ? 'Sending Transaction...'
                    : `Approve ${selectedCurrency.symbol}`}
                </Button>
              ) : (
                <Button
                  size='lg'
                  shadow='md'
                  width='100%'
                  colorScheme='orange'
                  onClick={handleSetKnote}
                  isLoading={isSetKnoteLoading}
                  isDisabled={assetValue == '' || isSetKnoteLoading}
                >
                  {isSetKnoteLoading
                    ? 'Sending Transaction...'
                    : assetValue == ''
                    ? 'Enter an amount'
                    : 'Set KNOTE'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <Heading>Connect your wallet!</Heading>
      )}
    </Center>
  )
}
