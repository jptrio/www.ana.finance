import Parallax from '@/components/ui/Parallax'
import NetworkStatus from '@/components/web3/NetworkStatus'
import { WalletConnect } from '@/components/web3/WalletConnect'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Parallax />
      <Box bgGradient='radial(#4adede, #1aa7ec)'>
        <Box pos='relative' minHeight='100vh'>
          <main>{children}</main>
        </Box>
        <Box pos='absolute' top='4' left='6' zIndex='10'>
          <Image src='/logo.png' alt='Mortgage Token Logo' width='350' height='350' />
        </Box>
        <Box pos='absolute' top='4' right='6' zIndex='10'>
          <WalletConnect />
        </Box>
        <Box pos='absolute' bottom='4' left='6'>
          <NetworkStatus />
        </Box>
      </Box>
    </>
  )
}
