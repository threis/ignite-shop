'use client'

import { Handbag, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { useCart } from '@/app/context/cart-context'
import logoImg from '@/assets/logo.svg'
import { api } from '@/lib/fetch'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const { items, totalPriceInCart, totalAmountItems, removeToCart } = useCart()

  const amountItems = totalAmountItems()
  const totalPriceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format((totalPriceInCart() || 0) / 100)

  function handleRemoveItem(productId: string) {
    removeToCart(productId)
  }

  interface CheckoutType {
    quantity: number
    priceId: string
  }

  async function handleCheckout(products: CheckoutType[]) {
    const body = JSON.stringify({
      products: products.map((product) => {
        return {
          priceId: product.priceId,
          quantity: product.quantity,
        }
      }),
    })

    const response = await api('/checkout', {
      method: 'POST',
      body,
    })

    const { url } = await response.json()
    router.push(url)
  }

  return (
    <header
      className={`py-8 w-full max-w-[1080px] mx-auto flex items-center ${pathname === '/success' ? 'justify-center' : 'justify-between'}`}
    >
      <Image src={logoImg} alt="" width={130} height={60} />

      {pathname && pathname !== '/success' && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              disabled={!amountItems}
              type="button"
              className="size-12 bg-gray800 flex items-center justify-center rounded-md relative disabled:cursor-auto"
            >
              {!!amountItems && (
                <span className="absolute -top-2 -right-2 size-6 text-white bg-green500 rounded-full flex items-center justify-center border-[3px] border-gray900 text-sm font-bold">
                  {amountItems}
                </span>
              )}

              <Handbag
                className={`size-6 font-bold ${amountItems ? 'text-gray300' : 'text-gray500'}`}
              />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content asChild>
              <aside className="h-screen w-[480px] fixed z-10 right-0 top-0 bottom-0 bg-gray800 flex flex-col pt-[72px] px-12">
                <Dialog.Close asChild>
                  <button className="absolute right-6 top-6">
                    <X className="size-6 font-bold text-gray500" />
                  </button>
                </Dialog.Close>

                <h2 className="font-bold text-lg text-gray100 leading-[160%]">
                  Sacola de compras
                </h2>
                <div className="flex flex-col mt-8 gap-6">
                  {items &&
                    items.map((item) => {
                      return (
                        <div className="flex gap-5" key={item.productId}>
                          <div className="w-[100px] h-[100px] bg-gradient-to-t from-grad-purple to-grad-green rounded-lg">
                            <Image
                              src={item.imageUrl}
                              width={100}
                              height={100}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col items-start ">
                            <p className="text-gray300 leading-[160%] text-md">
                              {item.quantity > 1
                                ? `(${item.quantity}x) ${item.name}`
                                : item.name}
                            </p>
                            <span className="text-gray100 leading-[160%] text-md font-bold">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(item.price / 100 || 0)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="text-green500 font-bold leading-[160%] mt-0.5 hover:text-green300"
                              type="button"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="leading-[160%] text-gray100">
                      Quantidade
                    </span>
                    <span className="leading-[160%] text-md text-gray100">
                      {amountItems} itens
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="leading-[160%] text-gray100 font-bold text-md">
                      Valor total
                    </span>
                    <span className="leading-[160%] text-gray100 font-bold text-xl">
                      {totalPriceFormatted}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleCheckout(
                      items.map((item) => {
                        return {
                          priceId: item.priceId,
                          quantity: item.quantity,
                        }
                      }),
                    )
                  }
                  className="bg-green500 text-white px-8 py-5 rounded-lg hover:bg-green300 font-bold my-12"
                  type="button"
                >
                  Finalizar compra
                </button>
              </aside>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </header>
  )
}
