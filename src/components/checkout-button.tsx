'use client'

import { useRouter } from 'next/navigation'

export interface CheckoutButtonProps {
  priceId: string
}

export function CheckoutButton({ priceId }: CheckoutButtonProps) {
  const router = useRouter()

  async function handleCheckout(priceId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout?priceId=${priceId}`,
      {
        method: 'POST',
      },
    )
    const { url } = await response.json()

    router.push(url)
  }

  return (
    <button
      className="mt-auto bg-green500 border-none text-white rounded-lg p-5 cursor-pointer text-md font-bold hover:bg-green300"
      type="button"
      onClick={() => handleCheckout(priceId)}
    >
      Comprar agora
    </button>
  )
}
