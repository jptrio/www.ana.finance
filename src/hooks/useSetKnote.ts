import { KNOTES_CONTRACT } from '@/config/constants'
import { Currency } from '@/models/currency'
import {
  Address,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import KNOTEABI from '../../contracts/KNOTES.json'

export function useSetKnote(
  currencyA: Currency,
  currencyAAmount: string,
  currencyB: Currency,
  currencyBAmount: string,
  sender: string | undefined,
  onSuccess?: () => void
) {
  const { config: addLiquidityConfig } = usePrepareContractWrite({
    chainId: useChainId(),
    address: KNOTES_CONTRACT,
    abi: KNOTEABI.abi,
    functionName: 'setKNOTE',
    args: [
      currencyA.address,
      currencyAAmount,
      currencyB.address,
      currencyBAmount,
    ],
    overrides: {
      from: sender as Address,
    },
  })

  const { data: setKnoteData, write: setKnote } =
    useContractWrite(addLiquidityConfig)

  const { isLoading: isSetKnoteLoading } = useWaitForTransaction({
    hash: setKnoteData?.hash,
    onSuccess: () => {
      onSuccess && onSuccess()
    },
  })

  return {
    setKnote,
    isSetKnoteLoading,
    hash: setKnoteData?.hash,
  }
}
