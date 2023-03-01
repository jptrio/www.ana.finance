import ERC20ABI from '@/../contracts/ERC20.json'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { Currency } from '@/models/currency'
import { ethers } from 'ethers'
import { useCallback, useMemo } from 'react'
import { useAccount, useChainId, useContract, useContractRead } from 'wagmi'

export function useApproval(
  currencyToApprove: Currency,
  amountToApprove: string,
  spender: string | undefined
) {
  const approvalState = useApprovalStateForSpender(
    currencyToApprove,
    amountToApprove,
    spender
  )

  const approvalCallback = useCallback(async () => {
    //
  }, [approvalState, currencyToApprove, amountToApprove, spender])

  return [approvalState, approvalCallback]
}

export function useApprovalStateForSpender(
  currencyToApprove: Currency,
  amountToApprove: string,
  spender: string | undefined
) {
  const { address } = useAccount()

  const { tokenAllowance } = useTokenAllowance(
    currencyToApprove,
    address,
    spender
  )

  return useMemo(() => {
    if (!amountToApprove || !spender || !tokenAllowance) return 'UNKNOWN'

    return ethers.utils.formatUnits(
      tokenAllowance,
      currencyToApprove.decimals
    ) < amountToApprove
      ? 'NOT_APPROVED'
      : 'APPROVED'
  }, [amountToApprove, currencyToApprove, spender, tokenAllowance])
}
