interface ProductData {
  bulk_price?: number
  iva?: number
  size_format?: string
  unit_price?: number
  unit_size?: number
}

type ProductHistory = { [date: string]: ProductData }
