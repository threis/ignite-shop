'use client'

import { useRouter } from 'next/navigation'

import { useCart } from '@/app/context/cart-context'

export interface AddProductInCartButtonProps {
  product: {
    productId: string
    quantity: number
    price: number
    name: string
    imageUrl: string
    priceId: string
  }
}

export function AddProductInCartButton({
  product,
}: AddProductInCartButtonProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  async function handleAddProductInCart({
    product,
  }: AddProductInCartButtonProps) {
    addToCart(product)
    router.push('/')
  }

  return (
    <button
      className="mt-auto cursor-pointer rounded-lg border-none bg-green500 p-5 text-md font-bold text-white hover:bg-green300"
      type="button"
      onClick={() => handleAddProductInCart({ product })}
    >
      Colocar na sacola
    </button>
  )
}
