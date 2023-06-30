import { KNOTES_CONTRACT } from '@/config/constants'
import { Currency } from '@/models/currency'
import { BigNumber, ethers } from 'ethers'
import { useCallback } from 'react'
import {
  Address,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import NOTEABI from '../../contracts/NoteV1.json'

export function useSetKnote(
  currencyA: Currency,
  currencyAAmount: string,
  currencyB: Currency,
  currencyBAmount: string,
  sender: string | undefined,
  onSuccess?: (trxHash: string) => void,
  onError?: (error: Error) => void
) {
  const onSuccessCallback = useCallback(
    (receipt: ethers.providers.TransactionReceipt) => {
      onSuccess && onSuccess(receipt.transactionHash)
    },
    [onSuccess]
  )

  const onErrorCallback = useCallback(
    (error: Error) => {
      onError && onError(error)
    },
    [onError]
  )
  currencyAAmount = currencyAAmount == '' ? '0':currencyAAmount;

  const { config: addLiquidityConfig, error: prepareError } =
  usePrepareContractWrite({
      enabled: true,
      chainId: useChainId(),
      address: '0x73aE88Cb9623925dd72E7384e7b532d00EC5Ac6D',
      abi: NOTEABI.abi,
      functionName: 'mintNote',
      args: [{
        creator: '0x080c1Aee7b67C8345B2413fa38f70376E616Bd06',
        timestamp: 1688008202082,
        expiration: 1688908202082,
        term: 2,
        aTokenAddress: currencyA,
        aTokenBalance: currencyAAmount, // Convert string to BigNumber
        bTokenAddress: currencyB,
        swappedTokensBalance: 0,
        noteType: 'noteV1',
      }],
      overrides: {
        from: sender as Address,
      },
    })

  const { data: setKnoteData, write: mintNote } =
    useContractWrite(addLiquidityConfig)

  const { isLoading: isSetKnoteLoading } = useWaitForTransaction({
    hash: setKnoteData?.hash,
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  })

  return {
    mintNote,
    isSetKnoteLoading,
    hash: setKnoteData?.hash,
    prepareError,
  }
}
