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
  const product = session.line_items?.data[0]?.price?.product as Stripe.Product

  return {
    customerName,
    product: {
      name: product.name,
      imageUrl: product.images[0],
    },
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
      <h1 className="text-2xl text-gray100"></h1>
      <div className="w-full max-w-[130px] bg-gradient-to-t from-grad-purple to-grad-green rounded-lg p-1 flex items-center justify-center mt-16">
        <Image
          className="object-cover"
          src={session.product.imageUrl}
          width={130}
          height={130}
          alt=""
        />
      </div>
      <p className="text-xl text-gray300 max-w-[560px] text-center mt-8">
        Uhuul <strong className="font-bold">{session.customerName}</strong>, sua{' '}
        <strong className="font-bold">{session.product.name}</strong> já está a
        caminho da sua casa
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
