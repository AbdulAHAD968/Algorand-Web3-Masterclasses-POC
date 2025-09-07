import { algo, AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { Dispatch, SetStateAction, useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface TransactProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Transact = ({ open, setOpen }: TransactProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [receiverAddress, setReceiverAddress] = useState<string>('')

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const { enqueueSnackbar } = useSnackbar()
  const { transactionSigner, activeAddress } = useWallet()

  const handleSubmitAlgo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!transactionSigner || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }

    try {
      enqueueSnackbar('Sending transaction...', { variant: 'info' })
      const result = await algorand.send.payment({
        signer: transactionSigner,
        sender: activeAddress,
        receiver: receiverAddress,
        amount: algo(1),
      })
      enqueueSnackbar(`Transaction sent: ${result.txIds[0]}`, { variant: 'success' })
      setReceiverAddress('')
      setOpen(false)
    } catch (e) {
      enqueueSnackbar('Failed to send transaction', { variant: 'error' })
    }

    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-md">
        <h3 className="font-bold text-lg">Send payment transaction</h3>
        <div className="mt-4">
          <input
            type="text"
            data-test-id="receiver-address"
            placeholder="Provide wallet address"
            className="input input-bordered w-full"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button
            type="button"
            data-test-id="send-algo"
            className={`btn ${receiverAddress.length === 58 ? '' : 'btn-disabled'}`}
            onClick={handleSubmitAlgo}
            disabled={loading || receiverAddress.length !== 58}
          >
            {loading ? <span className="loading loading-spinner" /> : 'Send 1 Algo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transact
