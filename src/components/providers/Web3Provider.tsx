import { ETH_CHAINS } from '@/config/constants'
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { getDefaultProvider } from 'ethers'
import { ReactNode } from 'react'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import customRainbowTheme from "@/config/walletTheme";

export default function Web3Provider({ children }: { children: ReactNode }) {
  const { chains, provider } = configureChains(ETH_CHAINS, [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    }),
  ])

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
    },
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider: getDefaultProvider('goerli', {
      alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }),
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize='wide'
        chains={chains}
        theme={customRainbowTheme}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
