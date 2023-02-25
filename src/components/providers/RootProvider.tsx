import RainbowKit from '@/components/providers/RainbowKit'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import theme from "@/config/theme";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <RainbowKit>{children}</RainbowKit>
        </ChakraProvider>
      </CacheProvider>
    </SWRConfig>
  )
}
