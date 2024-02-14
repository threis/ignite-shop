import { z } from 'zod'

import { env } from '@/env'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const bodySchema = z.object({
    quantity: z.number(),
    priceId: z.string(),
  })

  const productListSchema = z.array(bodySchema)

  const { products } = await request.json()

  const parsedProduct = productListSchema.parse(products)

  const successUrl = `${env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${env.NEXT_PUBLIC_APP_URL}`

  const checkoutUrl = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: parsedProduct.map((product) => {
      return {
        price: product.priceId,
        quantity: product.quantity,
      }
    }),
  })

  return Response.json({ url: checkoutUrl.url })
}
