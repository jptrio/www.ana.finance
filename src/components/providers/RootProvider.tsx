import FirebaseProvider from '@/components/providers/FirebaseProvider'
import Web3Provider from '@/components/providers/Web3Provider'
import appTheme from '@/config/appTheme'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig>
      {/*<SessionProvider refetchInterval={0}>*/}
        <FirebaseProvider>
          <ChakraProvider theme={appTheme}>
            <Web3Provider>{children}</Web3Provider>
          </ChakraProvider>
        </FirebaseProvider>
      {/*</SessionProvider>*/}
    </SWRConfig>
  )
}
