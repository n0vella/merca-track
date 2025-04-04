import 'chartjs-adapter-date-fns'
import {
  ChartData,
  ChartOptions,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import { es } from 'date-fns/locale'
import { Chart as ChartJS } from 'chart.js'
import { Line } from 'react-chartjs-2'
import colors from 'tailwindcss/colors'
import { useEffect, useState } from 'preact/hooks'

ChartJS.register(LinearScale, TimeScale, LineController, PointElement, LineElement, Tooltip, Title)

export default function PriceChart({ product }: { product: string }) {
  const [chartData, setChartData] = useState<ProductHistory>({})

  async function loadData() {
    const dataUrl = import.meta.env.VITE_API_URL + 'query/' + encodeURI(product)

    const r = await fetch(dataUrl)
    const data = await r.json()

    setChartData(data)
  }

  useEffect(() => {
    loadData()
  }, [])
  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yy',
          },
          tooltipFormat: 'dd MMM yyyy',
        },
        title: {
          display: true,
          text: 'Fecha',
        },
        adapters: {
          date: {
            locale: es,
          },
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Precio (€)',
        },
        beginAtZero: false,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: product,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return context.formattedValue + ' €'
          },
        },
      },
    },
  }

  const labels = Object.keys(chartData).map((strDate) => new Date(`20${strDate.split('-').join('-')}`))
  const prices = Object.values(chartData)
    .filter((data) => data.unit_price)
    .map((data) => data.unit_price!)

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: colors.green['400'],
        backgroundColor: colors.green['500'],
        stepped: true,
      },
    ],
  }

  return <Line data={data} options={options} />
}
