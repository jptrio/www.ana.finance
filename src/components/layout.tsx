import RootProvider from '@/components/providers/RootProvider'
import NetworkStatus from '@/components/web3/NetworkStatus'
import { WalletConnect } from '@/components/web3/WalletConnect'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <Box bgGradient='linear(to-b, green.1900, green.1700, green.1200)'>
        <Box pos='relative' minHeight='100vh'>
          <main>{children}</main>
        </Box>
        <Box pos='absolute' top='4' left='6'>
          <Image src='/logo.png' alt='TNC Logo' width='150' height='150' />
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
