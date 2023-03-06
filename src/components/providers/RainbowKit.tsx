import { ETH_CHAINS } from '@/config/constants'
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { ReactNode } from 'react'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

export default function RainbowKit({ children }: { children: ReactNode }) {
  const { chains, provider } = configureChains(ETH_CHAINS, [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ])

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended Wallets',
      wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
    },
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize='compact'
        chains={chains}
        theme={darkTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
