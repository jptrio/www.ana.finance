import ERC20ABI from '@/../contracts/ERC20.json'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { Currency } from '@/models/currency'
import { BigNumber, ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import { useAccount, useChainId, useContract, useContractRead } from 'wagmi'

export function useApproval(
  currencyToApprove: Currency,
  amountToApprove: BigNumber,
  spender: string | undefined
) {
  const approvalState = useApprovalStateForSpender(
    currencyToApprove,
    amountToApprove,
    spender
  )

  const { data } = useContractRead({
    abi: ERC20ABI,
    address: `0x${currencyToApprove.address}`,
    functionName: 'approve',
    args: [spender, amountToApprove],
  })

  useEffect(() => {
    if (true) {
    }
  }, [true])

  const approvalCallback = useCallback(async () => {}, [
    approvalState,
    currencyToApprove,
    amountToApprove,
    spender,
  ])

  return [approvalState, approvalCallback]
}

export function useApprovalStateForSpender(
  currencyToApprove: Currency,
  amountToApprove: BigNumber,
  spender: string | undefined
) {
  const { address } = useAccount()

  const { tokenAllowance: currentApprovedAllowance } = useTokenAllowance(
    currencyToApprove,
    address,
    spender
  )

  return useMemo(() => {
    if (!amountToApprove || !spender || !currentApprovedAllowance)
      return 'UNKNOWN'

    return currentApprovedAllowance.lt(amountToApprove)
      ? 'NOT_APPROVED'
      : 'APPROVED'
  }, [amountToApprove, currencyToApprove, spender, currentApprovedAllowance])
}
