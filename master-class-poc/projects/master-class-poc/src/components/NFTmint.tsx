import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import { sha512_256 } from 'js-sha512'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface NFTMintInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const NFTmint = ({ openModal, setModalState }: NFTMintInterface) => {
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

  return (
    <dialog id="nftmint_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Mint Your MasterPass NFT</h3>
        <p className="text-sm text-gray-500 mb-4">
          Paste the metadata URL from Pinata (IPFS link)
        </p>
        <input
          type="text"
          placeholder="ipfs:// or https://..."
          className="input input-bordered w-full"
          value={metadataUrl}
          onChange={(e) => setMetadataUrl(e.target.value)}
        />
        <div className="modal-action">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button
            className={`btn ${metadataUrl.length > 0 ? '' : 'btn-disabled'}`}
            onClick={handleMintNFT}
            type="button"
          >
            {loading ? <span className="loading loading-spinner" /> : 'Mint NFT'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default NFTmint
