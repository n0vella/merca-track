import { useState } from 'preact/hooks'
import icon from '../../icon.svg'
import PriceChart from './PriceChart'

export default function InfoButton({ productName }: { productName: string }) {
  const [showChart, setShowChart] = useState(false)
  const [chartData, setChartData] = useState<ProductHistory>({})
  return (
    <>
      <button
        className="mt-info-button w-5 hover:scale-110"
        title="Get product price track"
        onClick={async (e) => {
          e.stopPropagation()
          setShowChart(true)

          const dataUrl = import.meta.env.VITE_API_URL + 'query/' + encodeURI(productName)

          const r = await fetch(dataUrl)
          const data = await r.json()

          setChartData(data)
        }}
      >
        <img src={icon} />
      </button>

      {showChart && (
        <>
          <div
            className="fixed top-0 left-0 z-10 flex h-full w-full cursor-default items-center justify-center bg-zinc-200 opacity-20"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowChart(false)
            }}
          />
          <div
            className="fixed top-1/3 left-1/2 z-20 flex w-[600px] -translate-x-1/2 -translate-y-1/3 cursor-default flex-col rounded-lg bg-white p-4 opacity-100 shadow-lg shadow-zinc-300"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <div className="flex w-full justify-end">
              <button className="hover:scale-110" onClick={() => setShowChart(false)}>
                ❌
              </button>
            </div>
            <PriceChart product={productName} productData={chartData} />
          </div>
        </>
      )}
    </>
  )
}
