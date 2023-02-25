import { ReactNode } from 'react'
import { useBlockNumber, useNetwork } from 'wagmi'
import { Text } from "@chakra-ui/react";

export default function NetworkStatus({ children }: { children?: ReactNode }) {
  const { data, isError, isLoading } = useBlockNumber({ watch: true })

  return (
    <Text fontSize='1xl'>
      {isLoading ? 'Fetching Block #...' : isError ? '' : `Block #: ${data}`}
    </Text>
  )
}
