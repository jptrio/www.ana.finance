import { mainnet } from 'wagmi'

export type Currency = {
  /**
   * The chain ID this currency is deployed on.
   */
  chainId: number
  /**
   * The address of the contract that manages this currency.
   */
  address: string
  /**
   * The number of decimals this currency uses.
   */
  decimals: number
  /**
   * The symbol of this currency.
   */
  symbol: string
  /**
   * The name of this currency.
   */
  name: string
  /**
   * The URI of the logo for this currency.
   */
  logoURI?: string
}