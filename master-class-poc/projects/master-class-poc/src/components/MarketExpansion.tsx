import { useState } from 'react'

const MarketExpansion = () => {
  const [destination, setDestination] = useState('Pakistan')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDestination(e.target.value)
  }

  return (
    <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-teal-300/20">
      <h3 className="text-2xl font-semibold text-teal-200 mb-4">Market Expansion</h3>
      <select value={destination} onChange={handleChange} className="w-full p-2 rounded-lg bg-teal-900 text-teal-100 mb-4">
        <option value="Pakistan">Send money to Pakistan</option>
        <option value="USA">Send money to USA</option>
      </select>
      <p className="text-teal-100">
        Funds appear as local balance: {destination === 'Pakistan' ? 'JazzCash/Easypaisa PKR credit' : 'USD bank deposit'}
      </p>
      <p className="text-teal-200 mt-2">Instant conversion to local currency at market rates.</p>
    </div>
  )
}

export default MarketExpansion
