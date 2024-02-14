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
      className={`mx-auto flex w-full max-w-[1080px] items-center py-8 ${pathname === '/success' ? 'justify-center' : 'justify-between'}`}
    >
      <Image src={logoImg} alt="" width={130} height={60} />

      {pathname && pathname !== '/success' && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              disabled={!amountItems}
              type="button"
              className="relative flex size-12 items-center justify-center rounded-md bg-gray800 disabled:cursor-auto"
            >
              {!!amountItems && (
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border-[3px] border-gray900 bg-green500 text-sm font-bold text-white">
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
              <aside className="fixed bottom-0 right-0 top-0 z-10 flex h-screen w-[480px] flex-col bg-gray800 px-12 pt-[72px]">
                <Dialog.Close asChild>
                  <button className="absolute right-6 top-6">
                    <X className="size-6 font-bold text-gray500" />
                  </button>
                </Dialog.Close>

                <h2 className="text-lg font-bold leading-[160%] text-gray100">
                  Sacola de compras
                </h2>
                <div className="mt-8 flex flex-col gap-6">
                  {items &&
                    items.map((item) => {
                      return (
                        <div className="flex gap-5" key={item.productId}>
                          <div className="h-[100px] w-[100px] rounded-lg bg-gradient-to-t from-grad-purple to-grad-green">
                            <Image
                              src={item.imageUrl}
                              width={100}
                              height={100}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col items-start ">
                            <p className="text-md leading-[160%] text-gray300">
                              {item.quantity > 1
                                ? `(${item.quantity}x) ${item.name}`
                                : item.name}
                            </p>
                            <span className="text-md font-bold leading-[160%] text-gray100">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(item.price / 100 || 0)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="mt-0.5 font-bold leading-[160%] text-green500 hover:text-green300"
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
                    <span className="text-md leading-[160%] text-gray100">
                      {amountItems} itens
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-md font-bold leading-[160%] text-gray100">
                      Valor total
                    </span>
                    <span className="text-xl font-bold leading-[160%] text-gray100">
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
                  className="my-12 rounded-lg bg-green500 px-8 py-5 font-bold text-white hover:bg-green300"
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
