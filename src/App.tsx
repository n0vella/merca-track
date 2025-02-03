import { useEffect } from 'preact/hooks'
import icon from '../icon.svg'
import { useLocation } from 'wouter'
import { awaitElement } from './utils'
import { render } from 'preact'

function InfoButton({ productName }: { productName: string }) {
  return (
    <button
      className="absolute top-1 right-1 w-6 grayscale hover:scale-110 hover:grayscale-0"
      title="Get product price track"
      onClick={async (e) => {
        e.stopPropagation()

        const dataUrl = import.meta.env.VITE_API_URL + 'query/' + encodeURI(productName)

        const r = await fetch(dataUrl)
        const data = await r.json()

        console.log(data)
      }}
    >
      <img src={icon} />
    </button>
  )
}

export default function App() {
  const [location] = useLocation()

  async function loadInfoButtons() {
    await awaitElement('button.product-cell__content-link') // wait till elements appear

    const products = document.querySelectorAll<HTMLButtonElement>('button.product-cell__content-link')

    for (const product of products) {
      const name = product.querySelector<HTMLTitleElement>('h4')?.innerText

      if (!name) throw 'Cannot obtain product name'

      product.style.position = 'relative'

      const container = document.createElement('div')
      product.appendChild(container)

      render(<InfoButton productName={name} />, container)
    }
  }

  useEffect(loadInfoButtons, [location])

  return (
    <div className="p-1" title="MercaTrack">
      <img src={icon} />
    </div>
  )
}
