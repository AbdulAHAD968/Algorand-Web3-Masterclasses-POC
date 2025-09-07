import { Chart as ChartJS, ChartOptions } from 'chart.js/auto'
import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

const ImpactChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)
  const [chartType, setChartType] = useState<'doughnut' | 'line'>('doughnut')

  const setLineChart = () => setChartType('line')
  const setDoughnutChart = () => setChartType('doughnut')

  useEffect(() => {
    if (!canvasRef.current) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const data = {
      labels: ['Traditional', 'AlgoRemit'],
      datasets: [
        {
          label: 'Fees Saved ($M)',
          data: [0, 50],
          backgroundColor: chartType === 'doughnut' ? ['#f5e7d4', '#d97706'] : ['rgba(245, 231, 212, 0.2)', 'rgba(217, 119, 6, 0.2)'],
          borderColor: ['#f5e7d4', '#d97706'],
          borderWidth: 2,
          pointBackgroundColor: '#d97706',
          pointBorderColor: '#fff',
          pointRadius: chartType === 'line' ? 5 : 0,
          tension: chartType === 'line' ? 0.4 : 0,
          fill: chartType === 'line',
        },
      ],
    }

    const options: ChartOptions<'line' | 'doughnut'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales:
        chartType === 'doughnut'
          ? {}
          : {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Savings ($M)',
                  color: '#92400e',
                  font: { size: 14, family: 'sans-serif', weight: 600 },
                },
                ticks: { color: '#92400e', font: { size: 12 } },
                grid: { color: '#f5e7d4' },
              },
              x: {
                title: {
                  display: true,
                  text: 'Remittance Method',
                  color: '#92400e',
                  font: { size: 14, family: 'sans-serif', weight: 600 },
                },
                ticks: { color: '#92400e', font: { size: 12 } },
                grid: { display: false },
              },
            },
      plugins: {
        legend: {
          display: chartType === 'doughnut',
          position: 'bottom',
          labels: {
            color: '#92400e',
            font: { size: 12, family: 'sans-serif' },
            padding: 20,
            boxWidth: 12,
          },
        },
        title: {
          display: true,
          text: '$1B Remittance: 10% via AlgoRemit Saves $50M',
          color: '#92400e',
          font: { size: 18, family: 'sans-serif', weight: 'bold' },
          padding: { top: 20, bottom: 20 },
        },
        tooltip: {
          backgroundColor: '#fef3c7',
          titleColor: '#92400e',
          bodyColor: '#92400e',
          borderColor: '#d97706',
          borderWidth: 1,
          cornerRadius: 8,
        },
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart',
      },
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type: chartType,
      data,
      options,
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [chartType])

  return (
    <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-amber-100 shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-amber-800">Impact Visualization</h3>
        <div className="flex gap-2">
          <button
            onClick={setLineChart}
            className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all duration-300"
            aria-label="Switch to line chart"
          >
            <FiArrowLeft size={20} />
          </button>
          <button
            onClick={setDoughnutChart}
            className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all duration-300"
            aria-label="Switch to doughnut chart"
          >
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative h-80">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <p className="text-amber-700 text-center mt-4 text-sm">
        Switch between views to see how AlgoRemit saves millions compared to traditional methods.
      </p>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ImpactChart
