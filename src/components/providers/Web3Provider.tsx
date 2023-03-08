import customRainbowTheme from '@/config/walletTheme'
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth'
import '@rainbow-me/rainbowkit/styles.css'
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { ReactNode } from 'react'
import { WagmiConfig, configureChains, createClient, goerli } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

export default function Web3Provider({ children }: { children: ReactNode }) {
  const { chains, provider } = configureChains(
    [goerli],
    [
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
      }),
    ]
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
    },
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: 'Sign in to Trees N Clouds',
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitSiweNextAuthProvider
        getSiweMessageOptions={getSiweMessageOptions}
      >
        <RainbowKitProvider
          modalSize='compact'
          chains={chains}
          theme={customRainbowTheme}
          appInfo={{
            appName: 'Trees N Clouds LLC',
          }}
        >
          {children}
        </RainbowKitProvider>
      </RainbowKitSiweNextAuthProvider>
    </WagmiConfig>
  )
}
