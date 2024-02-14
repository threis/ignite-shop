import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Compra efetuada',
}

async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session?.customer_details?.name || ''
  const data = session.line_items?.data || []
  const quantity = data.reduce((total, item) => {
    return total + (item?.quantity || 0)
  }, 0)

  const imagesUrl = data.map((item) => {
    return Array.from({ length: item.quantity || 0 }).map(() => {
      const product = item.price?.product as Stripe.Product
      return product.images[0]
    })
  })

  const imagesUrlList = imagesUrl.flat()

  return {
    customerName,
    quantity,
    imagesUrlList,
  }
}

interface SuccessProps {
  searchParams: {
    session_id: string
  }
}

export default async function Success({ searchParams }: SuccessProps) {
  const { session_id: sessionId } = searchParams

  const session = await getCheckoutSession(sessionId)

  return (
    <main className="flex flex-col items-center justify-center mx-auto h-[656px]">
      <div className="flex -space-x-10 mb-6">
        {session.imagesUrlList.map((image, index) => {
          return (
            <div
              key={index}
              className={`w-full max-w-[140px] bg-gradient-to-t from-grad-purple to-grad-green rounded-full p-1 flex items-center justify-center shadow-md`}
            >
              <Image
                className="object-cover"
                src={image}
                width={130}
                height={130}
                alt=""
              />
            </div>
          )
        })}
      </div>
      <h1 className="text-2xl text-gray100">Compra efetuada!</h1>
      <p className="text-xl text-gray300 max-w-[560px] text-center mt-8">
        Uhuul <strong className="font-bold">{session.customerName}</strong>, sua
        compra de {session.quantity}{' '}
        {session.quantity === 1 ? 'camiseta' : 'camisetas'} já está a caminho da
        sua casa.
      </p>
      <Link
        className="mt-20 block text-lg text-green500 font-bold hover:text-green300"
        href="/"
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
