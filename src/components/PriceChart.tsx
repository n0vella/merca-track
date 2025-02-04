import 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import { ChartData, ChartOptions } from 'chart.js'
import { es } from 'date-fns/locale'
import { Chart } from 'react-chartjs-2'
import colors from 'tailwindcss/colors'

export default function PriceChart({ product, productData }: { product: string; productData: ProductHistory }) {
  const options: ChartOptions = {
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

  const labels = Object.keys(productData).map((strDate) => new Date(`20${strDate.split('-').join('-')}`))
  const prices = Object.values(productData)
    .filter((data) => data.unit_price)
    .map((data) => data.unit_price!)

  const data: ChartData = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: colors.green['400'],
        backgroundColor: colors.green['500'],
      },
    ],
  }

  return <Chart type="line" data={data} options={options} />
}
