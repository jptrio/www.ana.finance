import RootProvider from '@/components/providers/RootProvider'
import NetworkStatus from '@/components/web3/NetworkStatus'
import { WalletConnect } from '@/components/web3/WalletConnect'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <Box bgGradient='radial( yellow.500, green.1900)'>
        <Box pos='relative' minHeight='100vh'>
          <main>{children}</main>
        </Box>
        <Box pos='absolute' top='4' left='6'>
          <Image src='/logo.png' alt='TNC Logo' width='200' height='200' />
        </Box>
        <Box pos='absolute' top='4' right='6'>
          <WalletConnect />
        </Box>
        <Box pos='absolute' bottom='4' left='6'>
          <NetworkStatus />
        </Box>
      </Box>
    </RootProvider>
  )
}
