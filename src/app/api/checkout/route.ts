import { NextRequest } from 'next/server'
import { z } from 'zod'

import { stripe } from '@/lib/stripe'
import { publicEnv } from '@/public-env'

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const priceId = z.string().parse(searchParams.get('priceId'))

  const successUrl = `${publicEnv.NEXT_PUBLIC_APP_URL}/success`
  const cancelUrl = `${publicEnv.NEXT_PUBLIC_APP_URL}`

  const checkoutUrl = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return Response.json({ url: checkoutUrl.url })
}
