import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { Carousel } from '@/components/carousel'
import { stripe } from '@/lib/stripe'

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
              <footer className="absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md transition ease-in-out delay-200 bg-black/60 p-8 opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-[0%]">
                <strong className="text-lg ">{product.name}</strong>
                <span className="text-xl font-bold text-green300">
                  {product.price}
                </span>
              </footer>
            </Link>
          )
        })}
    </Carousel>
  )
}
