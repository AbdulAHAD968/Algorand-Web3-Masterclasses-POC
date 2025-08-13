import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import NFTmint from './components/NFTmint'
import Tokenmint from './components/Tokenmint'
import Transact from './components/Transact'

const Home = () => {
  const { activeAddress } = useWallet()

  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [openTransactModal, setOpenTransactModal] = useState(false)
  const [openNFTmintModal, setOpenNFTmintModal] = useState(false)
  const [openTokenModal, setOpenTokenModal] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute w-[600px] h-[600px] bg-pink-400 rounded-full blur-[200px] opacity-30 top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-300 rounded-full blur-[150px] opacity-20 bottom-[-50px] right-[-50px]"></div>

      {/* Main Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 text-center border border-white/20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Welcome to MasterPass 🎟️
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your ticket to join the next-gen Web3 event. Connect, explore, and get inspired!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
          <button
            className="px-6 py-3 rounded-xl font-semibold text-purple-700 bg-white hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
            onClick={() => setOpenWalletModal(true)}
          >
            {activeAddress ? 'Wallet Connected' : 'Connect Wallet'}
          </button>

          {activeAddress && (
            <>
              <button
                className="px-6 py-3 rounded-xl font-semibold text-black bg-yellow-300 hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-lg"
                onClick={() => setOpenTransactModal(true)}
              >
                Send 1 ALGO Payment
              </button>
              <button
                className="px-6 py-3 rounded-xl font-semibold text-black bg-green-300 hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg"
                onClick={() => setOpenNFTmintModal(true)}
              >
                Mint MasterPass NFT
              </button>
              <button
                className="px-6 py-3 rounded-xl font-semibold text-black bg-blue-300 hover:bg-blue-400 transition-transform transform hover:scale-105 shadow-lg"
                onClick={() => setOpenTokenModal(true)}
              >
                Create Token (ASA)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConnectWallet openModal={openWalletModal} setModalState={setOpenWalletModal} />
      <Transact openModal={openTransactModal} setModalState={setOpenTransactModal} />
      <NFTmint openModal={openNFTmintModal} setModalState={setOpenNFTmintModal} />
      <Tokenmint openModal={openTokenModal} setModalState={setOpenTokenModal} />
    </div>
  )
}

export default Home
