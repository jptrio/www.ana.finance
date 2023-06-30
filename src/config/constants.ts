import { Currency } from '@/models/currency'
import { goerli, mainnet } from 'wagmi'

export const ETH_CHAINS = [mainnet, goerli]
export const ETH_CHAINS_PROD = [mainnet]
export const ETH_CHAINS_TEST = [goerli]

export const TOKEN_A_CONTRACT = '0x6b43FADC0C64d62ae83CE156779790fa5cA45df1'
export const TOKEN_B_CONTRACT = '0x30FF5CE34E00a0852CFAedED43C93bE0e375101d'
export const TOKEN_MORTGAGE_CONTRACT = '0x9ba750B6604361AB95A19F3856bc1B9cd9FbA6a4'
export const KNOTES_CONTRACT = '0xb31F4F24d20449e65858Bc1C3300a036cA9eA0e3'
export const MORTGAGES_CONTRACT = '0xa315F6f42097f02024288c1187D0a4a7ce3953d5'

export const AVAILABLE_TOKENS: Currency[] = [
  {
    chainId: goerli.id,
    address: TOKEN_A_CONTRACT,
    name: 'Test USDC',
    symbol: 'TUSDC',
    decimals: 18,
    logoURI:
      'https://cdn.statically.io/gh/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    chainId: goerli.id,
    address: TOKEN_B_CONTRACT,
    name: 'Test USDT',
    symbol: 'TUSDC',
    decimals: 18,
    logoURI:
      'https://cdn.statically.io/gh/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    chainId: goerli.id,
    address: TOKEN_B_CONTRACT,
    name: 'Mortgage Token',
    symbol: 'MTGT',
    decimals: 18,
    logoURI:
      'https://cdn.statically.io/gh/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  }
]
