import { ConnectButton } from '@rainbow-me/rainbowkit'

export const WalletConnect = ({ className }: { className?: string }) => {
  return (
    <span className={className}>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        chainStatus={{
          smallScreen: 'icon',
          largeScreen: 'full',
        }}
      />
    </span>
  )
}
