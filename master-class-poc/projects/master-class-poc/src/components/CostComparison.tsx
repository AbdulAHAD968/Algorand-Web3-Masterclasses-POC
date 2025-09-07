import { useState } from 'react'

const CostComparison = () => {
  const [amount, setAmount] = useState(200)

  return (
    <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-teal-300/20">
      <h3 className="text-2xl font-semibold text-teal-200 mb-4">Cost Comparison</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 rounded-lg bg-teal-900 text-teal-100 mb-4"
        placeholder="Enter amount in USD"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold text-teal-100">Western Union</h4>
          <p className="text-teal-200">Amount Received: ${Math.max(0, amount - 15).toFixed(2)}</p>
          <p className="text-teal-200">Fee: $15</p>
          <p className="text-teal-200">Time: 3 days</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-teal-100">RemitX (Algorand)</h4>
          <p className="text-teal-200">Amount Received: ${(amount - 0.001).toFixed(3)}</p>
          <p className="text-teal-200">Fee: $0.001</p>
          <p className="text-teal-200">Time: 4 seconds</p>
        </div>
      </div>
    </div>
  )
}

export default CostComparison
