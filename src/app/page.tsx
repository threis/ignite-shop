import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { Carousel } from '@/components/carousel'
import { Footer } from '@/components/footer'
import { stripe } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Home',
}

async function getProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  return response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount || 0) / 100),
      imageUrl: product.images[0],
    }
  })
}

export default async function Home() {
  const products = await getProducts()
  return (
    <Carousel>
      {products &&
        products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-gradient-to-t from-grad-purple to-grad-green rounded-lg cursor-pointer relative flex items-center justify-center overflow-hidden group keen-slider__slide"
            >
              <Image
                src={product.imageUrl}
                width={520}
                height={520}
                className="object-cover"
                alt=""
              />
              <Footer name={product.name} price={product.price} />
            </Link>
          )
        })}
    </Carousel>
  )
}
