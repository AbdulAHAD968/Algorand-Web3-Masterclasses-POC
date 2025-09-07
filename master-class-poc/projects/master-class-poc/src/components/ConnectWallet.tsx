import { useWallet, Wallet, WalletId } from '@txnlab/use-wallet-react'
import { Dispatch, SetStateAction } from 'react'
import Account from './Account'

interface ConnectWalletProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ConnectWallet = ({ open, setOpen }: ConnectWalletProps) => {
  const { wallets, activeAddress } = useWallet()

  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h3 className="font-bold text-2xl mb-4">Select wallet provider</h3>

        <div className="grid gap-3">
          {activeAddress && (
            <>
              <Account />
              <div className="border-t border-gray-300 my-3" />
            </>
          )}

          {!activeAddress &&
            wallets?.map((wallet) => (
              <button
                data-test-id={`${wallet.id}-connect`}
                className="btn border-teal-800 border m-1 flex items-center gap-2"
                key={`provider-${wallet.id}`}
                onClick={() => wallet.connect()}
              >
                {!isKmd(wallet) && (
                  <img
                    alt={`wallet_icon_${wallet.id}`}
                    src={wallet.metadata.icon}
                    style={{ objectFit: 'contain', width: '30px', height: 'auto' }}
                  />
                )}
                <span>{isKmd(wallet) ? 'LocalNet Wallet' : wallet.metadata.name}</span>
              </button>
            ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button data-test-id="close-wallet-modal" className="btn" onClick={() => setOpen(false)}>
            Close
          </button>

          {activeAddress && (
            <button
              className="btn btn-warning"
              data-test-id="logout"
              onClick={async () => {
                if (wallets) {
                  const activeWallet = wallets.find((w) => w.isActive)
                  if (activeWallet) {
                    await activeWallet.disconnect()
                  } else {
                    // Cleanup fallback
                    localStorage.removeItem('@txnlab/use-wallet:v3')
                    window.location.reload()
                  }
                }
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet
