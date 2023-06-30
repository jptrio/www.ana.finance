import erc20 from '@/../contracts/ERC20_A.json'
import { TOKEN_A_CONTRACT, TOKEN_B_CONTRACT, TOKEN_MORTGAGE_CONTRACT } from '@/config/constants'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  ModalContent,
  Select,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

interface DeveloperPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function DeveloperPanel({
  isOpen,
  onClose,
}: DeveloperPanelProps) {
  const { address, status } = useAccount()

  const [selectedFaucetToken, setSelectedFaucetToken] = useState('')
  const [selectedFaucetAddress, setSelectedFaucetAddress] = useState('')

  const { config } = usePrepareContractWrite({
    chainId: 5,
    abi: erc20.abi,
    address: selectedFaucetAddress as Address,
    functionName: 'mint',
    args: [address, ethers.utils.parseEther('1000')],
    overrides: {
      from: address,
    },
  })

  useEffect(() => {
    if (selectedFaucetToken == 'TUSDC')
      setSelectedFaucetAddress(TOKEN_A_CONTRACT)
    if (selectedFaucetToken == 'TUSDT')
      setSelectedFaucetAddress(TOKEN_B_CONTRACT)
    if (selectedFaucetToken == 'MTGT')
      setSelectedFaucetAddress(TOKEN_MORTGAGE_CONTRACT)
  }, [selectedFaucetToken])

  const { data, writeAsync: mintFromFaucet } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleFaucetTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaucetToken(e.target.value)
  }

  const handleTokenMint = async () => {
    if (mintFromFaucet) {
      await mintFromFaucet()
    }
  }

  return (
    <Modal size='2xl' isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Developer Panel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text fontSize='sm' isTruncated>
              <b>Wallet Status:</b> {status}
            </Text>
            <Text fontSize='sm' isTruncated>
              <b>Wallet Address</b> {address ?? 'N/A'}
            </Text>
            {isLoading && (
              <Flex>
                <Spinner mr='2' />
                Minting tokens...
              </Flex>
            )}

            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <GridItem>
                <Select
                  value={selectedFaucetToken}
                  isDisabled={isLoading}
                  onChange={handleFaucetTokenChange}
                  placeholder='Select an asset'
                >
                  <option value='TUSDC'>TUSDC</option>
                  <option value='TUSDT'>TUSDT</option>
                  <option value='MTGT'>MTGT</option>
                </Select>
              </GridItem>
              <GridItem>
                <Button
                  variant='outline'
                  colorScheme='blackAlpha'
                  isDisabled={isLoading}
                  onClick={handleTokenMint}
                >
                  Mint
                </Button>
              </GridItem>
            </Grid>
          </Stack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
