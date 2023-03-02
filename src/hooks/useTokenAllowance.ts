import ERC20ABI from '@/../contracts/ERC20.json'
import { Currency } from '@/models/currency'
import { useMemo } from 'react'
import { useChainId, useContractRead } from 'wagmi'

export function useTokenAllowance(
  currency: Currency,
  owner?: string,
  spender?: string
): {
  tokenAllowance: any | undefined
} {
  const inputs = useMemo(() => [owner, spender], [owner, spender])

  const { data, error, isLoading } = useContractRead({
    chainId: useChainId(),
    address: `0x${currency.address}`,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: inputs,
  })

  const rawAmount = data?.toString()
  const allowance = useMemo(() => rawAmount || undefined, [currency, rawAmount])

  return useMemo(() => ({ tokenAllowance: allowance }), [allowance])
}
