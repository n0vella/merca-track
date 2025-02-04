import 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import { ChartOptions } from 'chart.js'
import { es } from 'date-fns/locale'
import { Chart } from 'react-chartjs-2'

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
          text: 'Precio',
        },
        beginAtZero: false,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: product,
      },
    },
  }

  const labels = Object.keys(productData).map((strDate) => new Date(`20${strDate.split('-').join('-')}`))
  const prices = Object.values(productData).map((data) => data.unit_price)

  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Chart type="line" data={data} options={options} />
}
