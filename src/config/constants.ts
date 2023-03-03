import { Currency } from '@/models/currency'
import { goerli, mainnet } from 'wagmi'

export const ETH_CHAINS = [mainnet, goerli]
export const ETH_CHAINS_PROD = [mainnet]
export const ETH_CHAINS_TEST = [goerli]

export const TOKEN_A_CONTRACT = '0xBc2e044D7BF7D347807698Ea7556F648Dfaa4539'
export const TOKEN_B_CONTRACT = '0x9a67AC7603A4275520fa91eC8cA48788196342E1'
export const KNOTES_CONTRACT = '0x67349869e4274B4171d260D6b5322D88f8f57529'

export const AVAILABLE_TOKENS: Currency[] = [
  {
    chainId: mainnet.id,
    address: 'Bc2e044D7BF7D347807698Ea7556F648Dfaa4539',
    name: 'Token A',
    symbol: 'TOKNA',
    decimals: 18,
    logoURI:
      'https://cdn.statically.io/gh/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
]
