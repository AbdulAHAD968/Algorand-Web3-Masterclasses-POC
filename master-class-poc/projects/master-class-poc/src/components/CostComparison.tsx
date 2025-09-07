import { useState } from 'react'

const CostComparison = () => {
  const [amount, setAmount] = useState(200)
  const maxAmount = 1000
  const minAmount = 10

  const westernUnionFee = 15 + amount * 0.02 // Flat $15 + 2% for realism
  const algoRemitFee = 0.001
  const westernUnionTime = '3-5 days'
  const algoRemitTime = '4 seconds'

  const westernUnionReceived = Math.max(0, amount - westernUnionFee).toFixed(2)
  const algoRemitReceived = (amount - algoRemitFee).toFixed(3)
  const savings = (westernUnionFee - algoRemitFee).toFixed(2)

  return (
    <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-amber-100 shadow-lg transform transition-all duration-300 hover:shadow-xl cursor-pointer">
      <h3 className="text-3xl font-semibold text-amber-800 mb-6">Cost Comparison Simulator</h3>

      <div className="mb-6">
        <label className="block text-amber-700 font-medium mb-2">Transfer Amount (USD): ${amount}</label>
        <input
          type="range"
          min={minAmount}
          max={maxAmount}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
        <div className="flex justify-between text-sm text-amber-600 mt-1">
          <span>${minAmount}</span>
          <span>${maxAmount}</span>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.min(maxAmount, Math.max(minAmount, Number(e.target.value))))}
          className="w-full mt-4 p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 focus:border-amber-400 focus:outline-none"
          placeholder="Enter amount in USD"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-rose-50 rounded-xl border border-rose-100">
          <h4 className="text-xl font-semibold text-rose-800 mb-4">Western Union</h4>
          <p className="text-rose-700 mb-2">Amount Received: ${westernUnionReceived}</p>
          <p className="text-rose-700 mb-2">Fee: ${westernUnionFee.toFixed(2)}</p>
          <p className="text-rose-700">Time: {westernUnionTime}</p>
        </div>
        <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="text-xl font-semibold text-amber-800 mb-4">AlgoRemit</h4>
          <p className="text-amber-700 mb-2">Amount Received: ${algoRemitReceived}</p>
          <p className="text-amber-700 mb-2">Fee: ${algoRemitFee}</p>
          <p className="text-amber-700">Time: {algoRemitTime}</p>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-amber-100 to-rose-100 rounded-xl text-center">
        <h4 className="text-xl font-semibold text-amber-800 mb-2">Your Savings with AlgoRemit</h4>
        <p className="text-3xl font-bold text-rose-600">${savings}</p>
        <p className="text-amber-700 mt-2">Instant settlement, zero intermediaries</p>
      </div>

      <style>
        {`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #d97706; /* amber-600 */
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.2);
          }
          input[type='range']::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #d97706;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.2);
          }
        `}
      </style>
    </div>
  )
}

export default CostComparison
