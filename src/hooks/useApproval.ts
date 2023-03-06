import ERC20ABI from '@/../contracts/ERC20.json'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { Currency } from '@/models/currency'
import { MaxUint256 } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import {
  Address,
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export function useApproval(
  currencyToApprove: Currency,
  amountToApprove: string,
  spender: string | undefined,
  onSuccess?: () => void
) {
  const { config: approveConfig } = usePrepareContractWrite({
    chainId: useChainId(),
    abi: ERC20ABI,
    address: currencyToApprove.address as Address,
    functionName: 'approve',
    args: [currencyToApprove.address, MaxUint256],
    overrides: {
      from: spender as Address,
    },
  })

  const { data: approveData, write: approveAsset } =
    useContractWrite(approveConfig)

  const { isLoading: isApprovalLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess: () => {
      onSuccess && onSuccess()
    },
  })

  return {
    approveAsset,
    isApprovalLoading,
    hash: approveData?.hash,
  }
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
