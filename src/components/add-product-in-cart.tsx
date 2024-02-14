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
      className="mt-auto bg-green500 border-none text-white rounded-lg p-5 cursor-pointer text-md font-bold hover:bg-green300"
      type="button"
      onClick={() => handleAddProductInCart({ product })}
    >
      Colocar na sacola
    </button>
  )
}
