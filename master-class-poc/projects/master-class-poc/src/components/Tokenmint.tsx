import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { Dispatch, SetStateAction, useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface TokenMintProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Tokenmint = ({ open, setOpen }: TokenMintProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [assetName, setAssetName] = useState<string>('')
  const [unitName, setUnitName] = useState<string>('')
  const [totalSupply, setTotalSupply] = useState<string>('')
  const [decimals, setDecimals] = useState<string>('0')

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const { enqueueSnackbar } = useSnackbar()
  const { transactionSigner, activeAddress } = useWallet()

  const handleMintToken = async () => {
    setLoading(true)

    if (!transactionSigner || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }

    if (!assetName.trim() || !unitName.trim() || !totalSupply.trim()) {
      enqueueSnackbar('Please fill out all required fields', { variant: 'warning' })
      setLoading(false)
      return
    }

    try {
      enqueueSnackbar('Creating token on TestNet...', { variant: 'info' })

      const onChainTotal = BigInt(totalSupply)
      const decimalsBig = BigInt(decimals)

      const createResult = await algorand.send.assetCreate({
        sender: activeAddress,
        signer: transactionSigner,
        total: onChainTotal,
        decimals: Number(decimalsBig),
        assetName,
        unitName,
        defaultFrozen: false,
      })

      enqueueSnackbar(`Token minted! TxID: ${createResult.txIds[0]}`, { variant: 'success' })

      // Reset form
      setAssetName('')
      setUnitName('')
      setTotalSupply('')
      setDecimals('0')
    } catch (e) {
      enqueueSnackbar('Failed to mint token', { variant: 'error' })
    }

    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h3 className="font-bold text-lg">Mint a Fungible Token (ASA)</h3>
        <p className="text-sm text-gray-500 mb-4">Enter details to create your token on Algorand TestNet.</p>

        <input
          type="text"
          placeholder="Asset Name (e.g. MasterPass Token)"
          className="input input-bordered w-full mb-2"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unit Name (e.g. MPT)"
          className="input input-bordered w-full mb-2"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Supply (whole number)"
          className="input input-bordered w-full mb-2"
          value={totalSupply}
          onChange={(e) => setTotalSupply(e.target.value)}
        />
        <input
          type="number"
          placeholder="Decimals (0 for whole tokens)"
          className="input input-bordered w-full mb-4"
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button className="btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button className={`btn ${assetName && unitName && totalSupply ? '' : 'btn-disabled'}`} onClick={handleMintToken} type="button">
            {loading ? <span className="loading loading-spinner" /> : 'Mint Token'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tokenmint
