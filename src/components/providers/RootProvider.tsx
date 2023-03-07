import Web3Provider from '@/components/providers/Web3Provider'
import theme from '@/config/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Web3Provider>{children}</Web3Provider>
        </ChakraProvider>
      </SessionProvider>
    </SWRConfig>
  )
}
