import ERC20ABI from '@/../contracts/ERC20.json'
import { Currency } from '@/models/currency'
import { useMemo } from 'react'
import { Address, useChainId, useContractRead } from 'wagmi'

export function useTokenAllowance(
  currency: Currency,
  owner?: string,
  spender?: string
): {
  tokenAllowance: any | undefined
  error: any | undefined
} {
  const inputs = useMemo(() => [owner, spender], [owner, spender])

  const { data, error } = useContractRead({
    chainId: useChainId(),
    address: currency.address as Address,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: inputs,
    watch: true,
  })

  const rawAmount = data?.toString()

  const allowance = useMemo(() => rawAmount || undefined, [currency, rawAmount])

  return useMemo(
    () => ({ tokenAllowance: allowance, error: error || undefined }),
    [allowance, error]
  )
}
