import Image from 'next/image'
import { Suspense } from 'react'
import Stripe from 'stripe'

import { AddProductInCartButton } from '@/components/add-product-in-cart'
import { stripe } from '@/lib/stripe'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProductById(productId: string) {
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: price.unit_amount,
    formattedPrice: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format((price.unit_amount || 0) / 100),
    imageUrl: product.images[0],
    defaultPriceId: price.id,
  }
}

export async function generateStaticParams() {
  const response = await stripe.products.list()

  return response.data.map((product) => {
    return { id: product.id }
  })
}
export async function generateMetadata({ params }: ProductProps) {
  const { id } = params
  const { name } = await getProductById(id)

  return {
    title: name,
  }
}

export default async function Product({ params }: ProductProps) {
  const { id } = params

  const product = await getProductById(id)

  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] mx-auto">
      <div className="w-full h-[656px] max-w-[576px] bg-gradient-to-t from-grad-purple to-grad-green rounded-lg p-1 flex items-center justify-center">
        <Image
          className="object-cover"
          src={product.imageUrl}
          width={520}
          height={480}
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl text-gray300">{product.name}</h1>
        <span className="mt-4 block text-2xl text-green300">
          {product.formattedPrice}
        </span>
        <p className="mt-10 text-md leading-[160%] text-gray300">
          {product.description}
        </p>
        <Suspense fallback={false}>
          <AddProductInCartButton
            product={{
              productId: product.id,
              quantity: 1,
              price: product.price || 0,
              name: product.name,
              imageUrl: product.imageUrl,
              priceId: product.defaultPriceId,
            }}
          />
        </Suspense>
      </div>
    </main>
  )
}
