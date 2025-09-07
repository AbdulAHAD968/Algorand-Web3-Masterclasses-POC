import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import { sha512_256 } from 'js-sha512'
import { useSnackbar } from 'notistack'
import { Dispatch, SetStateAction, useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface NFTMintProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const NFTmint = ({ open, setOpen }: NFTMintProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [metadataUrl, setMetadataUrl] = useState<string>('')

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const { enqueueSnackbar } = useSnackbar()
  const { transactionSigner, activeAddress } = useWallet()

  const handleMintNFT = async () => {
    setLoading(true)

    if (!transactionSigner || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }

    if (!metadataUrl.startsWith('ipfs://') && !metadataUrl.startsWith('https://')) {
      enqueueSnackbar('Please enter a valid IPFS or HTTPS metadata URL', { variant: 'warning' })
      setLoading(false)
      return
    }

    try {
      enqueueSnackbar('Minting NFT...', { variant: 'info' })

      const createNFTResult = await algorand.send.assetCreate({
        sender: activeAddress,
        signer: transactionSigner,
        total: 1n,
        decimals: 0,
        assetName: 'MasterPass Ticket',
        unitName: 'MTK',
        url: metadataUrl,
        metadataHash: new Uint8Array(Buffer.from(sha512_256.digest(metadataUrl))),
        defaultFrozen: false,
      })

      enqueueSnackbar(`NFT minted! TxID: ${createNFTResult.txIds[0]}`, { variant: 'success' })
      setMetadataUrl('')
    } catch (e) {
      console.error(e)
      enqueueSnackbar('Failed to mint NFT', { variant: 'error' })
    }

    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h3 className="font-bold text-lg">Mint Your MasterPass NFT</h3>
        <p className="text-sm text-gray-500 mb-4">Paste the metadata URL from Pinata (IPFS link)</p>

        <input
          type="text"
          placeholder="ipfs:// or https://..."
          className="input input-bordered w-full"
          value={metadataUrl}
          onChange={(e) => setMetadataUrl(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button className="btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button className={`btn ${metadataUrl.length > 0 ? '' : 'btn-disabled'}`} onClick={handleMintNFT} type="button">
            {loading ? <span className="loading loading-spinner" /> : 'Mint NFT'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NFTmint
