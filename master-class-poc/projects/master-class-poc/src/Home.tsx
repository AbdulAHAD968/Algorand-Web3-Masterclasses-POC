import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import NFTmint from './components/NFTmint'
import Transact from './components/Transact'

const Home = () => {
  const { activeAddress } = useWallet()

  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [openTransactModal, setOpenTransactModal] = useState(false)
  const [openNFTmintModal, setOpenNFTmintModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Welcome to MasterPass 🎟️
      </h1>
      <p className="text-lg md:text-xl text-white max-w-xl mb-8">
        Your ticket to join the next-gen Web3 event. Connect, explore, and get inspired!
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="btn bg-white text-purple-700 font-semibold hover:bg-gray-100"
          onClick={() => setOpenWalletModal(true)}
        >
          {activeAddress ? 'Wallet Connected' : 'Connect Wallet'}
        </button>

        {activeAddress && (
          <>
            <button
              className="btn bg-yellow-300 text-black font-semibold hover:bg-yellow-400"
              onClick={() => setOpenTransactModal(true)}
            >
              Send 1 ALGO Payment
            </button>
            <button
              className="btn bg-green-300 text-black font-semibold hover:bg-green-400"
              onClick={() => setOpenNFTmintModal(true)}
            >
              Mint MasterPass NFT
            </button>
          </>
        )}
      </div>

      {/* Modals */}
      <ConnectWallet openModal={openWalletModal} setModalState={setOpenWalletModal} />
      <Transact openModal={openTransactModal} setModalState={setOpenTransactModal} />
      <NFTmint openModal={openNFTmintModal} setModalState={setOpenNFTmintModal} />
    </div>
  )
}

export default Home
