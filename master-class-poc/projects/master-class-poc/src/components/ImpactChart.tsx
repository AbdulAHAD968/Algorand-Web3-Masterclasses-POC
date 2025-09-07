import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react'

const ImpactChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: ['Traditional', 'RemitX'],
          datasets: [
            {
              label: 'Fees Saved ($M)',
              data: [0, 50],
              backgroundColor: ['#ffffff33', '#4fd1c5'],
              borderColor: ['#ffffff66', '#2dd4bf'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Savings ($M)',
                color: '#ccfbf1',
              },
              ticks: { color: '#ccfbf1' },
            },
            x: {
              ticks: { color: '#ccfbf1' },
            },
          },
          plugins: {
            legend: { labels: { color: '#ccfbf1' } },
            title: {
              display: true,
              text: '$1B Remittance: 10% via RemitX Saves $50M',
              color: '#ccfbf1',
              font: { size: 16 },
            },
          },
        },
      })
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-teal-300/20">
      <h3 className="text-2xl font-semibold text-teal-200 mb-4">Impact Visualization</h3>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default ImpactChart
